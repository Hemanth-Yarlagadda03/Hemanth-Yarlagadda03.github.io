import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../../content/siteContent'
import { SectionHeading } from '../ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function PoemsChapter() {
  const { poems } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-poem]').forEach((poem) => {
        const lines = poem.querySelectorAll('[data-line]')
        gsap.fromTo(
          lines,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: poem,
              start: 'top 72%',
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={rootRef}
      id="poems"
      className="relative bg-[linear-gradient(180deg,#4a2a3e_0%,#6b3d58_100%)] py-24 text-[var(--ivory)] md:py-36"
      style={{ ['--cursor-fg' as string]: 'var(--ivory)' }}
    >
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ff9ec4_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow={poems.eyebrow}
          title={poems.title}
          subtitle={poems.subtitle}
          tone="dark"
          align="center"
        />

        <div className="space-y-28 md:space-y-40">
          {poems.entries.map((poem, index) => {
            const isTe = poem.lang === 'te'
            return (
              <article
                key={poem.id}
                data-poem
                className={`relative ${index % 2 === 1 ? 'md:ml-auto md:max-w-2xl md:text-right' : 'md:max-w-2xl'}`}
              >
                <div
                  className={`space-y-3 text-[clamp(1.25rem,2.8vw,1.7rem)] text-[var(--ivory)]/92 ${
                    isTe
                      ? 'font-telugu leading-[2.05]'
                      : 'font-calligraphy leading-[1.95]'
                  }`}
                >
                  {poem.lines.map((line, i) =>
                    line === '' ? (
                      <div key={`${poem.id}-break-${i}`} data-line className="h-6" />
                    ) : (
                      <p key={`${poem.id}-${i}`} data-line>
                        {line}
                      </p>
                    ),
                  )}
                </div>
                {poem.author && (
                  <p
                    data-line
                    className={`mt-8 text-[0.78rem] font-bold tracking-[0.22em] uppercase text-[var(--rose)] ${
                      index % 2 === 1 ? 'md:text-right' : ''
                    }`}
                  >
                    — {poem.author}
                  </p>
                )}
                <div
                  aria-hidden
                  className={`mt-10 h-px w-24 bg-[var(--rose)]/50 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
