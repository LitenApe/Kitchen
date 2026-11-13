import {
  Children,
  cloneElement,
  createElement,
  Fragment,
  JSX,
  MouseEvent,
  ReactElement,
  useEffect,
} from 'react';
import Accordion, { AccordionProps } from '../../atoms/accordion/Accordion';
import { callAll } from '../../utils/functions/callAll';
import { isDefined } from '../../utils/functions/isDefined';
import { useNumber } from '../../utils/hooks/useNumber';

type AccordionGroupProps = {
  initial?: number;
  open?: number;
  onClick?: (event: MouseEvent, index: number, open: boolean) => void;
  children: Array<ReactElement<AccordionProps>>;
};

function AccordionGroup(props: AccordionGroupProps): JSX.Element {
  const {
    children,
    initial = -1,
    open: controlledOpen,
    onClick: controlledOnClick,
  } = props;
  const [open, setOpen] = useNumber(initial);

  function onClick(index: number) {
    return function (event: MouseEvent, request: boolean) {
      if (!isDefined(controlledOpen) && isDefined(controlledOnClick)) {
        console.warn(
          `${AccordionGroup.name}'s "open" is undefined while the component is in controlled mode. The click event recently received will be ignored. To fix the problem, either remove the "onClick" handler or add open to control which ${Accordion.name} that should stay open.`
        );
      } else if (isDefined(controlledOnClick)) {
        controlledOnClick(event, index, request);
      } else {
        setOpen(() => (request ? index : -1));
      }
    };
  }

  useEffect(() => {
    if (isDefined(controlledOpen)) {
      setOpen(() => controlledOpen);
    }
  }, [controlledOpen, setOpen]);

  return createElement(
    Fragment,
    null,
    Children.map<
      ReactElement<AccordionProps> | null,
      ReactElement<AccordionProps>
    >(children, (child, index) => {
      if (child.type !== Accordion) {
        console.warn(
          `Encountered a child of type ${child.type}! Only ${Accordion.name} is allowed as direct descendant of ${Accordion.name} The child will therefore be ignored!`
        );
        return null;
      }

      return cloneElement(child, {
        ...child.props,
        open: open === index,
        onClick: callAll(onClick(index), child.props.onClick),
      });
    })
  );
}

export default AccordionGroup;
