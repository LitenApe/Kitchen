import type { ComponentPropsWithRef, JSX } from 'react';

import { callAll } from '../../../utils/functions/callAll';
import { isDisabled } from '../../../utils/functions/isDisabled';
import { useAccordion } from './AccordionContext';

/**
 * The `id`, `aria-controls` and `aria-expanded` link the header to its panel,
 * so the accordion sets them rather than taking them as props.
 */
export type AccordionHeaderProps = Omit<
  ComponentPropsWithRef<'button'>,
  'id' | 'aria-controls' | 'aria-expanded'
>;

function AccordionHeader({
  // keeps the header from submitting a surrounding form
  type = 'button',
  disabled,
  onClick: ownOnClick,
  ...props
}: AccordionHeaderProps): JSX.Element {
  const { headerId, panelId, open, onClick } = useAccordion();

  // disabled through aria-disabled only, so the header stays focusable
  const headerDisabled = isDisabled({
    disabled,
    'aria-disabled': props['aria-disabled'],
  });

  return (
    <button
      {...props}
      type={type}
      id={headerId}
      aria-disabled={headerDisabled}
      aria-controls={panelId}
      aria-expanded={open}
      onClick={headerDisabled ? undefined : callAll(ownOnClick, onClick)}
    />
  );
}

export default AccordionHeader;
