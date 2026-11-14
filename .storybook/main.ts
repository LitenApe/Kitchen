import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: false,
  },
  // The code shown for a story names each element after its component's
  // function, so the build keeps function names while minifying the rest.
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      build: { rolldownOptions: { output: { keepNames: true } } },
    }),
};

export default config;
