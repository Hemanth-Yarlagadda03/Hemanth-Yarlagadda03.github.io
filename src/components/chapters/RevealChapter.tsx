import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteContent } from '../../content/siteContent'
import { MagneticButton } from '../ui/MagneticButton'
import { SparkleField } from '../ui/SparkleField'
import { BalloonField } from '../ui/BalloonField'
import { SparkleBurst } from '../ui/SparkleBurst'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  onContinue: () => void
}

const PASTELS = [
  'rgba(255, 79, 135, 0.95)',
  'rgba(154, 240, 216, 0.95)',
  'rgba(228, 210, 255, 0.95)',
  'rgba(200, 232, 255, 0.95)',
  'rgba(255, 231, 163, 0.95)',
  'rgba(255, 158, 196, 0.95)',
  'rgba(239, 62, 86, 0.9)',
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
      gsap.set('.balloon', { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const travel = -(window.innerHeight + 280)

      gsap.set('[data-reveal-line], [data-reveal-sub], [data-reveal-cta]', {
        opacity: 0,
      })
      gsap.set('[data-burst]', { opacity: 0, scale: 0.15 })
      gsap.set('.burst-spark', { opacity: 0, x: 0, y: 0, scale: 0 })
      gsap.set('.balloon', { y: 0, opacity: 0, scale: 0.55 })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      // 1) Balloons rise from below all the way past the top
      tl.to('.balloon', {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: { each: 0.018, from: 'start' },
        ease: 'power2.out',
      })
        .to(
          '.balloon',
          {
            y: travel,
            duration: 3.4,
            stagger: { each: 0.035, from: 'center' },
            ease: 'power1.inOut',
          },
          '-=0.15',
        )
        // 2) Only AFTER balloons clear the top: big sparkle burst
        .to(
          '[data-burst]',
          {
            opacity: 1,
            scale: 1.2,
            duration: 0.55,
            ease: 'back.out(2)',
          },
          '>-0.05',
        )
        .to(
          '.burst-spark',
          {
            opacity: 1,
            x: (_i, target) => Number((target as HTMLElement).dataset.x || 0),
            y: (_i, target) => Number((target as HTMLElement).dataset.y || 0),
            scale: 1,
            rotation: (_i, target) => Number((target as HTMLElement).dataset.rot || 0),
            duration: 0.9,
            stagger: 0.006,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .to(
          '[data-burst]',
          { scale: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.35',
        )
        // 3) Reveal the birthday page
        .to('[data-veil]', { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.25')
        .fromTo(
          '[data-reveal-line]',
          { yPercent: 120, opacity: 0, scale: 0.9 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1.15,
            stagger: 0.16,
            ease: 'power4.out',
          },
          '-=0.45',
        )
        .fromTo(
          '[data-reveal-sub]',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.35',
        )
        .fromTo(
          '[data-reveal-cta]',
          { opacity: 0, y: 18, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.3',
        )
        .to(
          ['.burst-spark', '.burst-glow'],
          { opacity: 0.35, duration: 1.2, ease: 'power1.out' },
          '-=0.6',
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
    let active = false
    // Delay canvas sparkles until burst moment (~3.8s)
    const arm = window.setTimeout(() => {
      active = true
    }, 3800)

    const particles = Array.from({ length: 120 }, (_, i) => ({
      x: 0.5 + (Math.random() - 0.5) * 0.08,
      y: 0.5 + (Math.random() - 0.5) * 0.08,
      r: 1.2 + Math.random() * 3.8,
      vx: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.012,
      life: 0,
      max: 0.7 + Math.random() * 0.9,
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
      if (active) {
        for (const p of particles) {
          p.life += 0.016
          p.x += p.vx
          p.y += p.vy
          p.vy -= 0.00008
          p.spin += 0.04
          const t = Math.min(1, p.life / p.max)
          const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85
          if (fade <= 0) {
            p.x = 0.5 + (Math.random() - 0.5) * 0.05
            p.y = 0.5 + (Math.random() - 0.5) * 0.05
            p.vx = (Math.random() - 0.5) * 0.014
            p.vy = (Math.random() - 0.5) * 0.014
            p.life = 0
            continue
          }
          const alpha = Math.max(0, Math.min(1, fade))
          const color = p.color.replace(/[\d.]+\)$/, `${alpha})`)
          drawStar(p.x * width, p.y * height, p.r * (0.7 + fade), color, p.spin)
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(arm)
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

      <SparkleField className="z-[14] opacity-40" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[29]" aria-hidden />

      <BalloonField count={64} />
      <SparkleBurst count={80} />

      <div
        data-veil
        className="pointer-events-none absolute inset-0 z-[32] bg-[var(--paper)]"
      />

      <div className="relative z-40 mx-auto max-w-6xl px-6 text-center">
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
