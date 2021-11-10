import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, createElement, ForwardedRef, forwardRef } from 'react';
import { useAccordion } from './AccordionContext';

function AccordionPanel(
  props: ComponentProps<'section'>,
  ref: ForwardedRef<HTMLDivElement>
) {
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
    createElement(
      AnimatePresence,
      { initial: false },
      open
        ? createElement(
            motion.section,
            {
              key: `${id}_content`,
              initial: 'collapsed',
              animate: 'open',
              exit: 'collapsed',
              style: { overflow: 'hidden' },
              variants: {
                open: { height: 'auto' },
                collapsed: { height: 0 },
              },
              transition: { duration: 0.3, type: 'spring' },
            },
            children
          )
        : null
    )
  );
}

export default forwardRef(AccordionPanel);