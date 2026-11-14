import { Meta, StoryFn } from '@storybook/react-vite';
import { Legend } from '.';

/**
 * A legend is the caption of a `fieldset`. It gives a group of related form
 * controls, such as the radios in a `RadioGroup`, their accessible name. It
 * must be the first child of the `fieldset` it describes.
 */
export default {
  title: 'Atom/Legend',
  component: Legend,
  parameters: {
    docs: {
      subtitle: 'Names a group of form controls',
    },
  },
} satisfies Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Legend {...args}>{children}</Legend>
);

export const Component = Template.bind({});
Component.args = { ...Component.args, children: "I'm a legend" };
