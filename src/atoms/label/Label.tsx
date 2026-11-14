import type { ComponentPropsWithRef, JSX } from 'react';

import { useField } from '../field';

/** Points to the control of the surrounding `Field`, unless given `htmlFor`. */
function Label(props: ComponentPropsWithRef<'label'>): JSX.Element {
  const { id } = useField();
  return <label htmlFor={id} tabIndex={-1} {...props} />;
}

export default Label;
