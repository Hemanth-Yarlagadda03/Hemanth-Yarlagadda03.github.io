import { Volume2, VolumeX } from 'lucide-react'
import { useAudio } from '../audio/AudioProvider'
import { siteContent } from '../../content/siteContent'

export function MusicToggle() {
  const { enabled, toggle, hasTrack } = useAudio()

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border-2 border-white/80 px-3.5 py-2 text-[0.68rem] font-bold tracking-[0.16em] uppercase shadow-[0_8px_24px_rgba(255,79,135,0.2)] backdrop-blur-sm transition-opacity hover:opacity-90"
      style={{
        color: 'var(--ink)',
        background: 'color-mix(in oklab, white 78%, var(--rose))',
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
