import { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { RadioGroup as Component } from '.';
import { Radio } from '../radio';
import { Label } from '../label';
import { Legend } from '../legend';
import { Field } from '../field';

export default {
  title: 'Atom/RadioGroup',
  component: Component,
} as Meta;

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
