import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { siteContent } from '../../content/siteContent'

interface AudioContextValue {
  enabled: boolean
  toggle: () => void
  duck: () => void
  unduck: () => void
  hasTrack: boolean
}

const AudioCtx = createContext<AudioContextValue | null>(null)

const TARGET_VOLUME = 0.35

export function AudioProvider({
  children,
  musicReady = false,
}: {
  children: ReactNode
  /** Music begins on the Happy Birthday page, not the opening. */
  musicReady?: boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(true)
  const [hasTrack, setHasTrack] = useState(false)
  const enabledRef = useRef(true)
  const musicReadyRef = useRef(musicReady)
  const videoHoldRef = useRef(false)
  const fadeRef = useRef<number | null>(null)
  const startingRef = useRef(false)

  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  useEffect(() => {
    musicReadyRef.current = musicReady
  }, [musicReady])

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    fetch(siteContent.audio.src, { method: 'HEAD' })
      .then((res) => setHasTrack(res.ok))
      .catch(() => setHasTrack(false))

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    }
  }, [])

  const fadeTo = useCallback((to: number, ms = 700) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)

    const from = audio.volume
    const start = performance.now()

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms)
      const eased = t * (2 - t)
      audio.volume = from + (to - from) * eased
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else {
        fadeRef.current = null
      }
    }

    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !hasTrack || startingRef.current) return false
    if (!musicReadyRef.current || !enabledRef.current || videoHoldRef.current) {
      return false
    }
    if (!audio.paused && audio.src) {
      fadeTo(TARGET_VOLUME)
      return true
    }

    startingRef.current = true
    try {
      if (!audio.src) audio.src = siteContent.audio.src
      audio.loop = true
      await audio.play()
      fadeTo(TARGET_VOLUME)
      return true
    } catch {
      return false
    } finally {
      startingRef.current = false
    }
  }, [fadeTo, hasTrack])

  const pauseForVideo = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    videoHoldRef.current = true
    fadeTo(0, 350)
    window.setTimeout(() => {
      if (videoHoldRef.current) audio.pause()
    }, 380)
  }, [fadeTo])

  const resumeAfterVideo = useCallback(() => {
    videoHoldRef.current = false
    if (!enabledRef.current || !musicReadyRef.current) return
    void startPlayback()
  }, [startPlayback])

  // Start (and keep looping) once we reach Happy Birthday / journey.
  useEffect(() => {
    if (!hasTrack || !enabled || !musicReady) {
      const audio = audioRef.current
      if (audio && !musicReady) {
        fadeTo(0, 300)
        window.setTimeout(() => {
          if (!musicReadyRef.current) audio.pause()
        }, 320)
      }
      return
    }
    if (videoHoldRef.current) return

    let cancelled = false
    let unlocked = false

    const tryStart = async () => {
      const ok = await startPlayback()
      if (ok) unlocked = true
      return ok
    }

    void tryStart()

    const unlock = () => {
      if (cancelled || unlocked || !enabledRef.current || !musicReadyRef.current) {
        return
      }
      if (videoHoldRef.current) return
      void tryStart().then((ok) => {
        if (ok) {
          unlocked = true
          window.removeEventListener('pointerdown', unlock)
          window.removeEventListener('keydown', unlock)
          window.removeEventListener('touchstart', unlock)
        }
      })
    }

    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchstart', unlock)

    return () => {
      cancelled = true
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [enabled, fadeTo, hasTrack, musicReady, startPlayback])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !hasTrack) {
      setEnabled((v) => !v)
      return
    }

    if (!enabled) {
      setEnabled(true)
      enabledRef.current = true
      if (musicReadyRef.current && !videoHoldRef.current) {
        const ok = await startPlayback()
        if (!ok) setEnabled(false)
      }
    } else {
      fadeTo(0, 400)
      window.setTimeout(() => audio.pause(), 420)
      setEnabled(false)
    }
  }, [enabled, fadeTo, hasTrack, startPlayback])

  const value = useMemo(
    () => ({
      enabled,
      toggle,
      duck: pauseForVideo,
      unduck: resumeAfterVideo,
      hasTrack,
    }),
    [enabled, toggle, pauseForVideo, resumeAfterVideo, hasTrack],
  )

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
