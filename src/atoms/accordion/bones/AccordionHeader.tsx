import type { ComponentPropsWithRef, JSX } from 'react';

import { callAll } from '../../../utils/functions/callAll';
import { isDisabled } from '../../../utils/functions/isDisabled';
import { useAccordion } from './AccordionContext';

function AccordionHeader({
  // keeps the header from submitting a surrounding form
  type = 'button',
  disabled,
  onClick: ownOnClick,
  ...props
}: ComponentPropsWithRef<'button'>): JSX.Element {
  const { id, open, onClick } = useAccordion();

  // disabled through aria-disabled only, so the header stays focusable
  const headerDisabled = isDisabled({
    disabled,
    'aria-disabled': props['aria-disabled'],
  });

  return (
    <button
      {...props}
      type={type}
      id={`${id}_button`}
      aria-disabled={headerDisabled}
      aria-controls={`${id}_content`}
      aria-expanded={open}
      onClick={headerDisabled ? undefined : callAll(ownOnClick, onClick)}
    />
  );
}

export default AccordionHeader;
