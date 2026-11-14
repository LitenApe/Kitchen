import type { ComponentPropsWithRef, JSX } from 'react';

import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import { useField } from '../field';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  /**
   * An error message, which marks the checkbox as invalid and becomes its
   * native validation message.
   */
  error?: string;
};

/** A checkbox, which takes its id and other props from a surrounding `Field`. */
function Checkbox(ownProps: CheckboxProps): JSX.Element {
  const { error, ref, ...props } = useField().getFieldProps(ownProps);
  const validityRef = useCustomValidity<HTMLInputElement>(error);
  const checkboxRef = useMergedRefs(validityRef, ref);

  return (
    <input
      aria-invalid={Boolean(error)}
      {...props}
      type="checkbox"
      ref={checkboxRef}
    />
  );
}

export default Checkbox;
