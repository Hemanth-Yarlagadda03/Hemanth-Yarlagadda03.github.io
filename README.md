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

**Option A — recommended (GitHub Actions)**  
1. Push `main`  
2. Repo **Settings → Pages → Source: GitHub Actions**  
3. The workflow in `.github/workflows/deploy.yml` builds and deploys `dist/`

**Option B — quick fallback (`/docs` folder)**  
A production build is committed under `docs/`.  
Set **Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/docs`**.

```bash
git push origin main
```
