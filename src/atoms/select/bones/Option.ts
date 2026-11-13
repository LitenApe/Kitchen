import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
} from 'react';

export type OptionProps = ComponentPropsWithoutRef<'option'>;

function Option(
  props: OptionProps,
  ref: ForwardedRef<HTMLOptionElement>
): JSX.Element {
  return createElement('option', { ...props, ref });
}

export default forwardRef(Option);
