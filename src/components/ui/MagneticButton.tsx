import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import clsx from 'clsx'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  children: ReactNode
  className?: string
  variant?: 'solid' | 'ghost' | 'gold' | 'pop'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({
  children,
  className,
  variant = 'solid',
  onClick,
  type = 'button',
}: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 })

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.28)
    y.set(dy * 0.28)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={clsx(
        'magnetic-btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-9 py-4 text-[0.78rem] font-bold tracking-[0.12em] uppercase transition-colors duration-300',
        variant === 'solid' &&
          'bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--cherry)]',
        variant === 'ghost' &&
          'border-2 border-[var(--cherry)]/35 text-[var(--ink)] hover:border-[var(--cherry)] hover:text-[var(--cherry)]',
        variant === 'gold' &&
          'bg-[var(--butter)] text-[var(--ink)] hover:bg-[var(--mint)]',
        variant === 'pop' &&
          'border-2 border-white/70 bg-[var(--bow)] text-white shadow-[0_14px_36px_rgba(239,62,86,0.35)] hover:bg-[var(--cherry)] hover:shadow-[0_16px_40px_rgba(255,79,135,0.4)]',
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
