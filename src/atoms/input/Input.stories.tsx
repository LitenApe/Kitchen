import { Meta, StoryFn } from '@storybook/react-vite';

import { Input as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';
import { action } from 'storybook/actions';

/**
 * `Input` lets users enter text. It renders an `input` with `type="text"` by
 * default, or a `textarea` for longer text through `as`. It is built on
 * `BaseInput`, so inside a `Field` it is linked to its `Label`, and it
 * supports `error` in the same way.
 *
 * A `prefix` or `postfix`, such as a currency symbol or a unit, can be shown
 * before or after the input. It is linked to the input through
 * `aria-describedby`, so screen readers read it together with the input. Only
 * one of the two can be used at a time.
 */
export default {
  title: 'Atom/Input',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Lets users enter text',
    },
  },
  argTypes: {
    as: {
      description: 'The element to render. Defaults to `input`.',
      options: ['input', 'textarea'],
      control: { type: 'select' },
    },
    type: {
      description: 'The type of input to render. Defaults to `text`.',
      options: [
        'date',
        'datetime-local',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
      control: { type: 'select' },
    },
    prefix: {
      description: 'Text or an element shown before the input.',
      type: 'string',
    },
    postfix: {
      description: 'Text or an element shown after the input.',
      type: 'string',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Field>
    <Label>Input label</Label>
    <Component {...args} />
  </Field>
);

export const Input = Template.bind({});
Input.args = {
  ...Input.args,
  as: 'input',
  type: 'text',
  onChange: action('input change'),
};
