import type { ComponentPropsWithRef, JSX } from 'react';

import { useAccordion } from './AccordionContext';

function AccordionPanel({
  children,
  ...props
}: ComponentPropsWithRef<'section'>): JSX.Element {
  const { id, open } = useAccordion();

  return (
    <section
      {...props}
      id={`${id}_content`}
      aria-labelledby={`${id}_button`}
      aria-hidden={!open}
    >
      {open ? children : null}
    </section>
  );
}

export default AccordionPanel;
