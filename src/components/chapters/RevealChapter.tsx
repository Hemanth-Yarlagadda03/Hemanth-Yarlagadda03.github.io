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
  const burstArmed = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (reduced) {
      gsap.set('[data-reveal-line], [data-reveal-sub], [data-reveal-cta], [data-burst]', {
        opacity: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
      })
      gsap.set('.balloon', { opacity: 0.25 })
      return
    }

    // Wait one frame so the candy sky paints before we hide/show layers
    let tl: gsap.core.Timeline | null = null
    const ctx = gsap.context(() => {
      const travel = -(window.innerHeight + 320)

      gsap.set('[data-copy]', { opacity: 0 })
      gsap.set('[data-reveal-line], [data-reveal-sub], [data-reveal-cta]', {
        opacity: 0,
      })
      gsap.set('[data-burst]', { opacity: 0, scale: 0.2 })
      gsap.set('.burst-spark', { opacity: 0, x: 0, y: 0, scale: 0 })
      // Balloons start just under the fold, already slightly visible
      gsap.set('.balloon', { y: 80, opacity: 0, scale: 0.7 })

      tl = gsap.timeline({ defaults: { ease: 'none' } })

      // Brief beat so the sky is visible
      tl.to({}, { duration: 0.25 })
        // 1) Balloons appear and fly all the way off the top (VISIBLE)
        .to('.balloon', {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: { each: 0.015, from: 'random' },
          ease: 'power2.out',
        })
        .to(
          '.balloon',
          {
            y: travel,
            duration: 3.2,
            stagger: { each: 0.028, from: 'edges' },
            ease: 'power1.in',
          },
          '-=0.1',
        )
        // 2) AFTER balloons clear: big sparkle burst
        .add(() => {
          burstArmed.current = true
        })
        .to(
          '[data-burst]',
          {
            opacity: 1,
            scale: 1.25,
            duration: 0.5,
            ease: 'back.out(2.2)',
          },
        )
        .to(
          '.burst-spark',
          {
            opacity: 1,
            x: (_i, target) => Number((target as HTMLElement).dataset.x || 0),
            y: (_i, target) => Number((target as HTMLElement).dataset.y || 0),
            scale: 1,
            rotation: (_i, target) => Number((target as HTMLElement).dataset.rot || 0),
            duration: 0.95,
            stagger: 0.005,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        .to('[data-burst]', { scale: 1, duration: 0.45, ease: 'power2.out' }, '-=0.4')
        // 3) Birthday copy reveals on top of the celebration
        .to('[data-copy]', { opacity: 1, duration: 0.2 }, '-=0.15')
        .fromTo(
          '[data-reveal-line]',
          { yPercent: 110, opacity: 0, scale: 0.92 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power4.out',
          },
          '-=0.05',
        )
        .fromTo(
          '[data-reveal-sub]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.35',
        )
        .fromTo(
          '[data-reveal-cta]',
          { opacity: 0, y: 16, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3',
        )
        .to(
          ['.burst-spark', '.burst-glow'],
          { opacity: 0.4, duration: 1.1, ease: 'power1.out' },
          '-=0.5',
        )
    }, el)

    return () => {
      ctx.revert()
      tl?.kill()
    }
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

    const particles = Array.from({ length: 140 }, (_, i) => ({
      x: 0.5 + (Math.random() - 0.5) * 0.06,
      y: 0.5 + (Math.random() - 0.5) * 0.06,
      r: 1.4 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.014,
      vy: (Math.random() - 0.5) * 0.014,
      life: 0,
      max: 0.75 + Math.random() * 0.9,
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
      if (burstArmed.current) {
        for (const p of particles) {
          p.life += 0.016
          p.x += p.vx
          p.y += p.vy
          p.vy -= 0.00008
          p.spin += 0.04
          const t = Math.min(1, p.life / p.max)
          const fade = t < 0.12 ? t / 0.12 : 1 - (t - 0.12) / 0.88
          if (fade <= 0) {
            p.x = 0.5 + (Math.random() - 0.5) * 0.04
            p.y = 0.5 + (Math.random() - 0.5) * 0.04
            p.vx = (Math.random() - 0.5) * 0.016
            p.vy = (Math.random() - 0.5) * 0.016
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

      <SparkleField className="z-[10] opacity-50" />

      {/* Balloons + burst sit ABOVE the sky, BELOW the text — always visible */}
      <BalloonField count={64} />
      <SparkleBurst count={80} />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[36]" aria-hidden />

      <div data-copy className="relative z-40 mx-auto max-w-6xl px-6 text-center opacity-0">
        <div className="overflow-hidden">
          <p
            data-reveal-line
            className="font-display text-[clamp(3rem,12vw,7.5rem)] leading-[0.9] text-[var(--bow)] drop-shadow-[0_4px_24px_rgba(255,255,255,0.65)]"
          >
            {reveal.headline}
          </p>
        </div>
        <div className="mt-3 overflow-hidden md:mt-5">
          <p
            data-reveal-line
            className="font-script text-[clamp(2.6rem,9vw,5.5rem)] leading-none text-[var(--ink)] drop-shadow-[0_4px_20px_rgba(255,255,255,0.55)]"
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
