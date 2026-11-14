import type { ComponentPropsWithRef, JSX } from 'react';

import { joinClassNames } from '../../utils/functions/joinClassNames';
import styles from './Backdrop.module.css';

export type BackdropProps = {
  /** Whether the backdrop is shown. */
  visible?: boolean;
} & ComponentPropsWithRef<'div'>;

function Backdrop({
  visible = false,
  className,
  ...props
}: BackdropProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <div {...props} className={joinClassNames(styles.backdrop, className)} />
  );
}

export default Backdrop;
