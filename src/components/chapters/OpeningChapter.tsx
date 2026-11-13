import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { Play, Volume2 } from 'lucide-react'
import { siteContent } from '../../content/siteContent'
import { useAudio } from '../audio/AudioProvider'
import { useMediaPresence } from '../../hooks/useMediaPresence'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  onComplete: () => void
}

export function OpeningChapter({ onComplete }: Props) {
  const { opening } = siteContent
  const videoRef = useRef<HTMLVideoElement>(null)
  const rootRef = useRef<HTMLElement>(null)
  const { duck, unduck } = useAudio()
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
      gsap.to('[data-ambient]', {
        scale: 1.06,
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, el)
    return () => ctx.revert()
  }, [reduced])

  const finish = () => {
    unduck()
    const el = rootRef.current
    if (!el || reduced) {
      onComplete()
      return
    }
    gsap.to(el, {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(8px)',
      duration: 1.1,
      ease: 'power2.inOut',
      onComplete,
    })
  }

  const playFallback = () => {
    setPhase('fallback')
    duck()
    window.setTimeout(finish, reduced ? 800 : 4200)
  }

  const handlePlay = async () => {
    if (videoPresent === false) {
      playFallback()
      return
    }

    const video = videoRef.current
    if (!video) {
      playFallback()
      return
    }

    try {
      duck()
      setPhase('playing')
      await video.play()
    } catch {
      playFallback()
    }
  }

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--midnight)] text-[var(--ivory)]"
      style={{ ['--cursor-fg' as string]: 'var(--ivory)' }}
    >
      <div
        data-ambient
        className="pointer-events-none absolute inset-[-8%] bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url(${opening.posterSrc})`,
          filter: 'saturate(0.85) contrast(1.05)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,14,22,0.88)_75%)]" />
      <div className="film-grain absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <p
          data-open-reveal
          className="mb-8 text-[0.72rem] tracking-[0.42em] uppercase text-[var(--gold)]"
        >
          {opening.introLine}
        </p>

        <div
          data-open-reveal
          className="relative aspect-video w-full max-w-3xl overflow-hidden border border-[var(--ivory)]/15 bg-black/40 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={opening.posterSrc}
            playsInline
            preload="metadata"
            onTimeUpdate={() => {
              const v = videoRef.current
              if (!v?.duration) return
              setProgress(v.currentTime / v.duration)
            }}
            onEnded={finish}
          >
            <source src={opening.videoSrc} type="video/mp4" />
          </video>

          <AnimatePresence>
            {(phase === 'ready' || phase === 'loading') && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handlePlay}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/35 backdrop-blur-[2px]"
                data-cursor-hover
                aria-label="Play birthday message"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--ivory)]/40 bg-[var(--ivory)]/10 transition-transform hover:scale-105">
                  {phase === 'loading' ? (
                    <span className="h-8 w-8 animate-spin rounded-full border border-[var(--ivory)]/30 border-t-[var(--gold)]" />
                  ) : (
                    <Play className="ml-1 text-[var(--ivory)]" size={28} fill="currentColor" />
                  )}
                </span>
                <span className="text-[0.7rem] tracking-[0.28em] uppercase text-[var(--ivory)]/80">
                  {phase === 'loading' ? 'Preparing…' : 'Play message'}
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
                className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--midnight)] px-8 text-center"
              >
                <p className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-tight text-[var(--ivory)]">
                  A personal message
                  <br />
                  is on its way.
                </p>
                <p className="mt-4 max-w-md text-sm text-[var(--ivory)]/60">
                  Add <code className="text-[var(--gold)]">celebrity-wish.mp4</code> to{' '}
                  <code className="text-[var(--gold)]">/public/assets/opening/</code> to replace
                  this cinematic placeholder.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 'playing' && (
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--ivory)]/15">
              <div
                className="h-full bg-[var(--gold)] transition-[width] duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}
        </div>

        <div
          data-open-reveal
          className="mt-8 flex items-center gap-3 text-[0.65rem] tracking-[0.24em] uppercase text-[var(--ivory)]/55"
        >
          <Volume2 size={14} />
          <span>Sound on · {opening.durationHint}</span>
        </div>

        {phase === 'ready' && (
          <button
            type="button"
            onClick={finish}
            className="mt-10 text-[0.65rem] tracking-[0.28em] uppercase text-[var(--ivory)]/40 underline-offset-4 transition hover:text-[var(--ivory)]/70 hover:underline"
          >
            Skip intro
          </button>
        )}
      </div>
    </section>
  )
}
