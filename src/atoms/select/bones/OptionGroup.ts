import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
} from 'react';

export type OptionGroupProps = ComponentPropsWithoutRef<'optgroup'>;

function OptionGroup(
  props: OptionGroupProps,
  ref: ForwardedRef<HTMLOptGroupElement>
): JSX.Element {
  return createElement('optgroup', { ...props, ref });
}

export default forwardRef(OptionGroup);
