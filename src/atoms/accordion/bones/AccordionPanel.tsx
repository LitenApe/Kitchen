import type { ComponentPropsWithRef, JSX } from 'react';

import { joinClassNames } from '../../../utils/functions/joinClassNames';
import { useAccordion } from './AccordionContext';
import styles from './AccordionPanel.module.css';

/**
 * The `id` and `aria-labelledby` link the panel to its header, and `hidden`
 * follows the accordion, so the accordion sets them rather than taking them
 * as props.
 */
export type AccordionPanelProps = Omit<
  ComponentPropsWithRef<'section'>,
  'id' | 'aria-labelledby' | 'hidden'
>;

function AccordionPanel({
  className,
  ...props
}: AccordionPanelProps): JSX.Element {
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
