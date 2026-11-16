import {
  Children,
  type JSX,
  type MouseEvent,
  type ReactNode,
  cloneElement,
} from 'react';

import { callAll } from '../../utils/functions/callAll';
import { useControllableState } from '../../utils/hooks/useControllableState';
import { getOpenIndex } from './bones/getOpenIndex';
import { isAccordion } from './bones/isAccordion';
import { rendersNothing } from './bones/rendersNothing';

export type AccordionGroupProps = {
  /** The index of the accordion which starts open when uncontrolled, or `-1` for none. */
  initial?: number;
  /** The index of the open accordion, or `-1` for none. Makes the group controlled together with `onClick`. */
  open?: number;
  /** Called with the click event, the index of the clicked accordion and its requested open state. */
  onClick?: (event: MouseEvent, index: number, open: boolean) => void;
  /**
   * The `Accordion` elements. Children which render nothing, such as `null`
   * or `false`, are skipped, so accordions can be rendered conditionally.
   * Anything else is left out with a warning.
   */
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
        // children which render nothing, such as the `false` from
        // `{condition && <Accordion />}`, are skipped without a warning, but
        // still count, so the accordions after them keep their index
        if (rendersNothing(child)) {
          return null;
        }

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
              setOpenIndex(getOpenIndex(index, requestedOpen), event, index),
            child.props.onClick
          ),
        });
      })}
    </>
  );
}

export default AccordionGroup;
