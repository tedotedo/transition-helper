import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['.netlify.app'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
      workbox: {
        // Don't precache the intro video — it's 3.7MB and most users watch it once.
        // Fetches on demand instead, keeping the PWA install lightweight.
        globIgnores: ['**/intro.mp4'],
      },
      manifest: {
        name: 'Transition Ready',
        short_name: 'Transition',
        description:
          'Helping young people prepare for the move from children\'s to adult healthcare services.',
        theme_color: '#f97316',
        background_color: '#fffbf5',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
