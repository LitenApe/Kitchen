import {
  ElementType,
  ForwardedRef,
  JSX,
  ReactNode,
  createElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { DynamicProps } from '../../utils/types/DynamicProps';

function Alert<T extends ElementType = 'div'>(
  props: DynamicProps<T>,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { as = 'div', children, ...rest } = props;
  const [content, setContent] = useState<ReactNode | null>(null);

  useEffect(() => {
    // makes sure that the container exist before appending content
    // to ensure that screen readers detect and read the content
    const timer = setTimeout(() => setContent(children), 100);

    return () => {
      clearTimeout(timer);
    };
  }, [children]);

  return createElement(
    as,
    {
      'aria-live': 'assertive',
      'aria-atomic': 'true',
      ...rest,
      ref,
    },
    content
  );
}

export default forwardRef(Alert);
