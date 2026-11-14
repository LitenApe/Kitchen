import type { ComponentPropsWithRef, JSX } from 'react';

import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import { useField } from '../field';

export type SelectProps = ComponentPropsWithRef<'select'> & {
  /** An error message, which marks the select as invalid. */
  error?: string;
};

function Select(ownProps: SelectProps): JSX.Element {
  const { error, ref, ...props } = useField().getFieldProps(ownProps);
  const validityRef = useCustomValidity<HTMLSelectElement>(error);
  const selectRef = useMergedRefs(validityRef, ref);

  return <select aria-invalid={Boolean(error)} {...props} ref={selectRef} />;
}

export default Select;
