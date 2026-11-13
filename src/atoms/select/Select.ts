import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
  useEffect,
  useRef,
} from 'react';

import { mergeRefs } from '../../utils/functions/mergeRefs';
import { useField } from '../field';

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  error?: string;
}

function Select(
  props: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
): JSX.Element {
  const internalRef = useRef<HTMLSelectElement>(null);
  const { getFieldProps } = useField();
  const { error, ...args } = getFieldProps(props);

  useEffect(() => {
    internalRef.current?.setCustomValidity(error ?? '');
  }, [error, internalRef]);

  return createElement('select', {
    'aria-invalid': !!error,
    ...args,
    ref: mergeRefs(internalRef, ref),
  });
}

export default forwardRef(Select);
