import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  // generate a docs page for every component
  tags: ['autodocs'],
  parameters: {
    a11y: {
      // fails the test of a story with accessibility violations, which are
      // otherwise only reported as warnings
      test: 'error',
    },
    docs: {
      // show the source of each story in a "Code" panel
      codePanel: true,
    },
  },
};

export default preview;
