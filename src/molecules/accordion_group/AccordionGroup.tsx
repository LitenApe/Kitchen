import {
  Children,
  type JSX,
  type MouseEvent,
  type ReactNode,
  cloneElement,
} from 'react';

import { callAll } from '../../utils/functions/callAll';
import { useControllableState } from '../../utils/hooks/useControllableState';
import { isAccordion } from './bones/isAccordion';

export type AccordionGroupProps = {
  /** The index of the accordion which starts open when uncontrolled, or `-1` for none. */
  initial?: number;
  /** The index of the open accordion, or `-1` for none. Makes the group controlled together with `onClick`. */
  open?: number;
  /** Called with the index of the clicked accordion and its requested open state. */
  onClick?: (event: MouseEvent, index: number, open: boolean) => void;
  /** The accordions. Anything else is left out with a warning. */
  children?: ReactNode;
};

/** Keeps at most one of the `Accordion` components inside it open at a time. */
function AccordionGroup({
  initial = -1,
  open,
  onClick,
  children,
}: AccordionGroupProps): JSX.Element {
  const [openIndex, setOpenIndex] = useControllableState({
    name: 'AccordionGroup',
    value: open,
    defaultValue: initial,
    onChange:
      onClick &&
      ((next: number, event: MouseEvent, index: number) =>
        onClick(event, index, next === index)),
  });

  return (
    <>
      {Children.map(children, (child, index) => {
        if (!isAccordion(child)) {
          console.warn(
            'AccordionGroup only accepts Accordion elements as children, so another child was left out.'
          );
          return null;
        }

        // each accordion is controlled by the group
        return cloneElement(child, {
          open: openIndex === index,
          onClick: callAll(
            (event: MouseEvent, requestedOpen: boolean) =>
              setOpenIndex(requestedOpen ? index : -1, event, index),
            child.props.onClick
          ),
        });
      })}
    </>
  );
}

export default AccordionGroup;
