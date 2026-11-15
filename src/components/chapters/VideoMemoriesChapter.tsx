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

function MemoryTile({
  item,
  onPlay,
}: {
  item: VideoMemory
  onPlay: (item: VideoMemory) => void
}) {
  return (
    <button
      type="button"
      data-memory
      data-cursor-hover
      onClick={() => onPlay(item)}
      className="group relative aspect-video w-full overflow-hidden text-left"
    >
      <img
        src={item.poster}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[var(--midnight)]/35 transition group-hover:bg-[var(--midnight)]/20" />
      <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--ivory)]/50 bg-[var(--ivory)]/10 backdrop-blur-sm">
        <Play className="ml-1 text-[var(--ivory)]" fill="currentColor" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-2xl text-[var(--ivory)]">{item.title}</p>
        {item.caption && (
          <p className="mt-1 text-sm text-[var(--ivory)]/65">{item.caption}</p>
        )}
      </div>
    </button>
  )
}

export function VideoMemoriesChapter() {
  const { videos } = siteContent
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
        '[data-memory]',
        { clipPath: 'inset(12% 8% 12% 8%)', opacity: 0.4 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
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

  return (
    <section
      ref={rootRef}
      id="videos"
      className="relative bg-[linear-gradient(180deg,#5a2940_0%,#7a3d5c_100%)] py-24 text-[var(--ivory)] md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ivory)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={videos.eyebrow}
          title={videos.title}
          subtitle={videos.subtitle}
          tone="dark"
        />

        {videos.items.length === 0 ? (
          <div className="mt-4 flex aspect-[16/8] w-full items-center justify-center rounded-[1.5rem] border border-white/20 bg-white/5 px-8 text-center">
            <div>
              <p className="font-display text-3xl text-[var(--ivory)] md:text-4xl">
                Yaadein loading…
              </p>
              <p className="mt-3 text-sm text-[var(--ivory)]/65">
                This clip is coming soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 md:gap-7">
            {videos.items.map((item, i) => (
              <div key={item.id} className={i === 0 ? 'md:col-span-2' : ''}>
                <MemoryTile item={item} onPlay={setActive} />
              </div>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-[var(--ivory)]"
            aria-label="Close video"
            onClick={() => setActive(null)}
          >
            <X />
          </button>
          <div className="w-full max-w-5xl">
            {present ? (
              <video
                key={active.src}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] w-full bg-black object-contain"
              />
            ) : (
              <div className="relative flex aspect-video flex-col items-center justify-center gap-4 border border-[var(--ivory)]/15 bg-[var(--ink)] px-8 text-center">
                <img
                  src={active.poster}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
                />
                <p className="font-display text-3xl">{active.title}</p>
                <p className="max-w-md text-sm text-[var(--ivory)]/60">
                  Replace with your MP4 at{' '}
                  <code className="text-[var(--gold)]">{active.src}</code>
                </p>
                <button
                  type="button"
                  className="mt-2 text-[0.68rem] tracking-[0.24em] uppercase text-[var(--gold)]"
                  onClick={() => setActive(null)}
                >
                  Return to the story
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
