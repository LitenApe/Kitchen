import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { RadioGroup } from '.';
import { Field } from '../field';
import { Label } from '../label';
import { Legend } from '../legend';
import { Radio } from '../radio';

/**
 * `RadioGroup` groups related radios in a `fieldset` with the `radiogroup`
 * role. Start it with a `Legend` to name the group, and give each radio its
 * own `Field` and `Label`.
 *
 * `name`, `onChange`, `required`, `disabled` and `form` are shared with every
 * `Radio` inside it, and a radio's own props take precedence over them unless
 * they are `undefined`. `name` is required, as radios only behave as one
 * group, where choosing one clears the others, when they share a name. Every
 * other prop, such as `id`, `className`, `style` or the `aria-` props which
 * name, describe or validate the group, is set on the `fieldset`. That
 * includes event handlers such as `onClick` and `onBlur`, which also receive
 * the events of the radios and any other control inside the group, as these
 * bubble up to the `fieldset`. `onBlur` is only called when focus leaves the
 * group, though, and not when it moves between the controls inside it, such
 * as from a radio to a text input. Its `target` is the control which lost
 * focus.
 *
 * `RadioGroup` does not show error messages. To show one, mark the group as
 * invalid with `aria-invalid`, and point it to the message with
 * `aria-describedby`. Both are set on the `fieldset`, as errors belong to the
 * group as a whole rather than to its radios. Inside a field, such as the one
 * `RadioField` renders, the group also takes the field's `aria-invalid` and
 * descriptions. `RadioField` does all of this for you, and also announces the
 * message.
 *
 * Select a radio and then move focus out of the group to see `onChange` and
 * `onBlur` in the **Actions** panel.
 */
const meta = {
  title: 'Atom/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      subtitle: 'Groups radios which share a name',
    },
  },
  // the categories show which props the group keeps and which it shares
  argTypes: {
    children: { control: false, table: { category: 'Group' } },
    name: {
      type: { name: 'string', required: true },
      table: {
        category: 'Shared with every radio',
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Called when one of the radios is chosen.',
      table: {
        category: 'Shared with every radio',
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    required: {
      description: 'Makes choosing one of the radios mandatory.',
      type: 'boolean',
      table: {
        category: 'Shared with every radio',
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Disables every radio in the group.',
      type: 'boolean',
      table: {
        category: 'Shared with every radio',
        type: { summary: 'boolean' },
      },
    },
    form: {
      description:
        'The id of the form which the radios belong to, for a group placed outside it.',
      control: false,
      table: {
        category: 'Shared with every radio',
        type: { summary: 'string' },
      },
    },
    onBlur: {
      table: {
        category: 'Group',
        type: { summary: '(event: FocusEvent<HTMLFieldSetElement>) => void' },
      },
    },
    id: {
      description: 'The id of the `fieldset`.',
      control: false,
      table: { category: 'Group', type: { summary: 'string' } },
    },
    className: {
      description: 'Class names for the `fieldset`.',
      control: false,
      table: { category: 'Group', type: { summary: 'string' } },
    },
    style: {
      description: 'Inline styles for the `fieldset`.',
      control: false,
      table: { category: 'Group', type: { summary: 'CSSProperties' } },
    },
    'aria-invalid': {
      description:
        'Marks the group as invalid, as a radio cannot be invalid on its own.',
      type: 'boolean',
      table: { category: 'Group', type: { summary: 'boolean' } },
    },
    'aria-describedby': {
      description:
        'The ids of the elements which describe the group, such as its error message. Combined with the ids which a surrounding field shares.',
      control: false,
      table: { category: 'Group', type: { summary: 'string' } },
    },
    ref: {
      control: false,
      table: {
        category: 'Group',
        type: { summary: 'Ref<HTMLFieldSetElement>' },
      },
    },
  },
  args: {
    onBlur: fn(),
    onChange: fn(),
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Legend>Bicycle brand</Legend>
      <Field>
        <Radio value="trek" />
        <Label>Trek</Label>
      </Field>
      <Field>
        <Radio value="specialized" />
        <Label>Specialized</Label>
      </Field>
      <Field>
        <Radio value="cannondale" />
        <Label>Cannondale</Label>
      </Field>
      <Field>
        <Radio value="canyon" />
        <Label>Canyon</Label>
      </Field>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'bike-manufacturer',
  },
};
