import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '.';

/**
 * A button lets users trigger an action, such as submitting a form, opening
 * a dialog or cancelling an operation.
 *
 * `Button` renders a `button` and passes every prop on to it. Unlike a plain
 * `button`, it defaults to `type="button"`, so it does not submit a
 * surrounding form by accident, even when `type` is passed as `undefined`.
 * Set `type="submit"` on a button which should.
 *
 * `disabled` and `aria-disabled` are passed on unchanged. A `disabled` button
 * cannot be focused or clicked, and does not submit its form. A button which
 * should stay focusable while it is unavailable can use `aria-disabled`
 * instead, but then has to ignore clicks itself, as `aria-disabled` stops
 * neither clicks nor form submissions.
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
    type: {
      description:
        'What the button does in a form. Unlike in HTML, it only submits the form when set to `submit`.',
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: "'button'" },
      },
    },
    disabled: {
      description:
        'Disables the button, so that it cannot be focused or clicked, and does not submit its form.',
      type: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    'aria-disabled': {
      description:
        'Marks the button as unavailable while keeping it focusable. Clicks still reach `onClick`, so ignore them yourself.',
      type: 'boolean',
      table: { type: { summary: "boolean | 'true' | 'false'" } },
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
