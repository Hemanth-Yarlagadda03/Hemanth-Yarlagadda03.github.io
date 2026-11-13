import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteContent } from '../../content/siteContent'
import { MagneticButton } from '../ui/MagneticButton'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  onContinue: () => void
}

export function RevealChapter({ onContinue }: Props) {
  const { recipientName, reveal } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (reduced) {
      gsap.set('[data-reveal-line]', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('[data-veil]', { opacity: 1 }, { opacity: 0, duration: 1.4 })
        .fromTo(
          '[data-reveal-line]',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.35, stagger: 0.18 },
          '-=0.6',
        )
        .fromTo(
          '[data-reveal-sub]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.4',
        )
        .fromTo(
          '[data-reveal-cta]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.35',
        )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      s: 0.15 + Math.random() * 0.45,
      a: 0.15 + Math.random() * 0.45,
    }))

    const resize = () => {
      const dpr = Math.max(window.devicePixelRatio || 1, 1)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.s * 0.0015
        if (p.y < -0.05) {
          p.y = 1.05
          p.x = Math.random()
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(196, 165, 116, ${p.a})`
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--burgundy-deep)] text-[var(--ivory)]"
      style={{ ['--cursor-fg' as string]: 'var(--ivory)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(196,165,116,0.22),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(26,35,50,0.55),transparent_45%)]" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />
      <div data-veil className="absolute inset-0 z-20 bg-[var(--midnight)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="overflow-hidden">
          <p
            data-reveal-line
            className="font-display text-[clamp(3.5rem,14vw,9.5rem)] leading-[0.86] tracking-[-0.03em]"
          >
            {reveal.headline}
          </p>
        </div>
        <div className="mt-2 overflow-hidden md:mt-4">
          <p
            data-reveal-line
            className="font-display text-[clamp(2rem,7vw,4.8rem)] italic leading-none text-[var(--gold)]"
          >
            {recipientName}
          </p>
        </div>
        <p
          data-reveal-sub
          className="mx-auto mt-8 max-w-md text-[1.05rem] text-[var(--ivory)]/70"
        >
          {reveal.subline}
        </p>
        <div data-reveal-cta className="mt-12 flex justify-center opacity-0">
          <MagneticButton variant="gold" onClick={onContinue}>
            {reveal.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
