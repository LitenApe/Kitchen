import { ForwardedRef, JSX, createElement, forwardRef } from 'react';

import { DynamicProps } from '../../utils/types/DynamicProps';

function DangerousHTML<T extends keyof JSX.IntrinsicElements = 'div'>(
  props: Omit<DynamicProps<T>, 'children'> & { content: string },
  ref: ForwardedRef<HTMLElement>
): JSX.Element {
  const { as = 'div', content, ...rest } = props;
  return createElement(as, {
    ...rest,
    ref,
    dangerouslySetInnerHTML: { __html: content },
  });
}

export default forwardRef(DangerousHTML);
