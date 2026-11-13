import { Meta, StoryFn } from '@storybook/react-vite';
import {
  Select as Component,
  Option as ComponentOption,
  OptionGroup as ComponentOptionGroup,
} from '.';
import { Field } from '../field';
import { Label } from '../label';

export default {
  title: 'Atom/Select',
  component: Component,
} as Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Field>
    <Label>Choose a camera manufacturer</Label>
    <Component {...args}>{children}</Component>
  </Field>
);

export const Select = Template.bind({});
Select.args = {
  ...Select.args,
  children: (
    <>
      <ComponentOptionGroup label="China">
        <ComponentOption value="dji">DJI</ComponentOption>
      </ComponentOptionGroup>
      <ComponentOptionGroup label="Denmark">
        <ComponentOption value="phase-one">Phase One</ComponentOption>
      </ComponentOptionGroup>
      <ComponentOptionGroup label="Japanese">
        <ComponentOption value="fujifilm">Fujifilm</ComponentOption>
        <ComponentOption value="canon">Canon</ComponentOption>
        <ComponentOption value="nikon">Nikon</ComponentOption>
      </ComponentOptionGroup>
      <ComponentOptionGroup label="German">
        <ComponentOption value="leica">Leica</ComponentOption>
      </ComponentOptionGroup>
    </>
  ),
};

export const Option = Template.bind({});
Option.args = {
  ...Option.args,
  children: <ComponentOption>An option</ComponentOption>,
};

export const OptionGroup = Template.bind({});
OptionGroup.storyName = 'OptionGroup';
OptionGroup.args = {
  ...OptionGroup.args,
  children: <ComponentOptionGroup label="Option Group" />,
};
