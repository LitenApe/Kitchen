import { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { RadioGroup as Component } from '.';
import { Radio } from '../radio';
import { Label } from '../label';
import { Legend } from '../legend';
import { Field } from '../field';

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
 * Errors belong to the group as a whole. `error` marks the `fieldset` as
 * invalid with `aria-invalid`, and becomes the native validation message of
 * every radio, which keeps the form from being submitted. Show the message
 * yourself and point to it with `aria-describedby`, which describes the
 * `fieldset` rather than its radios. Inside a field, such as the one
 * `RadioField` renders, the group takes the field's error and descriptions.
 *
 * Select a radio and then move focus out of the group to see `onChange` and
 * `onBlur` in the **Actions** panel.
 */
export default {
  title: 'Atom/RadioGroup',
  component: Component,
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
    error: {
      description:
        'An error message, which marks the group as invalid and keeps the form from being submitted.',
      type: 'string',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => (
  <Component {...args}>
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
  </Component>
);

export const RadioGroup = Template.bind({});
RadioGroup.storyName = 'RadioGroup';
RadioGroup.args = {
  ...RadioGroup.args,
  name: 'bike-manufacturer',
  onChange: action('value changed'),
  onBlur: action('blur event triggered'),
};
