import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react'
import { siteContent, type FriendMessage } from '../../content/siteContent'
import { SectionHeading } from '../ui/SectionHeading'
import { useAudio } from '../audio/AudioProvider'
import { useMediaPresence } from '../../hooks/useMediaPresence'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function FriendCard({
  friend,
  index,
  onOpenVideo,
}: {
  friend: FriendMessage
  index: number
  onOpenVideo: (friend: FriendMessage) => void
}) {
  const videoPresent = useMediaPresence(friend.video)

  return (
    <article
      data-friend
      className={`group relative break-inside-avoid ${
        index % 5 === 0
          ? 'md:mt-10'
          : index % 3 === 0
            ? 'md:mt-20'
            : index % 2 === 0
              ? 'md:mt-6'
              : ''
      }`}
    >
      {friend.photo && (
        <div className="mb-5 overflow-hidden">
          <img
            src={friend.photo}
            alt={friend.name}
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      )}
      <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[var(--cherry)]">
        {friend.relationship}
      </p>
      <h3 className="mt-2 font-display text-3xl text-[var(--ink)]">{friend.name}</h3>
      <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-[var(--ink-muted)]">
        “{friend.message}”
      </blockquote>
      {friend.video && (
        <button
          type="button"
          data-cursor-hover
          onClick={() => onOpenVideo(friend)}
          className="mt-5 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-[var(--ink)]"
        >
          <Play size={14} fill="currentColor" />
          {videoPresent === false ? 'Video coming soon' : 'Watch message'}
        </button>
      )}
    </article>
  )
}

export function FriendsChapter() {
  const { friends } = siteContent
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { duck, unduck } = useAudio()
  const [active, setActive] = useState<FriendMessage | null>(null)
  const videoPresent = useMediaPresence(active?.video)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-friend]',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 65%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (active) duck()
    else unduck()
  }, [active, duck, unduck])

  return (
    <section
      ref={rootRef}
      id="friends"
      className="relative bg-white/40 py-24 md:py-32"
      style={{ ['--cursor-fg' as string]: 'var(--ink)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={friends.eyebrow}
          title={friends.title}
          subtitle={friends.subtitle}
        />

        <div className="columns-1 gap-10 sm:columns-2 lg:columns-3">
          {friends.messages.map((friend, index) => (
            <div key={friend.id} className="mb-12">
              <FriendCard
                friend={friend}
                index={index}
                onOpenVideo={setActive}
              />
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--midnight)]/90 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {videoPresent ? (
              <video
                key={active.video}
                src={active.video}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full"
                onEnded={() => setActive(null)}
              />
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-3 px-8 text-center text-[var(--ivory)]">
                <p className="font-display text-3xl">{active.name}</p>
                <p className="text-sm text-[var(--ivory)]/60">
                  Place a video at{' '}
                  <code className="text-[var(--gold)]">{active.video}</code>
                </p>
              </div>
            )}
            <div className="flex items-center justify-between bg-[var(--ink)] px-5 py-4 text-[var(--ivory)]">
              <p className="font-display text-xl">{active.name}</p>
              <button
                type="button"
                className="text-[0.65rem] tracking-[0.22em] uppercase"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
