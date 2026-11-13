# A Birthday Story

An immersive, cinematic birthday experience built with React, TypeScript, Vite, Tailwind CSS, GSAP, and Framer Motion.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customise content

Edit **`src/content/siteContent.ts`** and drop media into **`public/assets/`**.  
Full instructions: **[ASSET_GUIDE.md](./ASSET_GUIDE.md)**.

## GitHub Pages

Site URL: `https://hemanth-yarlagadda03.github.io/`

`npm run build` publishes the production site to the **repo root** and to **`docs/`**, so either Pages setting works:

- Branch `main` → folder `/` (root), or  
- Branch `main` → folder `/docs`, or  
- **GitHub Actions** via `.github/workflows/deploy.yml`

Do **not** leave Pages serving the Vite source `index.html` (the one that loads `/src/main.tsx`) — that causes a MIME type error.

```bash
npm run build
git add -A && git commit -m "Update site"
git push origin main
```
