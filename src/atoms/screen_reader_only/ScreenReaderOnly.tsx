import type { ElementType, JSX, ReactNode } from 'react';

import { joinClassNames } from '../../utils/functions/joinClassNames';
import type { PolymorphicProps } from '../../utils/types/PolymorphicProps';
import styles from './ScreenReaderOnly.module.css';

export type ScreenReaderOnlyProps<T extends ElementType> = PolymorphicProps<
  T,
  {
    /** The content which only screen readers read. */
    children?: ReactNode;
    className?: string;
  }
>;

/**
 * Hides its content from sight, while screen readers still read it, such as
 * the name of a button which only shows an icon.
 */
function ScreenReaderOnly<T extends ElementType = 'span'>({
  as,
  className,
  ...props
}: ScreenReaderOnlyProps<T>): JSX.Element {
  // a span, unlike a div, can sit anywhere text can, such as inside a button
  const Component: ElementType = as ?? 'span';

  return (
    <Component
      {...props}
      className={joinClassNames(styles.screenReaderOnly, className)}
    />
  );
}

export default ScreenReaderOnly;
