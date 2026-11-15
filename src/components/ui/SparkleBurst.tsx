import { useMemo } from 'react'

const COLORS = [
  '#FFFFFF',
  '#FF9EC4',
  '#EF3E56',
  '#9AF0D8',
  '#E4D2FF',
  '#FFE7A3',
  '#C8E8FF',
  '#FF4F87',
]

/** Radial explosion of stars/sparkles from screen center. */
export function SparkleBurst({ count = 80 }: { count?: number }) {
  const sparks = useMemo(() => {
    const vmin = typeof window !== 'undefined' ? Math.min(window.innerWidth, window.innerHeight) / 100 : 8
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.12
      const dist = (32 + (i % 9) * 10) * vmin
      return {
        id: i,
        color: COLORS[i % COLORS.length],
        size: 7 + (i % 5) * 3,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rot: (i * 41) % 360,
      }
    })
  }, [count])

  return (
    <div
      data-burst
      className="pointer-events-none absolute inset-0 z-[28] flex items-center justify-center opacity-0"
      aria-hidden
    >
      <div className="burst-glow absolute h-[min(95vw,720px)] w-[min(95vw,720px)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,158,196,0.65)_28%,rgba(255,79,135,0.2)_55%,transparent_72%)]" />
      {sparks.map((s) => (
        <span
          key={s.id}
          className="burst-spark absolute"
          data-x={s.x}
          data-y={s.y}
          data-rot={s.rot}
          style={{
            width: s.size,
            height: s.size,
            background: s.color,
            color: s.color,
          }}
        />
      ))}
    </div>
  )
}
