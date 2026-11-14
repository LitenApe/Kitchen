import type { JSX, ReactNode } from 'react';

import { joinClassNames } from '../../../utils/functions/joinClassNames';
import styles from './Affix.module.css';

type AffixProps = {
  /** Lets the input refer to the affix through `aria-describedby`. */
  id: string;
  content: ReactNode;
  placement: 'before' | 'after';
  /** The input. */
  children: ReactNode;
};

/** Shows content, such as a currency symbol or a unit, next to an input. */
function Affix({ id, content, placement, children }: AffixProps): JSX.Element {
  return (
    <div
      className={joinClassNames(
        styles.affix,
        placement === 'before' && styles.before
      )}
    >
      {children}
      <span id={id}>{content}</span>
    </div>
  );
}

export default Affix;
