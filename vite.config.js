import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST;
  
  return {
    plugins: [
      react(),
      !isTest && tailwindcss(),
      !isTest && VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/pyodide\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'pyodide-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            }
          ]
        },
        manifest: {
          name: 'PyLearn - Learn Python',
          short_name: 'PyLearn',
          description: 'Interactive Python Learning Platform',
          theme_color: '#0d1117',
          background_color: '#0d1117',
          display: 'standalone',
          icons: [
            { src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' },
            { src: '/vite.svg', sizes: '512x512', type: 'image/svg+xml' }
          ]
        }
      })
    ],

  // ─── Build: target modern browsers for smaller output ───────────────────────
  build: {
    target: 'esnext',
  },

  // ─── Vitest test configuration ───────────────────────────────────────────────
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
  },
  };
});
