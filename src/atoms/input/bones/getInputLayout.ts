import { isDefined } from '../../../utils/functions/isDefined';
import type { AffixProps } from '../types';

/** The ways an input can be laid out. */
export enum InputLayout {
  /** The input on its own. */
  Plain = 'plain',
  /** An affix in front of the input. */
  Prefixed = 'prefixed',
  /** An affix behind the input. */
  Postfixed = 'postfixed',
}

/**
 * Determines how an input is laid out from its affixes, of which it has at
 * most one.
 *
 * @param affixes the input's `prefix` or `postfix`
 * @returns the layout of the input
 */
export function getInputLayout({ prefix, postfix }: AffixProps): InputLayout {
  if (isDefined(prefix)) {
    return InputLayout.Prefixed;
  }

  if (isDefined(postfix)) {
    return InputLayout.Postfixed;
  }

  return InputLayout.Plain;
}
