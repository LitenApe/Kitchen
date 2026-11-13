import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  createElement,
  forwardRef,
} from 'react';

import { useAccordion } from './AccordionContext';

function AccordionPanel(
  props: ComponentPropsWithoutRef<'section'>,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { children, ...rest } = props;
  const { id, open } = useAccordion();
  return createElement(
    'section',
    {
      ...rest,
      id: `${id}_content`,
      'aria-labelledby': `${id}_button`,
      'aria-hidden': !open,
      ref,
    },
    open ? children : null
  );
}

export default forwardRef(AccordionPanel);
