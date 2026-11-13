import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
} from 'react';

function Legend(
  props: ComponentPropsWithoutRef<'legend'>,
  ref: ForwardedRef<HTMLLegendElement>
): JSX.Element {
  return createElement('legend', { ...props, ref });
}

export default forwardRef(Legend);
