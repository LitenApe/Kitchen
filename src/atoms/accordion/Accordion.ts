import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  JSX,
  MouseEvent,
  createElement,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';

import { AccordionContext } from './bones/AccordionContext';
import { isDefined } from '../../utils/functions/isDefined';
import { isUndefined } from '../../utils/functions/isUndefined';
import { useBoolean } from '../../utils/hooks/useBoolean';
import { useId } from '../../utils/hooks/useId';

export type AccordionProps = {
  initial?: boolean;
  open?: boolean;
  onClick?: (event: MouseEvent, open: boolean) => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

function Accordion(
  props: AccordionProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const {
    initial = false,
    open: controlledOpen,
    onClick: controlledOnClick,
    ...rest
  } = props;
  const id = useId('accordion');
  const [open, setOpen] = useBoolean(initial);

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (isUndefined(controlledOpen) && isDefined(controlledOnClick)) {
        console.warn(
          `${Accordion.name}'s "open" is undefined while the component is in controlled mode. The click event recently received will be ignored. To fix the problem, either remove the "onClick" handler or add "open" to control whether the ${Accordion.name} should be open or not.'`
        );
      } else if (isDefined(controlledOnClick)) {
        controlledOnClick(event, !controlledOpen);
      } else {
        setOpen((prev) => !prev);
      }
    },
    [setOpen, controlledOnClick, controlledOpen]
  );

  useEffect(() => {
    if (isDefined(controlledOpen)) {
      setOpen(() => controlledOpen);
    }
  }, [setOpen, controlledOpen]);

  return createElement(
    AccordionContext.Provider,
    {
      value: {
        id,
        onClick,
        open,
      },
    },
    createElement('div', { ...rest, ref })
  );
}

export default forwardRef(Accordion);
