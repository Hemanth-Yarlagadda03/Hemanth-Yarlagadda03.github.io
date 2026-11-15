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
  /** Optional overlay title on the tile. */
  title?: string
  caption?: string
  src: string
  poster: string
}

export const siteContent = {
  recipientName: 'Pushkara',

  opening: {
    introLine: 'Pushkara, a surprise waits for you.',
    videoSrc: '/assets/opening/celebrity-wish.mp4',
    posterSrc: '/assets/opening/poster.jpg',
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
    title: 'Pushkara Moments',
    subtitle: 'Moments that feel like you.',
    items: [
      {
        id: 'hl-01',
        caption: 'A little moment kept',
        src: '/assets/videos/highlight-01.mp4',
        poster: '/assets/videos/highlight-01-poster.jpg',
      },
      {
        id: 'hl-02',
        caption: 'Still smiling in this one',
        src: '/assets/videos/highlight-02.mp4',
        poster: '/assets/videos/highlight-02-poster.jpg',
      },
      {
        id: 'hl-03',
        caption: 'One of the good days',
        src: '/assets/videos/highlight-03.mp4',
        poster: '/assets/videos/highlight-03-poster.jpg',
      },
      {
        id: 'hl-04',
        caption: 'Pure Pushkara energy',
        src: '/assets/videos/highlight-04.mp4',
        poster: '/assets/videos/highlight-04-poster.jpg',
      },
      {
        id: 'hl-05',
        caption: 'This one hits different',
        src: '/assets/videos/highlight-05.mp4',
        poster: '/assets/videos/highlight-05-poster.jpg',
      },
    ] satisfies VideoMemory[],
  },

  littleThings: {
    eyebrow: 'Chapter 04',
    title: 'Little Things About You',
    subtitle: 'Tap each one. Small truths that feel like you.',
    items: [
      {
        id: 'lt-01',
        label: 'Your boba eyes',
        detail:
          'Soft, deep, and hard to look away from. People get lost in them without meaning to.',
        accent: 'rose',
      },
      {
        id: 'lt-02',
        label: 'Your humour',
        detail:
          'You light up a room with your jokes. Suddenly everything feels easier, warmer, more alive.',
        accent: 'gold',
      },
      {
        id: 'lt-03',
        label: 'Your kindness',
        detail:
          'You are truly sweet. The kind of kindness that feels steady and real, not put on.',
        accent: 'burgundy',
      },
      {
        id: 'lt-04',
        label: 'Your talent',
        detail:
          'You are gifted in ways that keep surprising people. Art comes so naturally to you, and you have been quietly brilliant your whole life. Getting into Oaktree was never luck. It was you.',
        accent: 'midnight',
      },
      {
        id: 'lt-05',
        label: 'Your immaculate taste',
        detail:
          'In music, in fashion, in the smallest details. You always know what feels right, and somehow make it look effortless.',
        accent: 'berry',
      },
      {
        id: 'lt-06',
        label: 'Your empathy',
        detail:
          'You care about people in a way that feels rare. You notice what others need, and you meet them there.',
        accent: 'gold',
      },
      {
        id: 'lt-07',
        label: 'Your angelic presence',
        detail:
          'Beautiful and charismatic without trying. You soften a space just by being in it.',
        accent: 'rose',
      },
      {
        id: 'lt-08',
        label: 'Your sparkly smile',
        detail:
          'You have the prettiest smile. May it never fade. Keep shining, queen.',
        accent: 'burgundy',
      },
      {
        id: 'lt-09',
        label: 'Your resilience',
        detail:
          'Your tenacity when life gets heavy. You face hard things and still refuse to give up.',
        accent: 'midnight',
      },
    ] satisfies LittleThing[],
  },

  poems: {
    eyebrow: 'Chapter 05',
    title: 'The Poetry That Is Her Existence',
    subtitle: 'Lines that feel like her.',
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
    title: 'Yaadein',
    subtitle: 'A few minutes of you, kept close.',
    items: [
      {
        id: 'yaadein-01',
        title: 'Yaadein',
        caption: 'My video editing sucks, I’m sorry 😭',
        src: '/assets/videos/yaadein.mp4',
        poster: '/assets/videos/yaadein-poster.jpg',
      },
    ] satisfies VideoMemory[],
  },

  finale: {
    eyebrow: 'The Final Surprise',
    headline: 'Happy Birthday,',
    paragraphs: [
      'I cherish you fully, without holding back. You are the most incredible people I have ever known. Complete in a way that is rare. The smartest, funniest, sweetest, most gorgeous person, and somehow still becoming more.',
      'You are going to achieve more beautiful things, and I will be so proud to witness them. I already am. Everyone who knows you is. Keep going, queen. You deserve the world, and it is yours for the taking.',
      'You mean more to me than a short message can carry. It is heartening to watch you win, and you will keep winning. May this year bring you success that feels earned, and happiness that stays.',
      'My heart is grateful for you. I am so glad you are part of my life. You bring warmth, joy, and meaning into my days and into everyone else’s too. Your presence feels familiar and safe. Every smile, every small shared moment, has quietly found a place in my heart. I would give all my riches for your smiles, and all my blood for the sweetness of your laughter, princess.',
      'No matter what the future holds, I will always be thankful for you, for your presence, and for the place you hold. Love you. You are the best.',
    ],
    closingLine: 'Happy Birthday, Pushkara.',
    mediaSrc: '/assets/photos/finale.jpg',
    mediaType: 'image' as const,
    revealLabel: 'One last thing',
    secretMessage:
      'Wherever life takes you next, keep shining. The world is brighter with you in it, queen.',
  },

  audio: {
    src: '/assets/music/ambient.mp3',
    label: 'Mystery of Love',
  },

  meta: {
    pageTitle: 'Happy Birthday, Pushkara',
    description: 'A birthday experience made for Pushkara.',
  },
} as const

export type SiteContent = typeof siteContent
