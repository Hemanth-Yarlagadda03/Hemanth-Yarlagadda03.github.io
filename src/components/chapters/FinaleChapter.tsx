import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../../content/siteContent'
import { MagneticButton } from '../ui/MagneticButton'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function FinaleChapter() {
  const { recipientName, finale } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 60%',
        },
      })

      tl.fromTo(
        '[data-finale]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, stagger: 0.14, ease: 'power3.out' },
      ).fromTo(
        '[data-finale-media]',
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
        '-=0.8',
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={rootRef}
      id="finale"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--berry)] py-24 text-[var(--ivory)] md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ivory)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,143,184,0.28),transparent_55%)]" />
      <div className="film-grain absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <p
            data-finale
            className="text-[0.68rem] tracking-[0.35em] uppercase text-[var(--rose)]"
          >
            {finale.eyebrow}
          </p>
          <h2
            data-finale
            className="mt-5 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95]"
          >
            {finale.headline}
            <span className="mt-2 block italic text-[var(--rose)]">{recipientName}</span>
          </h2>
          <p
            data-finale
            className="mt-8 max-w-md text-lg leading-relaxed text-[var(--ivory)]/75"
          >
            {finale.message}
          </p>
          <p data-finale className="mt-6 font-display text-2xl text-[var(--ivory)]">
            {finale.closingLine}
          </p>

          <div data-finale className="mt-10">
            <MagneticButton variant="pop" onClick={() => setRevealed(true)}>
              {finale.revealLabel}
            </MagneticButton>
          </div>

          <div
            className={`mt-8 overflow-hidden transition-all duration-700 ${
              revealed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="border-l border-[var(--rose)] pl-5 font-display text-xl italic text-[var(--ivory)]/90">
              {finale.secretMessage}
            </p>
          </div>
        </div>

        <div data-finale-media className="relative opacity-0">
          <div className="absolute -inset-4 border border-[var(--rose)]/30" />
          <img
            src={finale.mediaSrc}
            alt="Final birthday memory"
            className="relative aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
