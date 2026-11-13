import type { JSX } from 'react';
export type PermittedTags = 'input' | 'textarea';

export interface WithPostfix {
  postfix?: string | JSX.Element;
  prefix?: never;
}

export interface WithPrefix {
  prefix?: string | JSX.Element;
  postfix?: never;
}
