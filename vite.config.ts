import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/*.stories.{js,jsx,ts,tsx}', 'src/**/*.d.ts'],
    },
    projects: [
      {
        // Tests run in Node by default to keep overhead to a minimum.
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
        },
      },
      {
        // Tests that need a DOM opt in with a `.browser.test.tsx` or
        // `.browser.spec.ts` suffix and run in a real Chromium.
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
            viewport: { width: 1024, height: 768 },
          },
        },
      },
    ],
  },
});
