import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { BaseInput as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

export default {
  title: 'Atom/BaseInput',
  component: Component,
  argTypes: {
    as: {
      options: ['input', 'textarea'],
      control: { type: 'select' },
    },
    type: {
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
  },
} as Meta;

const Template: Story = (args) => (
  <Field {...args}>
    <Label>Input label</Label>
    <Component />
  </Field>
);

export const BaseInput = Template.bind({});
BaseInput.storyName = 'BaseInput';
BaseInput.args = {
  ...BaseInput.args,
  error: '',
  onChange: action('input change'),
};
