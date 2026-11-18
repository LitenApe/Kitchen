import {
  type ComponentPropsWithRef,
  type JSX,
  type MouseEvent,
  useId,
} from 'react';

import { AccordionContext } from './bones/AccordionContext';
import { getAccordionIds } from './bones/getAccordionIds';

export type AccordionProps = {
  /** Whether the accordion is open. */
  open: boolean;
  /**
   * Called with the requested open state, and the click event, when the
   * header is clicked. The accordion only opens or closes once `open` changes.
   */
  onOpenChange: (open: boolean, event: MouseEvent<HTMLButtonElement>) => void;
} & ComponentPropsWithRef<'div'>;

/**
 * Shows or hides its panel as `open` says. A click on its header only asks
 * for the opposite through `onOpenChange`, so what a click does is up to the
 * accordion's user.
 */
function Accordion({
  open,
  onOpenChange,
  ...props
}: AccordionProps): JSX.Element {
  const { headerId, panelId } = getAccordionIds(useId());

  return (
    <AccordionContext
      value={{
        headerId,
        panelId,
        open,
        onClick: (event) => onOpenChange(!open, event),
      }}
    >
      <div {...props} />
    </AccordionContext>
  );
}

export default Accordion;
