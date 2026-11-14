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
 * Props passed to the group, such as `name`, `onChange` or `required`, are
 * shared with every `Radio` inside it rather than set on the `fieldset`. The
 * `aria-` props which name, describe or validate the group, such as
 * `aria-label`, `aria-labelledby` or `aria-required`, are set on the
 * `fieldset` instead, as they belong to the group as a whole. `onBlur` is
 * only called when focus leaves the group, and not when it moves between the
 * radios inside it.
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
      subtitle: 'Groups radios which share a name and event handlers',
    },
  },
  argTypes: {
    name: {
      description: 'The name shared by every radio in the group.',
      type: 'string',
    },
    onChange: {
      description: 'Called when one of the radios is selected.',
    },
    onBlur: {
      description: 'Called when focus leaves the group.',
    },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
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
