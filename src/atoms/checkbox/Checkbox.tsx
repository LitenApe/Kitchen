import type { ComponentPropsWithRef, JSX } from 'react';

import { BaseInput } from '../base_input';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  /** An error message, which marks the checkbox as invalid. */
  error?: string;
};

function Checkbox(props: CheckboxProps): JSX.Element {
  return <BaseInput {...props} type="checkbox" />;
}

export default Checkbox;
