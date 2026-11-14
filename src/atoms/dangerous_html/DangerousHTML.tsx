import type { ElementType, JSX } from 'react';

import type { PolymorphicProps } from '../../utils/types/PolymorphicProps';

export type DangerousHTMLProps<T extends ElementType> = PolymorphicProps<
  T,
  {
    /** The HTML to render. Must be trusted or sanitised. */
    content: string;
    children?: never;
  }
>;

function DangerousHTML<T extends ElementType = 'div'>({
  as,
  content,
  ...props
}: DangerousHTMLProps<T>): JSX.Element {
  const Component: ElementType = as ?? 'div';
  return <Component {...props} dangerouslySetInnerHTML={{ __html: content }} />;
}

export default DangerousHTML;
