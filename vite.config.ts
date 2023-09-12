/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setupTests.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
      ],
    },
  },
})
