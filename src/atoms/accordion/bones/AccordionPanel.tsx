import type { ComponentPropsWithRef, JSX } from 'react';

import { joinClassNames } from '../../../utils/functions/joinClassNames';
import { useAccordion } from './AccordionContext';
import styles from './AccordionPanel.module.css';

function AccordionPanel({
  className,
  ...props
}: ComponentPropsWithRef<'section'>): JSX.Element {
  const { id, open } = useAccordion();

  // the content stays rendered while the accordion is closed, so it keeps its
  // state, such as what was typed into it
  return (
    <section
      {...props}
      className={joinClassNames(styles.panel, className)}
      id={`${id}_content`}
      aria-labelledby={`${id}_button`}
      hidden={!open}
    />
  );
}

export default AccordionPanel;
