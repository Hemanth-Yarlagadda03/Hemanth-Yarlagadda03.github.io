import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'light',
  align = 'left',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-reveal]'),
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  const dark = tone === 'dark'

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}
    >
      <p
        data-reveal
        className={`mb-4 text-[0.68rem] tracking-[0.35em] uppercase ${
          dark ? 'text-[var(--gold)]' : 'text-[var(--burgundy)]'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        className={`font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] ${
          dark ? 'text-[var(--ivory)]' : 'text-[var(--ink)]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal
          className={`mt-5 max-w-xl text-[1.05rem] leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-[var(--ivory)]/70' : 'text-[var(--ink-muted)]'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
