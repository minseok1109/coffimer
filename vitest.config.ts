import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    // Disable threads for better compatibility with Bun
    pool: 'forks',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});