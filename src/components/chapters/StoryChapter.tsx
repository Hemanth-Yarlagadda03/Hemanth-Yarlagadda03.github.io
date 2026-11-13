import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { siteContent, type PhotoMemory } from '../../content/siteContent'
import { SectionHeading } from '../ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function StoryChapter() {
  const { story } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState<PhotoMemory | null>(null)

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track || reduced) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-photo-card]')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotate: i % 2 === 0 ? -2 : 2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          },
        )
      })

      const gallery = root.querySelector<HTMLElement>('[data-h-gallery]')
      if (gallery && window.innerWidth >= 768) {
        const total = gallery.scrollWidth - window.innerWidth
        gsap.to(gallery, {
          x: () => -Math.max(total, 0),
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top top',
            end: () => `+=${Math.max(total, window.innerHeight)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const featured = story.photos.slice(0, 3)
  const gallery = story.photos.slice(3)

  return (
    <section
      ref={rootRef}
      id="story"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={story.eyebrow}
          title={story.title}
          subtitle={story.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          {featured.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              data-photo-card
              data-cursor-hover
              onClick={() => setActive(photo)}
              className={`group relative overflow-hidden text-left ${
                i === 0
                  ? 'md:col-span-7 md:row-span-2 aspect-[3/4] md:aspect-auto md:min-h-[640px]'
                  : i === 1
                    ? 'md:col-span-5 aspect-[4/3]'
                    : 'md:col-span-5 aspect-[3/4]'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/70 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[var(--gold)]">
                  {photo.year}
                </p>
                <p className="mt-2 font-display text-2xl text-[var(--ivory)] md:text-3xl">
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div ref={trackRef} className="relative mt-20 md:mt-28 md:h-screen">
        <div
          data-h-gallery
          className="flex w-max flex-col gap-6 px-6 md:flex-row md:items-center md:gap-10 md:px-16"
        >
          <div className="shrink-0 md:w-[28vw]">
            <p className="font-display text-4xl text-[var(--ink)] md:text-5xl">
              Keep turning
              <br />
              the page…
            </p>
            <p className="mt-4 max-w-xs text-[var(--ink-muted)]">
              Horizontal memories on desktop. Tap any frame to open it fully.
            </p>
          </div>
          {gallery.map((photo) => (
            <button
              key={photo.id}
              type="button"
              data-photo-card
              data-cursor-hover
              onClick={() => setActive(photo)}
              className={`relative shrink-0 overflow-hidden ${
                photo.orientation === 'portrait'
                  ? 'h-[58vh] w-[42vw] max-w-[340px]'
                  : photo.orientation === 'square'
                    ? 'h-[48vh] w-[48vh] max-w-[420px]'
                    : 'h-[42vh] w-[68vw] max-w-[560px]'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="font-display text-xl text-white">{photo.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--midnight)]/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-[var(--ivory)]"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X />
          </button>
          <figure
            className="max-h-[88vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[78vh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center font-display text-2xl text-[var(--ivory)]">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
