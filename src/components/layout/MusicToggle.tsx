import { Volume2, VolumeX } from 'lucide-react'
import { useAudio } from '../audio/AudioProvider'
import { siteContent } from '../../content/siteContent'

export function MusicToggle() {
  const { enabled, toggle, hasTrack } = useAudio()

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 border border-current/20 px-3 py-2 text-[0.65rem] tracking-[0.2em] uppercase backdrop-blur-sm transition-opacity hover:opacity-80"
      style={{
        color: 'var(--cursor-fg, var(--ivory))',
        background: 'color-mix(in oklab, var(--midnight) 45%, transparent)',
      }}
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute background music' : 'Play background music'}
      title={
        hasTrack
          ? siteContent.audio.label
          : 'Add /assets/music/ambient.mp3 to enable music'
      }
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className="hidden sm:inline">{enabled ? 'On' : 'Off'}</span>
    </button>
  )
}
