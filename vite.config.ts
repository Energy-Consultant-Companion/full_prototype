import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // relative Pfade, damit das Bundle unter jedem Unterpfad läuft (GitHub Pages)
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // ein Prototyp mit 40 Bildschirmen — ein Bundle ist hier das Einfachste
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: { motion: ['motion'] },
      },
    },
  },
})
