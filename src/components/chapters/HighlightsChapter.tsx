import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, X } from 'lucide-react'
import { siteContent, type VideoMemory } from '../../content/siteContent'
import { SectionHeading } from '../ui/SectionHeading'
import { useAudio } from '../audio/AudioProvider'
import { useMediaPresence } from '../../hooks/useMediaPresence'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function HighlightTile({
  item,
  featured,
  onPlay,
}: {
  item: VideoMemory
  featured?: boolean
  onPlay: (item: VideoMemory) => void
}) {
  return (
    <button
      type="button"
      data-highlight
      data-cursor-hover
      onClick={() => onPlay(item)}
      className={`group relative overflow-hidden rounded-[1.5rem] border-4 border-white text-left shadow-[0_18px_50px_rgba(255,79,135,0.18)] ${
        featured ? 'aspect-[16/10] md:col-span-2' : 'aspect-video'
      }`}
    >
      <img
        src={item.poster}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(90,42,64,0.75),transparent_55%)]" />
      <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[var(--bow)] shadow-[0_12px_28px_rgba(239,62,86,0.4)]">
        <Play className="ml-1 text-white" fill="currentColor" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p className="font-display text-2xl text-white md:text-3xl">{item.title}</p>
        {item.caption && (
          <p className="mt-1 text-sm text-white/75">{item.caption}</p>
        )}
      </div>
    </button>
  )
}

export function HighlightsChapter() {
  const { highlights } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { duck, unduck } = useAudio()
  const [active, setActive] = useState<VideoMemory | null>(null)
  const present = useMediaPresence(active?.src)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-highlight]',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 70%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (active) duck()
    else unduck()
  }, [active, duck, unduck])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const [first, ...rest] = highlights.items

  return (
    <section
      ref={rootRef}
      id="highlights"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={highlights.eyebrow}
          title={highlights.title}
          subtitle={highlights.subtitle}
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-7">
          {first && (
            <HighlightTile item={first} featured onPlay={setActive} />
          )}
          {rest.map((item) => (
            <HighlightTile key={item.id} item={item} onPlay={setActive} />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--midnight)]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            className="absolute top-5 right-5 rounded-full bg-white/90 p-2 text-[var(--ink)]"
            aria-label="Close video"
            onClick={() => setActive(null)}
          >
            <X />
          </button>
          <div className="w-full max-w-5xl overflow-hidden rounded-[1.25rem] bg-black">
            {present ? (
              <video
                key={active.src}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full"
              />
            ) : (
              <div className="relative flex aspect-video flex-col items-center justify-center gap-4 px-8 text-center text-white">
                <img
                  src={active.poster}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
                />
                <p className="font-display text-3xl">{active.title}</p>
                <p className="max-w-md text-sm text-white/70">
                  Add your video at{' '}
                  <code className="text-[var(--rose)]">{active.src}</code>
                </p>
                <button
                  type="button"
                  className="mt-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[var(--rose)]"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
