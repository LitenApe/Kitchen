import { Meta, StoryFn } from '@storybook/react-vite';
import { Label as Component } from '.';

/**
 * A label gives a form control its accessible name. Clicking it also focuses
 * the control, or toggles it in the case of a checkbox or radio.
 *
 * Inside a `Field`, `Label` is linked to the field's control automatically,
 * by setting its `htmlFor` to the field's `id`. An explicit `htmlFor` takes
 * precedence.
 */
export default {
  title: 'Atom/Label',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Names a form control',
    },
  },
} as Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Label = Template.bind({});
Label.args = { ...Label.args, children: "I'm a label" };
