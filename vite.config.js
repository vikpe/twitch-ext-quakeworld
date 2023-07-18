import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        videoOverlay: 'video_overlay.html',
        config: 'config.html',
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src'
    },
  }
})

