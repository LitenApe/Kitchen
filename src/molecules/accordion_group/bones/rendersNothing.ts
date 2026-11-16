import type { ReactNode } from 'react';

import { isDefined } from '../../../utils/functions/isDefined';

/**
 * Checks whether a child renders nothing, as `null`, `undefined` and booleans
 * do, such as the `false` from `{condition && <Accordion />}`.
 */
export function rendersNothing(child: ReactNode): boolean {
  return !isDefined(child) || typeof child === 'boolean';
}
