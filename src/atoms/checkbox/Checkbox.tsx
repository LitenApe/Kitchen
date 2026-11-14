import type { ComponentPropsWithRef, JSX } from 'react';

import { useField } from '../field';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

/** A checkbox, which takes its id and other props from a surrounding `Field`. */
function Checkbox(ownProps: CheckboxProps): JSX.Element {
  const props = useField().getFieldProps(ownProps);

  return <input {...props} type="checkbox" />;
}

export default Checkbox;
