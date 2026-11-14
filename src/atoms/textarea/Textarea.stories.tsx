import { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Textarea } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * `Textarea` lets users enter longer text, which may span several lines. Use
 * `Input` for a single line of text instead.
 *
 * Inside a `Field`, it is linked to its `Label`. Setting `error` marks it as
 * invalid with `aria-invalid`, and uses the error as the browser's native
 * validation message.
 */
export default {
  title: 'Atom/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      subtitle: 'Lets users enter longer text',
    },
  },
  argTypes: {
    rows: {
      description: 'The number of lines of text which are visible at once.',
      type: 'number',
    },
    error: {
      description:
        'An error message. Marks the textarea as invalid and becomes its native validation message.',
      type: 'string',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => (
  <Field>
    <Label>Textarea label</Label>
    <Textarea {...args} />
  </Field>
);

export const Component = Template.bind({});
Component.args = {
  ...Component.args,
  onChange: action('textarea change'),
};
