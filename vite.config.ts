import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// username.github.io → base must be '/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    assetsInlineLimit: 0,
  },
})
