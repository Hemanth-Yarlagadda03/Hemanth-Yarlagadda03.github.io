/**
 * CENTRAL CONTENT CONFIGURATION
 * Poems are kept exactly as written.
 * See ASSET_GUIDE.md for where each file belongs.
 */

export interface LittleThing {
  id: string
  label: string
  detail: string
  accent?: string
}

export interface Poem {
  id: string
  /** Optional. Leave empty for untitled poems. */
  title?: string
  lines: string[]
  dedication?: string
  lang?: 'en' | 'te'
}

export interface VideoMemory {
  id: string
  title: string
  caption?: string
  src: string
  poster: string
}

export const siteContent = {
  recipientName: 'Pushkara',

  opening: {
    introLine: 'Pushkara, a surprise waits for you.',
    videoSrc: '/assets/opening/celebrity-wish.mp4',
    posterSrc: '/assets/opening/poster.svg',
    durationHint: 'Press play when you’re ready',
  },

  reveal: {
    headline: 'HAPPY BIRTHDAY',
    subline:
      'Wishing you a year ahead filled with joy, love, laughter, and memories worth keeping. May every dream you hold find its way to you.',
    cta: "There's more to this…",
  },

  highlights: {
    eyebrow: 'Chapter 03',
    title: 'Pushkara Highlights',
    subtitle:
      'Moments that feel like you. Tap any clip to play. Drop your videos into /assets/videos/.',
    items: [
      {
        id: 'hl-01',
        title: 'Highlight 01',
        caption: 'Add highlight-01.mp4',
        src: '/assets/videos/highlight-01.mp4',
        poster: '/assets/videos/memory-01-poster.svg',
      },
      {
        id: 'hl-02',
        title: 'Highlight 02',
        caption: 'Add highlight-02.mp4',
        src: '/assets/videos/highlight-02.mp4',
        poster: '/assets/videos/memory-02-poster.svg',
      },
      {
        id: 'hl-03',
        title: 'Highlight 03',
        caption: 'Add highlight-03.mp4',
        src: '/assets/videos/highlight-03.mp4',
        poster: '/assets/videos/memory-03-poster.svg',
      },
      {
        id: 'hl-04',
        title: 'Highlight 04',
        caption: 'Add highlight-04.mp4',
        src: '/assets/videos/highlight-04.mp4',
        poster: '/assets/videos/memory-01-poster.svg',
      },
    ] satisfies VideoMemory[],
  },

  littleThings: {
    eyebrow: 'Chapter 04',
    title: 'Little Things About You',
    subtitle: 'Tap one. Tiny truths I notice about you.',
    items: [
      {
        id: 'lt-01',
        label: 'Your boba eyes',
        detail:
          'Okay but your eyes though. People actually get stuck looking at them. Soft, deep, kind of unfair.',
        accent: 'rose',
      },
      {
        id: 'lt-02',
        label: 'Your humour',
        detail:
          'You crack a joke and the whole room loosens up. Like, instantly. You do that without even trying.',
        accent: 'gold',
      },
      {
        id: 'lt-03',
        label: 'Your kindness',
        detail:
          'You’re just sweet. Not performance sweet. The real kind that makes people feel taken care of.',
        accent: 'burgundy',
      },
      {
        id: 'lt-04',
        label: 'Your intelligence',
        detail:
          'You’re sharp and you work hard and it shows. Watching you achieve things is honestly inspiring.',
        accent: 'midnight',
      },
      {
        id: 'lt-05',
        label: 'Your empathy',
        detail:
          'You actually care how people feel. You check in. You notice the quiet stuff most people miss.',
        accent: 'gold',
      },
      {
        id: 'lt-06',
        label: 'Your angelic presence',
        detail:
          'You walk in and the vibe gets prettier somehow. Charisma, softness, all of it. Very you.',
        accent: 'rose',
      },
      {
        id: 'lt-07',
        label: 'Your sparkly smile',
        detail:
          'Prettiest smile. Full stop. Hope it never wears off, queen. The world needs that smile.',
        accent: 'burgundy',
      },
      {
        id: 'lt-08',
        label: 'Your resilience',
        detail:
          'When things get messy you still show up. You deal with the hard stuff and you don’t quit. That grit is rare.',
        accent: 'midnight',
      },
    ] satisfies LittleThing[],
  },

  poems: {
    eyebrow: 'Chapter 05',
    title: 'Words That Deserve to Be Read',
    subtitle: 'Written for Pushkara.',
    entries: [
      {
        id: 'poem-01',
        lang: 'en' as const,
        lines: [
          'Pushkara, you are a muse,',
          "A wonderful dream I wouldn't refuse.",
          'If the moon had a favourite view,',
          'I suspect it would look like you.',
          'And if beauty ever needed a name,',
          'It would borrow yours all the same.',
        ],
      },
      {
        id: 'poem-02',
        lang: 'te' as const,
        lines: [
          'నదై తిరిగే నీ నడుము లా,',
          'అలై తాకావా ఓ పుష్కరా?',
          'కలై కదిలావా మదిలో,',
          'కలల దేవతవై ఈ వేళలో.',
          '',
          'ప్రకృతి దాచిన అందాలన్నీ నీలోన ఉన్నాయా?',
          'దేవుడు మిగిల్చిన రహస్యాలన్నీ నీ కళ్లలో ఉన్నాయా?',
          'నీ పిలుపు కోయిలమ్మ పలుకా,',
          'నీ నవ్వు వెన్నెల చిలిపి వెలుగా?',
          '',
          'నీ చూపు తాకితే మౌనమే పాటవుతుందే,',
          'నీ ఊహ తలిస్తే రేయే పొద్దవుతుందే.',
          'ఓ పుష్కరా, నువ్వు మాయవా, మహిమవా?',
          'నా కలానికి అందని అందమైన కవితవా?',
        ],
      },
    ] satisfies Poem[],
  },

  videos: {
    eyebrow: 'Chapter 06',
    title: 'Video Memory',
    subtitle: 'One clip that holds a whole feeling. Add your MP4 when ready.',
    items: [
      {
        id: 'vid-01',
        title: 'A moment kept',
        caption: 'Replace with memory-01.mp4',
        src: '/assets/videos/memory-01.mp4',
        poster: '/assets/videos/memory-01-poster.svg',
      },
    ] satisfies VideoMemory[],
  },

  finale: {
    eyebrow: 'The Final Surprise',
    headline: 'Happy Birthday,',
    paragraphs: [
      'I cherish you fully, without holding back. You are one of the most incredible people I have ever known. Complete in a way that is rare. The smartest, funniest, sweetest, most gorgeous person, and somehow still becoming more.',
      'You are going to achieve beautiful things, and I will be so proud to witness them. I already am. Everyone who knows you is. Keep going, queen. You deserve the world, and it is yours for the taking.',
      'You mean more to me than a short message can carry. It is heartening to watch you win, and you will keep winning. May this year bring you success that feels earned, and happiness that stays.',
      'My heart is grateful for you. I am so glad you are part of my life. You bring warmth, joy, and meaning into my days and into everyone else’s too. Your presence feels familiar and safe. Every smile, every small shared moment, has quietly found a place in my heart.',
      'No matter what the future holds, I will always be thankful for you, for your presence, and for the place you hold. Love you. You are the best.',
    ],
    closingLine: 'Happy Birthday, Pushkara.',
    mediaSrc: '/assets/photos/finale.svg',
    mediaType: 'image' as const,
    revealLabel: 'One last thing',
    secretMessage:
      'Wherever life takes you next, keep shining. The world is brighter with you in it, queen.',
  },

  audio: {
    src: '/assets/music/ambient.mp3',
    label: 'Music',
  },

  meta: {
    pageTitle: 'Happy Birthday, Pushkara',
    description: 'A birthday experience made for Pushkara.',
  },
} as const

export type SiteContent = typeof siteContent
