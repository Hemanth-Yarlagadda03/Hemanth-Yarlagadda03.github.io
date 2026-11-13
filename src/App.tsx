import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AudioProvider } from './components/audio/AudioProvider'
import { OpeningChapter } from './components/chapters/OpeningChapter'
import { RevealChapter } from './components/chapters/RevealChapter'
import { StoryChapter } from './components/chapters/StoryChapter'
import { LittleThingsChapter } from './components/chapters/LittleThingsChapter'
import { PoemsChapter } from './components/chapters/PoemsChapter'
import { FriendsChapter } from './components/chapters/FriendsChapter'
import { VideoMemoriesChapter } from './components/chapters/VideoMemoriesChapter'
import { FinaleChapter } from './components/chapters/FinaleChapter'
import { CustomCursor } from './components/layout/CustomCursor'
import { MusicToggle } from './components/layout/MusicToggle'
import { ChapterProgress } from './components/layout/ChapterProgress'
import { siteContent } from './content/siteContent'

gsap.registerPlugin(ScrollTrigger)

type Phase = 'opening' | 'reveal' | 'journey'

export default function App() {
  const [phase, setPhase] = useState<Phase>('opening')

  useEffect(() => {
    document.title = siteContent.meta.pageTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', siteContent.meta.description)
  }, [])

  useEffect(() => {
    if (phase !== 'journey') return
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (phase === 'journey') {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    } else {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    }
  }, [phase])

  return (
    <AudioProvider>
      <CustomCursor />
      <MusicToggle />

      <AnimatePresence mode="wait">
        {phase === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <OpeningChapter onComplete={() => setPhase('reveal')} />
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
            transition={{ duration: 0.9 }}
          >
            <RevealChapter onContinue={() => setPhase('journey')} />
          </motion.div>
        )}

        {phase === 'journey' && (
          <motion.main
            key="journey"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--ivory)]"
            style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
          >
            <ChapterProgress />
            <StoryChapter />
            <LittleThingsChapter />
            <PoemsChapter />
            <FriendsChapter />
            <VideoMemoriesChapter />
            <FinaleChapter />
            <footer className="border-t border-[var(--ink)]/10 bg-[var(--ivory)] px-6 py-10 text-center text-[0.68rem] tracking-[0.22em] uppercase text-[var(--ink-muted)]">
              Made with care · {siteContent.recipientName}
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </AudioProvider>
  )
}
