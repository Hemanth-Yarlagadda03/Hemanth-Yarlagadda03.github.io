import { useEffect, useState } from 'react'

const chapters = [
  { id: 'highlights', label: '03' },
  { id: 'little-things', label: '04' },
  { id: 'poems', label: '05' },
  { id: 'videos', label: '06' },
  { id: 'finale', label: '07' },
]

export function ChapterProgress() {
  const [active, setActive] = useState(chapters[0].id)

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -35% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Chapter progress"
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={`text-[0.62rem] tracking-[0.2em] transition-opacity ${
            active === c.id ? 'opacity-100' : 'opacity-35 hover:opacity-70'
          }`}
          aria-current={active === c.id ? 'true' : undefined}
        >
          {c.label}
        </a>
      ))}
    </nav>
  )
}
