import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteContent } from '../../content/siteContent'
import { MagneticButton } from '../ui/MagneticButton'
import { SparkleField } from '../ui/SparkleField'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  onContinue: () => void
}

const PASTELS = [
  'rgba(255, 79, 135, 0.75)',
  'rgba(154, 240, 216, 0.8)',
  'rgba(228, 210, 255, 0.85)',
  'rgba(200, 232, 255, 0.85)',
  'rgba(255, 231, 163, 0.85)',
  'rgba(255, 158, 196, 0.85)',
]

export function RevealChapter({ onContinue }: Props) {
  const { recipientName, reveal } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (reduced) {
      gsap.set('[data-reveal-line], [data-reveal-sub], [data-reveal-cta], [data-veil]', {
        opacity: 1,
        y: 0,
        yPercent: 0,
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('[data-veil]', { opacity: 1 }, { opacity: 0, duration: 1.2 })
        .fromTo(
          '[data-reveal-line]',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.16 },
          '-=0.5',
        )
        .fromTo(
          '[data-reveal-sub]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.35',
        )
        .fromTo(
          '[data-reveal-cta]',
          { opacity: 0, y: 20, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85 },
          '-=0.3',
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
    const particles = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 3.2,
      s: 0.2 + Math.random() * 0.55,
      a: 0.35 + Math.random() * 0.5,
      color: PASTELS[i % PASTELS.length],
      spin: Math.random() * Math.PI,
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

    const drawStar = (cx: number, cy: number, r: number, color: string) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.fillStyle = color
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2
        const x = Math.cos(a) * r
        const y = Math.sin(a) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.s * 0.0018
        p.spin += 0.02
        if (p.y < -0.05) {
          p.y = 1.05
          p.x = Math.random()
        }
        const px = p.x * width
        const py = p.y * height
        if (p.r > 2.4) drawStar(px, py, p.r, p.color)
        else {
          ctx.beginPath()
          ctx.fillStyle = p.color
          ctx.arc(px, py, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
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
      className="candy-sky relative flex min-h-[100svh] items-center justify-center overflow-hidden text-[var(--ink)]"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <div
        className="cloud-blob"
        style={{ width: '42vw', height: '18vw', top: '8%', left: '-6%', background: 'rgba(255,255,255,0.65)' }}
      />
      <div
        className="cloud-blob"
        style={{ width: '34vw', height: '14vw', top: '18%', right: '-4%', background: 'rgba(200,232,255,0.55)' }}
      />
      <div
        className="cloud-blob"
        style={{ width: '38vw', height: '16vw', bottom: '10%', left: '20%', background: 'rgba(154,240,216,0.35)' }}
      />
      <SparkleField />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />
      <div
        data-veil
        className="pointer-events-none absolute inset-0 z-20 bg-[var(--paper)]"
      />

      <div className="relative z-30 mx-auto max-w-6xl px-6 text-center">
        <p
          data-reveal-sub
          className="mb-4 text-[0.75rem] font-bold tracking-[0.35em] uppercase text-[var(--bow)]"
        >
          ♡ sparkle time ♡
        </p>
        <div className="overflow-hidden">
          <p
            data-reveal-line
            className="font-display text-[clamp(3rem,12vw,7.5rem)] leading-[0.9] text-[var(--bow)]"
          >
            {reveal.headline}
          </p>
        </div>
        <div className="mt-3 overflow-hidden md:mt-5">
          <p
            data-reveal-line
            className="font-script text-[clamp(2.6rem,9vw,5.5rem)] leading-none text-[var(--ink)]"
          >
            {recipientName}
          </p>
        </div>
        <p
          data-reveal-sub
          className="mx-auto mt-8 max-w-md text-[1.1rem] font-medium text-[var(--ink-muted)]"
        >
          {reveal.subline}
        </p>
        <div data-reveal-cta className="mt-12 flex justify-center opacity-0">
          <MagneticButton variant="pop" onClick={onContinue}>
            {reveal.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
