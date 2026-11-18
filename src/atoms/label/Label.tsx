import type { ComponentPropsWithRef, JSX } from 'react';

import { useField } from '../field';

export type LabelProps = ComponentPropsWithRef<'label'>;

/** Points to the control of the surrounding `Field`, unless given `htmlFor`. */
function Label(props: LabelProps): JSX.Element {
  const { id } = useField();
  const { htmlFor = id, ...labelProps } = props;

  return <label {...labelProps} htmlFor={htmlFor} />;
}

export default Label;
