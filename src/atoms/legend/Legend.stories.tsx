import { Meta, StoryFn } from '@storybook/react-vite';
import { Legend as Component } from '.';

/**
 * A legend is the caption of a `fieldset`. It gives a group of related form
 * controls, such as the radios in a `RadioGroup`, their accessible name. It
 * must be the first child of the `fieldset` it describes.
 */
export default {
  title: 'Atom/Legend',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Names a group of form controls',
    },
  },
} satisfies Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Legend = Template.bind({});
Legend.args = { ...Legend.args, children: "I'm a legend" };
