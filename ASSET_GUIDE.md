# Asset Guide

All visitor-facing copy and media paths live in **`src/content/siteContent.ts`**.  
Swap placeholders there — you usually do **not** need to edit chapter components.

## Directory map

```text
public/assets/
  opening/       Opening celebrity / surprise video
  photos/        Story photographs + finale image
  videos/        Video memory MP4s + posters
  friends/       Friend portraits + optional video notes
  poems/         Optional paper / texture backgrounds
  music/         Background music (MP3)
  backgrounds/   Optional chapter atmospheres
```

## Quick start checklist

1. Set `recipientName` in `siteContent.ts`.
2. Replace opening video: `public/assets/opening/celebrity-wish.mp4`
3. Replace opening poster: `public/assets/opening/poster.jpg` (update path in config if not `.svg`)
4. Drop photos into `public/assets/photos/` and update `story.photos` (and `finale.mediaSrc`).
5. Paste poems into `poems.entries` (each line is an array entry; `''` = stanza break).
6. Add friends in `friends.messages` (optional `photo` / `video`).
7. Add memory videos: `memory-01.mp4`, posters, then update `videos.items`.
8. Write `finale.message`, `finale.closingLine`, and `finale.secretMessage`.
9. Optional: `public/assets/music/ambient.mp3` — music never autoplays with sound.

## Opening video (Chapter 01)

| File | Purpose |
|------|---------|
| `/public/assets/opening/celebrity-wish.mp4` | Main surprise video |
| `/public/assets/opening/poster.svg` (or `.jpg`) | Poster frame before play |

If the MP4 is missing, the site shows an elegant cinematic placeholder, then continues.

## Photographs (Chapter 03)

Replace the SVG placeholders with JPG/WebP at the same names, **or** change `src` in `story.photos`.

Suggested naming:

- `photo-01.jpg` … `photo-08.jpg`
- `finale.jpg` for the closing image

Set `orientation` to `portrait` | `landscape` | `square` so layouts adapt.

## Little Things (Chapter 04)

Edit `littleThings.items` only — labels + reveal details. No image files required.

## Poems (Chapter 05)

Edit `poems.entries`. Do not put real poems in components.

Optional textures can go in `/public/assets/poems/` if you later wire backgrounds.

## Friends (Chapter 06)

Add objects to `friends.messages`:

```ts
{
  id: 'friend-07',
  name: 'Alex',
  relationship: 'School',
  message: 'Your real wish here.',
  photo: '/assets/friends/friend-07.jpg', // optional
  video: '/assets/friends/friend-07.mp4', // optional
}
```

## Video memories (Chapter 07)

| File | Purpose |
|------|---------|
| `/public/assets/videos/memory-01.mp4` | Clip |
| `/public/assets/videos/memory-01-poster.svg` | Thumbnail / poster |

Missing MP4s open a graceful “asset needed” fullscreen state instead of breaking.

## Music

Place `ambient.mp3` at `/public/assets/music/ambient.mp3`.  
Visitors must toggle music on. Volume ducks automatically during video playback.

## Deploy notes

This is a Vite app. GitHub Pages is built via `.github/workflows/deploy.yml`.

After pushing to `main`, enable **Settings → Pages → Source: GitHub Actions** if it is not already set.
