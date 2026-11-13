import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  MouseEvent,
  createElement,
  forwardRef,
} from 'react';

import { isDefined } from '../../../utils/functions/isDefined';
import { useAccordion } from './AccordionContext';

function AccordionHeader(
  props: ComponentPropsWithoutRef<'button'>,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const { disabled, ...rest } = props;
  const { id, open, onClick } = useAccordion();

  const isDisabled = disabled === true || rest['aria-disabled'] === true;

  function clickHandler(event: MouseEvent<any>) {
    if (!isDisabled && isDefined(onClick)) {
      onClick(event);
    }
  }

  return createElement('button', {
    ...rest,
    id: `${id}_button`,
    'aria-disabled': isDisabled,
    'aria-controls': `${id}_content`,
    'aria-expanded': open,
    onClick: clickHandler,
    ref,
  });
}

export default forwardRef(AccordionHeader);
