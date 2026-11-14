import { Meta, StoryFn } from '@storybook/react-vite';
import { Radio as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A radio button lets users pick exactly one option from a set. Radios form a
 * set by sharing the same `name`, so they are usually placed in a
 * `RadioGroup`, which shares the `name` and its event handlers with every
 * radio inside it.
 *
 * `Radio` is a `BaseInput` with `type="radio"`, so inside a `Field` it is
 * linked to its `Label`. A radio cannot be invalid on its own, so it takes no
 * `error`. Set `error` on its `RadioGroup` instead, which marks the group as
 * invalid.
 */
export default {
  title: 'Atom/Radio',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Lets users pick one option from a set',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => (
  <Field {...args}>
    <Component />
    <Label>Radio label</Label>
  </Field>
);

export const Radio = Template.bind({});
Radio.args = { ...Radio.args };
