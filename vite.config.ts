/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import get from 'lodash/get';

export default ({ mode }) => {
  // import.meta.env.SECRET available here with: process.env.SECRET
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const base = get(process.env, 'DEPLOYMENT_REPO');

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
    base: base ? `/${base}/` : '/',
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
  });
}
