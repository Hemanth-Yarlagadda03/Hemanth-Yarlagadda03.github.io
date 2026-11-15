import { useMemo } from 'react'

const COLORS = ['#EF3E56', '#FF9EC4', '#9AF0D8', '#E4D2FF', '#C8E8FF', '#FFE7A3', '#FF4F87']

export function BalloonField({ count = 28 }: { count?: number }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 17 + (i % 5) * 7) % 96}%`,
        delay: `${(i % 10) * 0.12}s`,
        duration: `${4.5 + (i % 6) * 0.55}s`,
        size: 28 + (i % 5) * 10,
        color: COLORS[i % COLORS.length],
        sway: i % 2 === 0 ? 18 : -22,
      })),
    [count],
  )

  return (
    <div className="balloon-field pointer-events-none absolute inset-0 z-[25] overflow-hidden" aria-hidden>
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={{
            left: b.left,
            width: b.size,
            height: b.size * 1.25,
            background: b.color,
            animationDelay: b.delay,
            animationDuration: b.duration,
            ['--sway' as string]: `${b.sway}px`,
          }}
        />
      ))}
    </div>
  )
}
