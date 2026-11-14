import { Meta, StoryFn } from '@storybook/react-vite';
import { Input } from '../input';
import { Label } from '../label';
import { Field as Component } from '.';

/**
 * `Field` groups a form control with its label. It generates an `id` and
 * shares it, together with any props passed to the field, with the components
 * inside it:
 *
 * - `Label` uses the `id` for its `htmlFor`
 * - `Input`, `Checkbox`, `Radio` and `Select` use it as their `id`
 *
 * This links a label to its control without wiring up ids by hand. Props set
 * directly on a component take precedence over the ones shared by the field,
 * so a field-wide prop such as `error` or `onChange` can still be overridden
 * for a single control. `aria-describedby` is the exception: the field's and
 * the control's are combined, so that a description shared by the field, such
 * as an error message, is never lost.
 *
 * `Field` does not render an element of its own. Use `BaseField` when you also
 * want an error message to be shown.
 */
export default {
  title: 'Atom/Field',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Links a label to its form control',
    },
  },
} satisfies Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Field = Template.bind({});
Field.args = {
  children: [
    <Label key="field-label">label</Label>,
    <Input key="field-input" />,
  ],
};
