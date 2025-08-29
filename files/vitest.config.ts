import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      '__unit-tests__/**/*.test.ts',
      '__integration-tests__/**/*.test.ts',
    ],
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'html'],
    },
  },
  plugins: [swc.vite()],
});
