import { action } from 'storybook/actions';
import { Meta, StoryFn } from '@storybook/react-vite';

import { BaseInput as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * `BaseInput` is the shared foundation of `Input`, `Checkbox` and `Radio`,
 * and is usually used through one of them rather than on its own. It renders
 * an `input`, or a `textarea` through `as`, and:
 *
 * - takes its `id` and any shared props from a surrounding `Field`, so the
 *   `Label` in the same field is linked to it
 * - marks itself as invalid with `aria-invalid` when `error` is set, and uses
 *   the error as the browser's native validation message. A radio only takes
 *   the validation message, as its group is the one marked as invalid.
 */
export default {
  title: 'Atom/BaseInput',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'The foundation of the input components',
    },
  },
  argTypes: {
    as: {
      description: 'The element to render. Defaults to `input`.',
      options: ['input', 'textarea'],
      control: { type: 'select' },
    },
    type: {
      description: 'The type of input to render.',
      options: [
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
      control: { type: 'select' },
    },
    error: {
      description:
        'An error message. Marks the input as invalid and becomes its native validation message.',
      type: 'string',
    },
  },
} satisfies Meta;

// `as` goes to the input itself, since the field would only pass it on as an
// HTML attribute
const Template: StoryFn = ({ as, ...args }) => (
  <Field {...args}>
    <Label>Input label</Label>
    <Component as={as} />
  </Field>
);

export const BaseInput = Template.bind({});
BaseInput.storyName = 'BaseInput';
BaseInput.args = {
  ...BaseInput.args,
  error: '',
  onChange: action('input change'),
};
