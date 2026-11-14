import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/react-vite',
  core: {
    // stops Storybook from sending anonymous usage data, such as test runs
    disableTelemetry: true,
  },
  typescript: {
    // documents the props a component declares itself, unlike
    // `react-docgen-typescript`, which also lists every HTML attribute it
    // inherits from React's types
    reactDocgen: 'react-docgen',
  },
  // The code shown for a story names each element after its component's
  // function, so the build keeps function names while minifying the rest.
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      build: { rolldownOptions: { output: { keepNames: true } } },
    }),
};

export default config;
