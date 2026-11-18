import type { MouseEvent, MouseEventHandler } from 'react';

import type { AccordionProps } from './Accordion';

describe('AccordionProps', () => {
  test('requires open and onOpenChange, as the accordion is controlled', () => {
    expectTypeOf<AccordionProps['open']>().toEqualTypeOf<boolean>();
    expectTypeOf<AccordionProps['onOpenChange']>().toEqualTypeOf<
      (open: boolean, event: MouseEvent<HTMLButtonElement>) => void
    >();
  });

  test('keeps no state of its own', () => {
    expectTypeOf<AccordionProps>().not.toHaveProperty('initial');
  });

  test("keeps the element's own onClick", () => {
    expectTypeOf<AccordionProps['onClick']>().toEqualTypeOf<
      MouseEventHandler<HTMLDivElement> | undefined
    >();
  });
});
