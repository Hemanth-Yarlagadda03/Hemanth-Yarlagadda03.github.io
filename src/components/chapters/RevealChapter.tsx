import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteContent } from '../../content/siteContent'
import { MagneticButton } from '../ui/MagneticButton'
import { SparkleField } from '../ui/SparkleField'
import { BalloonField } from '../ui/BalloonField'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  onContinue: () => void
}

const PASTELS = [
  'rgba(255, 79, 135, 0.9)',
  'rgba(154, 240, 216, 0.9)',
  'rgba(228, 210, 255, 0.95)',
  'rgba(200, 232, 255, 0.95)',
  'rgba(255, 231, 163, 0.95)',
  'rgba(255, 158, 196, 0.95)',
  'rgba(239, 62, 86, 0.85)',
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
      gsap.set(
        '[data-reveal-line], [data-reveal-sub], [data-reveal-cta], [data-veil], [data-burst]',
        { opacity: 1, y: 0, yPercent: 0, scale: 1 },
      )
      gsap.set('.balloon-field', { opacity: 0.35 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal-line], [data-reveal-sub], [data-reveal-cta]', {
        opacity: 0,
      })
      gsap.set('[data-burst]', { scale: 0.4, opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Balloons rush upward first
      tl.fromTo(
        '.balloon',
        { y: 120, opacity: 0, scale: 0.6 },
        {
          y: () => -window.innerHeight - 160,
          opacity: 1,
          scale: 1,
          duration: 2.8,
          stagger: { each: 0.04, from: 'random' },
          ease: 'power1.out',
        },
      )
        // Massive sparkle / confetti burst
        .fromTo(
          '[data-burst]',
          { scale: 0.2, opacity: 0 },
          { scale: 1.15, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' },
          '-=1.6',
        )
        .to('[data-burst]', { scale: 1, duration: 0.5 }, '-=0.3')
        // Veil lifts to reveal the birthday page
        .fromTo(
          '[data-veil]',
          { opacity: 1 },
          { opacity: 0, duration: 1.1 },
          '-=0.7',
        )
        .fromTo(
          '[data-reveal-line]',
          { yPercent: 120, opacity: 0, scale: 0.92 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1.25,
            stagger: 0.18,
            ease: 'power4.out',
          },
          '-=0.55',
        )
        .fromTo(
          '[data-reveal-sub]',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.4',
        )
        .fromTo(
          '[data-reveal-cta]',
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85 },
          '-=0.35',
        )
        // Keep a soft drift of balloons in the background
        .to('.balloon-field', { opacity: 0.45, duration: 0.8 }, '-=0.5')
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
    const particles = Array.from({ length: 90 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.4 + Math.random() * 4.2,
      s: 0.25 + Math.random() * 0.7,
      a: 0.4 + Math.random() * 0.55,
      color: PASTELS[i % PASTELS.length],
      spin: Math.random() * Math.PI,
      vx: (Math.random() - 0.5) * 0.0008,
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

    const drawStar = (cx: number, cy: number, r: number, color: string, rot: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rot)
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
        p.y -= p.s * 0.0022
        p.x += p.vx
        p.spin += 0.03
        if (p.y < -0.05) {
          p.y = 1.05
          p.x = Math.random()
        }
        const px = p.x * width
        const py = p.y * height
        if (p.r > 2.2) drawStar(px, py, p.r, p.color, p.spin)
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

      <SparkleField className="z-[15]" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[16]" aria-hidden />

      <div
        data-burst
        className="pointer-events-none absolute inset-0 z-[18] opacity-0"
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,158,196,0.55)_35%,transparent_68%)]" />
        <SparkleField />
      </div>

      <BalloonField count={32} />

      <div
        data-veil
        className="pointer-events-none absolute inset-0 z-[22] bg-[var(--paper)]"
      />

      <div className="relative z-30 mx-auto max-w-6xl px-6 text-center">
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
          className="mx-auto mt-8 max-w-2xl text-[1.12rem] leading-relaxed font-medium text-[var(--ink-muted)]"
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
