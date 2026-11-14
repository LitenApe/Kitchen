import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A radio button lets users pick exactly one option from a set. Radios form a
 * set by sharing the same `name`, so they are usually placed in a
 * `RadioGroup`, which shares the `name` and its event handlers with every
 * radio inside it.
 *
 * Inside a `Field`, `Radio` is linked to its `Label`. A radio cannot be
 * invalid on its own, so mark its `RadioGroup` as invalid instead.
 */
const meta = {
  title: 'Atom/Radio',
  component: Radio,
  parameters: {
    docs: {
      subtitle: 'Lets users pick one option from a set',
    },
  },
  render: (args) => (
    <Field>
      <Radio {...args} />
      <Label>Radio label</Label>
    </Field>
  ),
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
