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
const DUCKED_VOLUME = 0.06

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [hasTrack, setHasTrack] = useState(false)
  const duckedRef = useRef(false)
  const fadeRef = useRef<number | null>(null)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'none'
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

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !hasTrack) {
      setEnabled((v) => !v)
      return
    }

    if (!enabled) {
      if (!audio.src) audio.src = siteContent.audio.src
      try {
        await audio.play()
        setEnabled(true)
        fadeTo(duckedRef.current ? DUCKED_VOLUME : TARGET_VOLUME)
      } catch {
        setEnabled(false)
      }
    } else {
      fadeTo(0, 400)
      window.setTimeout(() => audio.pause(), 420)
      setEnabled(false)
    }
  }, [enabled, fadeTo, hasTrack])

  const duck = useCallback(() => {
    duckedRef.current = true
    if (enabled) fadeTo(DUCKED_VOLUME, 400)
  }, [enabled, fadeTo])

  const unduck = useCallback(() => {
    duckedRef.current = false
    if (enabled) fadeTo(TARGET_VOLUME, 600)
  }, [enabled, fadeTo])

  const value = useMemo(
    () => ({ enabled, toggle, duck, unduck, hasTrack }),
    [enabled, toggle, duck, unduck, hasTrack],
  )

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
