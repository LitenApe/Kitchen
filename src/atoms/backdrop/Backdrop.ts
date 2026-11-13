import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
} from 'react';

type BackdropProps = {
  visible?: boolean;
} & ComponentPropsWithoutRef<'div'>;

function Backdrop(
  props: BackdropProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element | null {
  const { visible, ...args } = props;

  if (!visible) {
    return null;
  }

  return createElement('div', {
    style: {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    ...args,
    ref,
  });
}

export default forwardRef(Backdrop);
