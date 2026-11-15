import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '.';

/**
 * A button lets users trigger an action, such as submitting a form, opening
 * a dialog or cancelling an operation.
 *
 * `Button` renders a `button` by default, or an `a` through `as` when the
 * action navigates somewhere, in which case it also needs an `href`. A
 * `button` defaults to `type="button"`, so it does not submit a surrounding
 * form by accident. Set `type="submit"` on a button which should.
 *
 * Setting `disabled` or `aria-disabled` makes the button ignore clicks. Both
 * are rendered as `aria-disabled` instead of the `disabled` attribute, which
 * keeps the button in the tab order so keyboard users can still discover it.
 * A natively disabled button is skipped when tabbing. A disabled `a` does not
 * navigate either.
 */
const meta = {
  title: 'Atom/Button',
  component: Button,
  parameters: {
    docs: {
      subtitle: 'Lets users trigger events and actions',
    },
  },
  argTypes: {
    children: {
      description:
        'The content of the button, which is also its accessible name.',
      type: 'string',
      table: { type: { summary: 'ReactNode' } },
    },
    as: {
      description:
        'The element to render. Use `a`, together with an `href`, for a button which navigates somewhere.',
      options: ['button', 'a'],
      control: { type: 'select' },
      table: {
        type: { summary: "'button' | 'a'" },
        defaultValue: { summary: "'button'" },
      },
    },
    type: {
      description:
        'What a `button` does in a form. Unlike in HTML, it only submits the form when set to `submit`.',
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: "'button'" },
      },
    },
    disabled: {
      description:
        'Ignores clicks while keeping the button focusable. Rendered as `aria-disabled`.',
      type: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'label',
  },
};
