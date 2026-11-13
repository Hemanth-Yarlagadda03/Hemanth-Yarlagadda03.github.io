import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduced) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      setHovering(!!t?.closest('a, button, [data-cursor-hover]'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{
        x: sx,
        y: sy,
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="transition-[width,height,margin,background] duration-300"
        style={{
          width: hovering ? 36 : 16,
          height: hovering ? 36 : 16,
          marginLeft: hovering ? -18 : -8,
          marginTop: hovering ? -18 : -8,
          background: hovering ? 'var(--bow)' : 'var(--rose)',
          borderRadius: hovering ? '40% 40% 40% 0' : '50%',
          transform: hovering ? 'rotate(-45deg)' : undefined,
          boxShadow: '0 0 0 3px rgba(255,255,255,0.65)',
        }}
      />
    </motion.div>
  )
}
