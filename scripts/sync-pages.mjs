import {
  cpSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  existsSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html missing — run vite build first')
  process.exit(1)
}

// docs/ folder (Pages: main → /docs)
rmSync(join(root, 'docs'), { recursive: true, force: true })
mkdirSync(join(root, 'docs'), { recursive: true })
cpSync(dist, join(root, 'docs'), { recursive: true })
writeFileSync(join(root, 'docs', '.nojekyll'), '')

// Repo root (Pages: main → / root) — this fixes the MIME / .tsx error
cpSync(join(dist, 'index.html'), join(root, 'index.html'))
cpSync(join(dist, 'favicon.svg'), join(root, 'favicon.svg'))
writeFileSync(join(root, '.nojekyll'), '')

const rootAssets = join(root, 'assets')
rmSync(rootAssets, { recursive: true, force: true })
cpSync(join(dist, 'assets'), rootAssets, { recursive: true })

console.log('Synced production build to docs/ and repository root for GitHub Pages')
