import { type JSX, useId } from 'react';

import { FieldContext, type FieldProps } from './bones/FieldContext';
import { mergeFieldProps } from './bones/mergeFieldProps';

/**
 * Shares an id, together with its own props, with the label and form control
 * inside it, which links the two without wiring up ids by hand.
 */
function Field({ children, ...props }: FieldProps): JSX.Element {
  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <FieldContext
      value={{
        id,
        // the id goes last, as the field's own may be passed as undefined
        getFieldProps: (own) => mergeFieldProps({ ...props, id }, own),
      }}
    >
      {children}
    </FieldContext>
  );
}

export default Field;
