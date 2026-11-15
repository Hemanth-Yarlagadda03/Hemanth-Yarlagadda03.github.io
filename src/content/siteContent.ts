/**
 * CENTRAL CONTENT CONFIGURATION
 * Replace media paths with real assets. Poems are kept exactly as written.
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
  title: string
  /** Lines of the poem. Use empty string for stanza breaks. */
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
      'Moments that feel like you — tap any clip to play. Drop your videos into /assets/videos/.',
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
    subtitle: 'Tap each one — the truths that make Pushkara, Pushkara.',
    items: [
      {
        id: 'lt-01',
        label: 'Your boba eyes',
        detail:
          'Eyes people get lost in — soft, deep, impossible to look away from once they’ve found you.',
        accent: 'rose',
      },
      {
        id: 'lt-02',
        label: 'Your humour',
        detail:
          'You walk into a room and the air changes. Your jokes don’t just land — they light everything up.',
        accent: 'gold',
      },
      {
        id: 'lt-03',
        label: 'Your kindness',
        detail:
          'You are genuinely sweet — the kind of kindness that feels rare, steady, and real.',
        accent: 'burgundy',
      },
      {
        id: 'lt-04',
        label: 'Your intelligence',
        detail:
          'Bright, sharp, and always becoming more. An achiever through and through — and it shows.',
        accent: 'midnight',
      },
      {
        id: 'lt-05',
        label: 'Your empathy',
        detail:
          'You feel people deeply. You notice what hurts, what heals, and you meet it with care.',
        accent: 'gold',
      },
      {
        id: 'lt-06',
        label: 'Your angelic presence',
        detail:
          'Beautiful and charismatic without trying — a presence that softens a space the second you arrive.',
        accent: 'rose',
      },
      {
        id: 'lt-07',
        label: 'Your sparkly smile',
        detail:
          'The prettiest smile — and may it never fade. Keep shining, queen.',
        accent: 'burgundy',
      },
      {
        id: 'lt-08',
        label: 'Your resilience',
        detail:
          'Your tenacity when life gets heavy. You face the hard things and still refuse to give up.',
        accent: 'midnight',
      },
    ] satisfies LittleThing[],
  },

  poems: {
    eyebrow: 'Chapter 05',
    title: 'Words That Deserve to Be Read',
    subtitle: 'For Pushkara — kept exactly as written.',
    entries: [
      {
        id: 'poem-01',
        title: 'Muse',
        dedication: 'For Pushkara',
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
        title: 'ఓ పుష్కరా',
        dedication: '',
        lang: 'te' as const,
        lines: [
          'నదై తిరిగే నీ నడుము లా,',
          'అలై తాకావా ఓ పుష్కరా?',
          'కలై కదిలావా మదిలో,',
          'కలల దేవతవై ఈ వేళలో.',
        ],
      },
      {
        id: 'poem-03',
        title: 'అందమైన కవిత',
        dedication: '',
        lang: 'te' as const,
        lines: [
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
      'I cherish you — fully, without holding back. You are one of the most incredible people I have ever known. Complete in a way that is rare. The smartest, funniest, sweetest, most gorgeous person — and somehow still becoming more.',
      'You are going to achieve beautiful things, and I will be so proud to witness them. I already am. Everyone who knows you is. Keep going, queen. You deserve the world, and it is yours for the taking.',
      'You mean more to me than a short message can carry. It is heartening to watch you win — and you will keep winning. May this year bring you success that feels earned, and happiness that stays.',
      'My heart is grateful for you. I am so glad you are part of my life. You bring warmth, joy, and meaning into my days — and into everyone else’s, too. Your presence feels familiar and safe. Every smile, every small shared moment, has quietly found a place in my heart.',
      'No matter what the future holds, I will always be thankful for you — for your presence, and for the place you hold. Love you. You are the best.',
    ],
    closingLine: 'Happy Birthday, Pushkara.',
    mediaSrc: '/assets/photos/finale.svg',
    mediaType: 'image' as const,
    revealLabel: 'One last thing',
    secretMessage:
      'Wherever life takes you next — keep shining. The world is brighter with you in it, queen.',
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
