import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
} from 'react';

import { useField } from '../field';

function Label(
  props: ComponentPropsWithoutRef<'label'>,
  ref: ForwardedRef<HTMLLabelElement>
): JSX.Element {
  const { getFieldProps } = useField();
  const { id } = getFieldProps(props);
  return createElement('label', { htmlFor: id, tabIndex: -1, ...props, ref });
}

export default forwardRef(Label);
