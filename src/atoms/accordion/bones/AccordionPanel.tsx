import type { ComponentPropsWithRef, JSX } from 'react';

import { joinClassNames } from '../../../utils/functions/joinClassNames';
import { useAccordion } from './AccordionContext';
import styles from './AccordionPanel.module.css';

function AccordionPanel({
  className,
  ...props
}: ComponentPropsWithRef<'section'>): JSX.Element {
  const { headerId, panelId, open } = useAccordion();

  // the content stays rendered while the accordion is closed, so it keeps its
  // state, such as what was typed into it
  return (
    <section
      {...props}
      className={joinClassNames(styles.panel, className)}
      id={panelId}
      aria-labelledby={headerId}
      hidden={!open}
    />
  );
}

export default AccordionPanel;
