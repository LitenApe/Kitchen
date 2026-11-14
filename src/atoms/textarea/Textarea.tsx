import type { ComponentPropsWithRef, JSX } from 'react';

import { useField } from '../field';

export type TextareaProps = ComponentPropsWithRef<'textarea'>;

/**
 * A field for longer text, which takes its id and other props from a
 * surrounding `Field`.
 */
function Textarea(ownProps: TextareaProps): JSX.Element {
  const props = useField().getFieldProps(ownProps);

  return <textarea {...props} />;
}

export default Textarea;
