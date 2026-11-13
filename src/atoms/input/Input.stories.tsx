import { Meta, StoryFn } from '@storybook/react-vite';

import { Input as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';
import { action } from 'storybook/actions';

export default {
  title: 'Atom/Input',
  component: Component,
  argTypes: {
    as: {
      options: ['input', 'textarea'],
      control: { type: 'select' },
    },
    type: {
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
      type: 'string',
    },
    postfix: {
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
