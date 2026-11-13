import type { Preview } from '@storybook/react-vite';
import type { IndexEntry } from 'storybook/internal/types';

type StorySort = (a: IndexEntry, b: IndexEntry) => number;

const preview: Preview = {
  // generate a docs page for every component
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      // show the source of each story in a "Code" panel
      codePanel: true,
    },
    options: {
      // Storybook evaluates this function as plain JavaScript, so it must be
      // self-contained and free of type annotations. It is typed through the
      // `satisfies` below instead.
      storySort: (a, b) =>
        a.title === b.title
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  } satisfies { options: { storySort: StorySort }; [name: string]: unknown },
};

export default preview;
