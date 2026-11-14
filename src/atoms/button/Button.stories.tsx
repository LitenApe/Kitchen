import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '.';

/**
 * A button lets users trigger an action, such as submitting a form, opening
 * a dialog or cancelling an operation.
 *
 * `Button` renders a `button` by default, or an `a` through `as` when the
 * action navigates somewhere. A `button` defaults to `type="button"`, so it
 * does not submit a surrounding form by accident.
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
    },
    as: {
      description: 'The element to render. Defaults to `button`.',
      options: ['button', 'a'],
      control: { type: 'select' },
    },
    disabled: {
      description: 'Ignores clicks while keeping the button focusable.',
      type: 'boolean',
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
