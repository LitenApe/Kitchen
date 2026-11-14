import type { ReactElement } from 'react';

type Affix = string | ReactElement;

type WithPrefix = {
  /** Shown before the input, such as a currency symbol. */
  prefix?: Affix;
  postfix?: never;
};

type WithPostfix = {
  /** Shown after the input, such as a unit. */
  postfix?: Affix;
  prefix?: never;
};

/** An input can have either a prefix or a postfix, but not both. */
export type AffixProps = WithPrefix | WithPostfix;
