import { type JSX, useId } from 'react';

import { Alert } from '../../atoms/alert';
import { Field, type FieldProps } from '../../atoms/field';
import { getErrorProps } from './bones/getErrorProps';

export type BaseFieldProps = FieldProps & {
  /**
   * An error message to show and announce, which also marks the field's
   * control as invalid.
   */
  error?: string;
};

/**
 * A `Field` which also shows its error message in an `Alert`, and marks the
 * field's control as invalid and describes it with the message. The `Alert`
 * is rendered even while there is no error, so screen readers already know
 * about it when a message arrives.
 */
function BaseField({ children, error, ...props }: BaseFieldProps): JSX.Element {
  const errorId = useId();

  // the error props go last, as the field's own may be passed as undefined
  return (
    <Field {...props} {...getErrorProps(error, errorId, props)}>
      <div>
        {children}
        <Alert id={errorId}>{error}</Alert>
      </div>
    </Field>
  );
}

export default BaseField;
