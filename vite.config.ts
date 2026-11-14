import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import type { BrowserConfigOptions } from 'vitest/node';

/** Runs a project's tests in a headless Chromium of its own. */
function chromium(): BrowserConfigOptions {
  return {
    enabled: true,
    headless: true,
    provider: playwright(),
    instances: [{ browser: 'chromium' }],
    viewport: { width: 1024, height: 768 },
  };
}

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      // type tests are checked by the compiler rather than run
      exclude: [
        'src/**/*.stories.{js,jsx,ts,tsx}',
        'src/**/*.d.ts',
        'src/**/*.test-d.ts',
      ],
    },
    projects: [
      {
        // Tests run in Node by default to keep overhead to a minimum.
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.browser.test.{ts,tsx}'],
        },
      },
      {
        // Tests that need a DOM opt in by ending in `.browser.test.ts` or
        // `.browser.test.tsx`, and run in a real Chromium.
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.browser.test.{ts,tsx}'],
          exclude: ['src/visual.browser.test.tsx'],
          browser: chromium(),
        },
      },
      {
        // The visual regression tests get a browser page of their own, as a
        // pointer which another test leaves inside a shared page changes how
        // Chromium paints native controls, such as buttons.
        extends: true,
        test: {
          name: 'visual',
          include: ['src/visual.browser.test.tsx'],
          browser: chromium(),
        },
      },
    ],
  },
});
