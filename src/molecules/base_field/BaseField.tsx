import { type JSX, useId } from 'react';

import { Alert } from '../../atoms/alert';
import { Field, type FieldProps } from '../../atoms/field';
import { joinIds } from '../../utils/functions/joinIds';

export type BaseFieldProps = FieldProps;

/**
 * A `Field` which also shows its error message in an `Alert`, and describes
 * the field's control with it. The `Alert` is rendered even while there is no
 * error, so screen readers already know about it when a message arrives.
 */
function BaseField({ children, ...props }: BaseFieldProps): JSX.Element {
  const errorId = useId();
  const hasError = Boolean(props.error);

  return (
    <Field
      {...props}
      aria-describedby={joinIds(hasError && errorId, props['aria-describedby'])}
    >
      <div>
        {children}
        <Alert id={errorId}>{props.error}</Alert>
      </div>
    </Field>
  );
}

export default BaseField;
