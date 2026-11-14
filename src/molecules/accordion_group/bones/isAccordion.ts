import { type ReactElement, type ReactNode, isValidElement } from 'react';

import { Accordion, type AccordionProps } from '../../../atoms/accordion';

/** Checks whether a child is an `Accordion` element. */
export function isAccordion(
  node: ReactNode
): node is ReactElement<AccordionProps> {
  return isValidElement(node) && node.type === Accordion;
}
