import { Meta, StoryFn } from '@storybook/react-vite';
import { RadioField as Component } from '.';

/**
 * `RadioField` is a ready-made group of radios with a legend and an error
 * message, built from `BaseField`, `RadioGroup`, `Legend`, `Radio` and
 * `Label`.
 *
 * `label` becomes the legend of the group, and `options` lists the choices
 * as `{ label, value }` objects, which may also include other props for their
 * radio. Every radio shares the same `name`, and `required` makes choosing
 * one of them mandatory. When `error` is set, the message is shown after the
 * group.
 */
export default {
  title: 'Molecule/RadioField',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'A group of radios with a legend and an error message',
    },
  },
  argTypes: {
    label: {
      description: 'The legend of the group.',
      type: 'string',
    },
    name: {
      description: 'The name shared by every radio in the group.',
      type: 'string',
    },
    options: {
      description:
        'The choices, as `{ label, value }` objects which may include other radio props.',
    },
    required: {
      description: 'Whether one of the options has to be chosen.',
      type: 'boolean',
    },
    error: {
      description: 'An error message to show after the group.',
      type: 'string',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Component label="field label" options={[]} name="os" {...args} />
);

export const RadioField = Template.bind({});
RadioField.storyName = 'RadioField';
RadioField.args = {
  ...RadioField.args,
  error: '',
  label: 'Preferred Operating System',
  options: [
    {
      label: 'Linux',
      value: 'linux',
    },
    {
      label: 'Windows',
      value: 'windows',
    },
    {
      label: 'MacOS',
      value: 'macos',
    },
  ],
};
