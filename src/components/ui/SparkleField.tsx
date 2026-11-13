const SPARKLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${(i * 37) % 100}%`,
  left: `${(i * 53) % 100}%`,
  dur: `${2.2 + (i % 5) * 0.45}s`,
  delay: `${(i % 7) * 0.18}s`,
  size: `${0.28 + (i % 4) * 0.12}rem`,
}))

export function SparkleField({ className = '' }: { className?: string }) {
  return (
    <div className={`sparkle-field ${className}`} aria-hidden>
      {SPARKLES.map((s) => (
        <span
          key={s.id}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            ['--dur' as string]: s.dur,
          }}
        />
      ))}
    </div>
  )
}
