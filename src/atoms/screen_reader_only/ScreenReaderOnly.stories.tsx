import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScreenReaderOnly } from '.';
import { Button } from '../button';

/**
 * `ScreenReaderOnly` hides its content from sight, while screen readers still
 * read it, so that there is no need for a class such as `sr-only`. Use it for
 * what sighted users can tell from the context, such as the name of a button
 * which only shows an icon, a heading which structures the page for screen
 * readers, or a note that a link opens in a new tab.
 *
 * It renders a `span` by default, which can sit anywhere text can, such as
 * inside a button or a label. Use `as` to render another element, such as a
 * heading. Every other prop is passed on to the element, such as an `id` for
 * `aria-describedby` to point to. The content stays hidden even when the
 * element is given styles of its own.
 *
 * Don't hide anything focusable with it, such as a link or a button, as
 * keyboard users would then move focus to something they can't see.
 *
 * The example below is a button which only shows an icon, and which screen
 * readers announce as "Close".
 */
const meta = {
  title: 'Atom/ScreenReaderOnly',
  component: ScreenReaderOnly,
  parameters: {
    docs: {
      subtitle: 'Hides content from sight, but not from screen readers',
    },
  },
  argTypes: {
    children: {
      description: 'The content which only screen readers read.',
      type: 'string',
      table: { type: { summary: 'ReactNode' } },
    },
    as: {
      description: 'The element to render, such as `h2`.',
      control: false,
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: "'span'" },
      },
    },
  },
  render: (args) => (
    <Button>
      <span aria-hidden="true">✕</span>
      <ScreenReaderOnly {...args} />
    </Button>
  ),
} satisfies Meta<typeof ScreenReaderOnly<'span'>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Close',
  },
};
