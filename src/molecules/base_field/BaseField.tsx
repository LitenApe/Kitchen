import { type JSX, useId } from 'react';

import { Alert } from '../../atoms/alert';
import { Field, type FieldProps } from '../../atoms/field';
import { joinIds } from '../../utils/functions/joinIds';

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
  const hasError = Boolean(error);

  return (
    <Field
      aria-invalid={hasError}
      {...props}
      aria-describedby={joinIds(hasError && errorId, props['aria-describedby'])}
    >
      <div>
        {children}
        <Alert id={errorId}>{error}</Alert>
      </div>
    </Field>
  );
}

export default BaseField;
