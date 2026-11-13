/**
 * CENTRAL CONTENT CONFIGURATION
 * Replace placeholder paths and copy with your real assets and messages.
 * See ASSET_GUIDE.md for where each file belongs.
 */

export type PhotoOrientation = 'portrait' | 'landscape' | 'square'

export interface PhotoMemory {
  id: string
  src: string
  alt: string
  caption: string
  orientation: PhotoOrientation
  year?: string
}

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
}

export interface FriendMessage {
  id: string
  name: string
  relationship?: string
  message: string
  photo?: string
  video?: string
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
    introLine: 'Pushkara, someone has a message for you…',
    /** Replace with /assets/opening/celebrity-wish.mp4 */
    videoSrc: '/assets/opening/celebrity-wish.mp4',
    /** Replace with /assets/opening/poster.jpg */
    posterSrc: '/assets/opening/poster.svg',
    durationHint: 'A short surprise awaits',
  },

  reveal: {
    headline: 'HAPPY BIRTHDAY',
    subline: 'A little sparkle, made just for you.',
    cta: "There's more to this…",
  },

  story: {
    eyebrow: 'Chapter 03',
    title: 'The Story of You',
    subtitle:
      'Snapshots, sparkles, and soft moments — swap these frames for real photos.',
    photos: [
      {
        id: 'photo-01',
        src: '/assets/photos/photo-01.svg',
        alt: 'Placeholder memory 01',
        caption: 'A morning that still glows',
        orientation: 'portrait' as const,
        year: '2019',
      },
      {
        id: 'photo-02',
        src: '/assets/photos/photo-02.svg',
        alt: 'Placeholder memory 02',
        caption: 'Laughter, mid-sentence',
        orientation: 'landscape' as const,
        year: '2020',
      },
      {
        id: 'photo-03',
        src: '/assets/photos/photo-03.svg',
        alt: 'Placeholder memory 03',
        caption: 'Soft light, quieter hour',
        orientation: 'portrait' as const,
        year: '2021',
      },
      {
        id: 'photo-04',
        src: '/assets/photos/photo-04.svg',
        alt: 'Placeholder memory 04',
        caption: 'The trip we still quote',
        orientation: 'landscape' as const,
        year: '2022',
      },
      {
        id: 'photo-05',
        src: '/assets/photos/photo-05.svg',
        alt: 'Placeholder memory 05',
        caption: 'An ordinary Tuesday, made special',
        orientation: 'square' as const,
        year: '2023',
      },
      {
        id: 'photo-06',
        src: '/assets/photos/photo-06.svg',
        alt: 'Placeholder memory 06',
        caption: 'Eyes that hold the room',
        orientation: 'portrait' as const,
        year: '2024',
      },
      {
        id: 'photo-07',
        src: '/assets/photos/photo-07.svg',
        alt: 'Placeholder memory 07',
        caption: 'Golden hour, unfinished story',
        orientation: 'landscape' as const,
        year: '2025',
      },
      {
        id: 'photo-08',
        src: '/assets/photos/photo-08.svg',
        alt: 'Placeholder memory 08',
        caption: 'Home, in a single glance',
        orientation: 'portrait' as const,
        year: 'Now',
      },
    ] satisfies PhotoMemory[],
  },

  littleThings: {
    eyebrow: 'Chapter 04',
    title: 'Little Things That Make You, You',
    subtitle: 'Tap a phrase — tiny Pushkara truths, kept playful.',
    items: [
      {
        id: 'lt-01',
        label: 'That sparkly laugh',
        detail: 'Placeholder — replace with a joke about how she lights up a room.',
        accent: 'gold',
      },
      {
        id: 'lt-02',
        label: 'Playlist energy',
        detail: 'Placeholder — her go-to songs, late-night vibes, main-character music.',
        accent: 'rose',
      },
      {
        id: 'lt-03',
        label: 'Soft-hearted softie',
        detail: 'Placeholder — the kind way she shows up for people.',
        accent: 'burgundy',
      },
      {
        id: 'lt-04',
        label: 'Signature phrase',
        detail: 'Placeholder — something Pushkara always says.',
        accent: 'midnight',
      },
      {
        id: 'lt-05',
        label: 'Main-character aura',
        detail: 'Placeholder — how she walks into a space and the mood lifts.',
        accent: 'gold',
      },
      {
        id: 'lt-06',
        label: 'Guilty pleasure',
        detail: 'Placeholder — snacks, shows, songs she pretends not to love.',
        accent: 'rose',
      },
      {
        id: 'lt-07',
        label: 'Hidden talent',
        detail: 'Placeholder — something delightful and unexpected about her.',
        accent: 'burgundy',
      },
      {
        id: 'lt-08',
        label: 'The soft spot',
        detail: 'Placeholder — animals, aesthetics, little joys she collects.',
        accent: 'midnight',
      },
    ] satisfies LittleThing[],
  },

  poems: {
    eyebrow: 'Chapter 05',
    title: 'Words That Deserve to Be Read',
    subtitle: 'A pretty page for poems and notes — replace with your own.',
    entries: [
      {
        id: 'poem-01',
        title: 'Placeholder Poem I',
        dedication: 'For Pushkara — replace with your dedication',
        lines: [
          'This line is waiting for your words.',
          'Another line rests here, patient and unfinished.',
          '',
          'Stanzas will bloom when you place the real poem here.',
          'Until then, this space holds intention.',
        ],
      },
      {
        id: 'poem-02',
        title: 'Placeholder Poem II',
        dedication: 'A second piece — replace entirely',
        lines: [
          'Paper remembers what we almost said.',
          'Ink keeps the shape of feeling.',
          '',
          'Replace every line with something only Pushkara would recognise.',
        ],
      },
      {
        id: 'poem-03',
        title: 'A Letter, Unfolding',
        dedication: 'Optional short letter form',
        lines: [
          'Dear Pushkara,',
          '',
          'This is a placeholder letter. Write freely.',
          'Say the things that do not fit in a card.',
          '',
          'With warmth,',
          '—',
        ],
      },
    ] satisfies Poem[],
  },

  friends: {
    eyebrow: 'Chapter 06',
    title: 'Words From Your People',
    subtitle: 'Messages gathered from the people who know you best.',
    messages: [
      {
        id: 'friend-01',
        name: 'Friend One',
        relationship: 'Childhood',
        message:
          'Placeholder wish — replace with a real note from a childhood friend.',
        photo: '/assets/friends/friend-01.svg',
      },
      {
        id: 'friend-02',
        name: 'Friend Two',
        relationship: 'College',
        message:
          'Placeholder wish — replace with a college memory and birthday love.',
        photo: '/assets/friends/friend-02.svg',
      },
      {
        id: 'friend-03',
        name: 'Friend Three',
        relationship: 'Work',
        message:
          'Placeholder wish — replace with something warm from a colleague.',
        photo: '/assets/friends/friend-03.svg',
        video: '/assets/friends/friend-03-video.mp4',
      },
      {
        id: 'friend-04',
        name: 'Friend Four',
        relationship: 'Family',
        message: 'Placeholder wish — replace with a family message.',
        photo: '/assets/friends/friend-04.svg',
      },
      {
        id: 'friend-05',
        name: 'Friend Five',
        relationship: 'Chosen family',
        message:
          'Placeholder wish — replace with a note from someone who feels like home.',
        photo: '/assets/friends/friend-05.svg',
      },
      {
        id: 'friend-06',
        name: 'Friend Six',
        relationship: 'Far away, always near',
        message:
          'Placeholder wish — replace with a long-distance birthday note.',
        photo: '/assets/friends/friend-06.svg',
      },
    ] satisfies FriendMessage[],
  },

  videos: {
    eyebrow: 'Chapter 07',
    title: 'Video Memories',
    subtitle: 'Clips that keep a day alive — add your MP4s when ready.',
    items: [
      {
        id: 'vid-01',
        title: 'Memory Reel 01',
        caption: 'Replace poster + MP4 in /assets/videos/',
        src: '/assets/videos/memory-01.mp4',
        poster: '/assets/videos/memory-01-poster.svg',
      },
      {
        id: 'vid-02',
        title: 'Memory Reel 02',
        caption: 'A second clip waits here',
        src: '/assets/videos/memory-02.mp4',
        poster: '/assets/videos/memory-02-poster.svg',
      },
      {
        id: 'vid-03',
        title: 'Memory Reel 03',
        caption: 'Add as many as you like in siteContent.ts',
        src: '/assets/videos/memory-03.mp4',
        poster: '/assets/videos/memory-03-poster.svg',
      },
    ] satisfies VideoMemory[],
  },

  finale: {
    eyebrow: 'The Final Surprise',
    headline: 'And still —',
    message:
      'Placeholder final message. Write the one line you want Pushkara to remember most.',
    closingLine: 'Happy birthday, Pushkara. You are so loved.',
    /** Optional final photo or video */
    mediaSrc: '/assets/photos/finale.svg',
    mediaType: 'image' as const,
    revealLabel: 'One last thing',
    secretMessage:
      'Placeholder secret — a private birthday line revealed only at the end.',
  },

  audio: {
    /** Place an MP3 at this path. Music never autoplays with sound. */
    src: '/assets/music/ambient.mp3',
    label: 'Music',
  },

  meta: {
    pageTitle: 'Happy Birthday, Pushkara',
    description: 'A sparkly birthday experience made for Pushkara.',
  },
} as const

export type SiteContent = typeof siteContent
