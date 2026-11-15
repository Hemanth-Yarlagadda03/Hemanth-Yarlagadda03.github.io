import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../../content/siteContent'
import { SectionHeading } from '../ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const accentMap: Record<string, string> = {
  gold: '#c2185b',
  rose: '#b01048',
  burgundy: '#8e1450',
  midnight: '#4a2a3e',
  berry: '#d63384',
}

export function LittleThingsChapter() {
  const { littleThings } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-float-word]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 70%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-float-word]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 14,
          duration: 3 + (i % 4) * 0.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.1,
        })
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={rootRef}
      id="little-things"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/backgrounds/leopard.jpg)' }}
        aria-hidden
      />
      <div className="leopard-wash absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="rounded-[1.5rem] bg-white/80 px-5 py-8 shadow-[0_12px_40px_rgba(42,20,32,0.12)] backdrop-blur-[2px] md:px-10 md:py-12">
          <SectionHeading
            eyebrow={littleThings.eyebrow}
            title={littleThings.title}
            subtitle={littleThings.subtitle}
            align="center"
          />

          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-10">
            {littleThings.items.map((item) => {
              const open = openId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  data-float-word
                  data-cursor-hover
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="group relative max-w-[16rem] text-left"
                  aria-expanded={open}
                >
                  <span
                    className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight transition-colors"
                    style={{ color: open ? accentMap[item.accent ?? 'gold'] : '#1c1014' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="mt-1 block h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: accentMap[item.accent ?? 'gold'] }}
                  />
                  <span
                    className={`mt-3 block overflow-hidden text-sm leading-relaxed text-[#3d2430] transition-all duration-500 ${
                      open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.detail}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-16 text-center text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-[#5a2940]">
            Tap a phrase · find a secret
          </p>
        </div>
      </div>
    </section>
  )
}
