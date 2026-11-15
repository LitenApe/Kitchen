import type { JSX, ReactNode } from 'react';

import { joinClassNames } from '../../../utils/functions/joinClassNames';
import styles from './Affix.module.css';
import { InputLayout } from './getInputLayout';

type AffixProps = {
  /** Lets the input refer to the affix through `aria-describedby`. */
  id: string;
  /** Whether the affix is shown before or after the input, if at all. */
  layout: InputLayout;
  /** The prefix or postfix, which a plain layout leaves out. */
  content?: ReactNode;
  /** The input. */
  children: ReactNode;
};

/**
 * Shows content, such as a currency symbol or a unit, next to an input. With a
 * plain layout, it shows no content, and the input is laid out as if it were
 * not wrapped.
 */
function Affix({ id, layout, content, children }: AffixProps): JSX.Element {
  const isPlain = layout === InputLayout.Plain;

  // a span, unlike a div, can also sit inside a paragraph or a label
  return (
    <span
      className={joinClassNames(
        isPlain ? styles.plain : styles.affix,
        layout === InputLayout.Prefixed && styles.before
      )}
    >
      {children}
      {isPlain ? null : <span id={id}>{content}</span>}
    </span>
  );
}

export default Affix;
