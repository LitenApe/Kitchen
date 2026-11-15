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
 * `Radio` renders an `input` of type `radio`, and passes every prop on to it.
 * Its own props take precedence over the ones its group shares. Inside a
 * `Field`, it is linked to its `Label`, and also takes the props which the
 * field shares. A radio cannot be invalid on its own, so mark its
 * `RadioGroup` as invalid instead.
 */
const meta = {
  title: 'Atom/Radio',
  component: Radio,
  parameters: {
    docs: {
      subtitle: 'Lets users pick one option from a set',
    },
  },
  argTypes: {
    name: {
      description:
        'The set which the radio belongs to, of which only one radio can be chosen. A surrounding `RadioGroup` shares its own.',
      control: false,
      table: { type: { summary: 'string' } },
    },
    value: {
      description:
        "What the form submits under the radio's `name` when the radio is chosen.",
      control: false,
      table: { type: { summary: 'string' } },
    },
    id: {
      description:
        'The id of the radio. Inside a `Field`, set it on the field instead, so that the label keeps pointing to the radio.',
      control: false,
      table: { type: { summary: 'string' } },
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
