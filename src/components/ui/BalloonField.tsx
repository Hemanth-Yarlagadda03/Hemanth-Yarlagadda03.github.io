import { useMemo } from 'react'

const COLORS = [
  '#EF3E56',
  '#FF9EC4',
  '#9AF0D8',
  '#E4D2FF',
  '#C8E8FF',
  '#FFE7A3',
  '#FF4F87',
  '#FF6B9D',
  '#B8F2E6',
  '#FFD0DE',
]

export function BalloonField({ count = 64 }: { count?: number }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const col = i % 12
        const row = Math.floor(i / 12)
        return {
          id: i,
          left: `${2 + col * 8 + (row % 2) * 3 + (i % 3)}%`,
          size: 34 + (i % 7) * 8,
          color: COLORS[i % COLORS.length],
          startY: 40 + (i % 9) * 28 + row * 18,
        }
      }),
    [count],
  )

  return (
    <div
      className="balloon-field pointer-events-none absolute inset-0 z-[25] overflow-hidden"
      aria-hidden
    >
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={{
            left: b.left,
            bottom: `-${b.startY}px`,
            width: b.size,
            height: b.size * 1.28,
            background: b.color,
          }}
        />
      ))}
    </div>
  )
}
