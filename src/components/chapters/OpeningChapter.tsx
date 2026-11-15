import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { Play, Volume2 } from 'lucide-react'
import { siteContent } from '../../content/siteContent'
import { useMediaPresence } from '../../hooks/useMediaPresence'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SparkleField } from '../ui/SparkleField'

interface Props {
  onComplete: () => void
}

export function OpeningChapter({ onComplete }: Props) {
  const { opening } = siteContent
  const videoRef = useRef<HTMLVideoElement>(null)
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const videoPresent = useMediaPresence(opening.videoSrc)

  const [phase, setPhase] = useState<'loading' | 'ready' | 'playing' | 'fallback'>(
    'loading',
  )
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => setPhase('ready'), reduced ? 200 : 1200)
    return () => window.clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    const el = rootRef.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-open-reveal]',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 },
      )
    }, el)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (phase !== 'playing') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'playing') return
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const start = async () => {
      try {
        await video.play()
      } catch {
        if (!cancelled) playFallback()
      }
    }
    void start()
    return () => {
      cancelled = true
    }
    // playFallback is stable enough for this open-once path
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const finish = () => {
    const el = rootRef.current
    if (!el || reduced) {
      onComplete()
      return
    }
    gsap.to(el, {
      opacity: 0,
      scale: 1.02,
      filter: 'blur(8px)',
      duration: 1.1,
      ease: 'power2.inOut',
      onComplete,
    })
  }

  const playFallback = () => {
    setPhase('fallback')
    window.setTimeout(finish, reduced ? 800 : 4200)
  }

  const handlePlay = () => {
    if (videoPresent === false) {
      playFallback()
      return
    }
    setPhase('playing')
  }

  const isFullscreen = phase === 'playing'

  return (
    <section
      ref={rootRef}
      className="candy-sky relative flex min-h-[100svh] items-center justify-center overflow-hidden text-[var(--ink)]"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <div
        className="cloud-blob"
        style={{ width: '42vw', height: '18vw', top: '10%', left: '-8%', background: 'rgba(255,255,255,0.7)' }}
      />
      <div
        className="cloud-blob"
        style={{ width: '36vw', height: '14vw', top: '16%', right: '-6%', background: 'rgba(200,232,255,0.55)' }}
      />
      <div
        className="cloud-blob"
        style={{ width: '40vw', height: '16vw', bottom: '12%', left: '18%', background: 'rgba(154,240,216,0.28)' }}
      />
      <SparkleField className="z-[5] opacity-45" />
      <div className="film-grain absolute inset-0 z-[6]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <p
          data-open-reveal
          className="mb-8 text-[0.78rem] font-bold tracking-[0.28em] uppercase text-[var(--bow)]"
        >
          {opening.introLine}
        </p>

        {/* Spacer keeps layout while video expands fullscreen */}
        <div
          data-open-reveal
          className={`relative aspect-video w-full max-w-3xl ${isFullscreen ? 'invisible' : ''}`}
          aria-hidden={isFullscreen}
        >
          {!isFullscreen && (
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border-4 border-white shadow-[0_30px_80px_rgba(255,79,135,0.22)]">
              {/* Sealed tease — no video thumbnail spoiler */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.85), transparent 45%), radial-gradient(ellipse at 80% 80%, rgba(228,210,255,0.7), transparent 40%), linear-gradient(145deg, #ffe3ef 0%, #eaf7ff 48%, #f3e8ff 100%)',
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={reduced ? undefined : { x: ['0%', '280%'] }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 4.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }
                }
              />
              <div className="pointer-events-none absolute inset-6 rounded-[1.25rem] border border-white/70" />
              <SparkleField className="opacity-50" />

              <AnimatePresence>
                {(phase === 'ready' || phase === 'loading') && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handlePlay}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8"
                    data-cursor-hover
                    aria-label="Play birthday message"
                  >
                    <p className="font-script text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-[var(--bow)]">
                      Something just for you
                    </p>
                    <p className="max-w-xs text-sm font-medium text-[var(--ink-muted)]">
                      A sealed wish. Press play when your heart is ready.
                    </p>
                    <span className="mt-2 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[var(--bow)] shadow-[0_12px_30px_rgba(239,62,86,0.35)] transition-transform hover:scale-105">
                      {phase === 'loading' ? (
                        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <Play className="ml-1 text-white" size={28} fill="currentColor" />
                      )}
                    </span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] uppercase text-[var(--ink)]">
                      {phase === 'loading' ? 'Preparing…' : 'Open the wish'}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {phase === 'fallback' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(160deg,#ffe6f2,#eaf7ff)] px-8 text-center"
                  >
                    <p className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-tight text-[var(--bow)]">
                      A message is on its way.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div
          data-open-reveal
          className={`mt-8 flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[var(--ink-muted)] ${isFullscreen ? 'invisible' : ''}`}
        >
          <Volume2 size={14} />
          <span>Sound on · {opening.durationHint}</span>
        </div>

        {phase === 'ready' && (
          <button
            type="button"
            onClick={finish}
            className="mt-10 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[var(--ink-muted)] underline-offset-4 transition hover:text-[var(--bow)] hover:underline"
          >
            Skip intro
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="opening-fullscreen"
            className="fixed inset-0 z-[80] flex flex-col bg-black"
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Birthday message"
          >
            <video
              ref={videoRef}
              className="h-full w-full flex-1 object-contain bg-black"
              playsInline
              preload="auto"
              onTimeUpdate={() => {
                const v = videoRef.current
                if (!v?.duration) return
                setProgress(v.currentTime / v.duration)
              }}
              onEnded={finish}
            >
              <source src={opening.videoSrc} type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/20">
              <div
                className="h-full bg-[var(--bow)] transition-[width] duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
