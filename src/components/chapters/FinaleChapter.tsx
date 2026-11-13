import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../../content/siteContent'
import { MagneticButton } from '../ui/MagneticButton'
import { SparkleField } from '../ui/SparkleField'
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
      className="candy-sky relative flex min-h-[100svh] items-center overflow-hidden py-24 text-[var(--ink)] md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <SparkleField />
      <div
        className="cloud-blob"
        style={{ width: '30vw', height: '12vw', top: '12%', right: '8%' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <p
            data-finale
            className="text-[0.72rem] font-bold tracking-[0.32em] uppercase text-[var(--bow)]"
          >
            {finale.eyebrow}
          </p>
          <h2
            data-finale
            className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] text-[var(--ink)]"
          >
            {finale.headline}
            <span className="font-script mt-3 block text-[clamp(2.4rem,6vw,4.2rem)] text-[var(--bow)]">
              {recipientName}
            </span>
          </h2>
          <p
            data-finale
            className="mt-8 max-w-md text-lg leading-relaxed font-medium text-[var(--ink-muted)]"
          >
            {finale.message}
          </p>
          <p data-finale className="mt-6 font-display text-2xl text-[var(--ink)]">
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
            <p className="border-l-4 border-[var(--bow)] pl-5 font-script text-2xl text-[var(--ink)]">
              {finale.secretMessage}
            </p>
          </div>
        </div>

        <div data-finale-media className="relative opacity-0">
          <div className="absolute -inset-4 rounded-[2rem] border-4 border-white/80" />
          <img
            src={finale.mediaSrc}
            alt="Final birthday memory"
            className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_24px_60px_rgba(255,79,135,0.25)]"
          />
        </div>
      </div>
    </section>
  )
}
