import {
  type ComponentPropsWithRef,
  type JSX,
  type MouseEvent,
  useId,
} from 'react';

import { useControllableState } from '../../utils/hooks/useControllableState';
import { AccordionContext } from './bones/AccordionContext';

export type AccordionProps = {
  /** Whether the accordion starts open when it is uncontrolled. */
  initial?: boolean;
  /** Whether the accordion is open. Makes it controlled together with `onClick`. */
  open?: boolean;
  /** Called with the requested open state when the header is clicked. */
  onClick?: (event: MouseEvent, open: boolean) => void;
} & Omit<ComponentPropsWithRef<'div'>, 'onClick'>;

function Accordion({
  initial = false,
  open,
  onClick,
  ...props
}: AccordionProps): JSX.Element {
  const id = useId();
  const [isOpen, setOpen] = useControllableState({
    name: 'Accordion',
    value: open,
    defaultValue: initial,
    onChange:
      onClick && ((next: boolean, event: MouseEvent) => onClick(event, next)),
  });

  function toggle(event: MouseEvent) {
    setOpen(!isOpen, event);
  }

  return (
    <AccordionContext value={{ id, open: isOpen, onClick: toggle }}>
      <div {...props} />
    </AccordionContext>
  );
}

export default Accordion;
