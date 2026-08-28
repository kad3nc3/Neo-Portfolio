import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.',
  cacheDir: './node_modules/.vite',
  plugins: [react()],
  server: {
    // QA patch: the temporary preview uses a proxied Manus hostname. This
    // allowlist applies only to Vite development and is not a production
    // access-control setting.
    allowedHosts: ['.us4.manus.computer', 'localhost', '127.0.0.1'],
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
