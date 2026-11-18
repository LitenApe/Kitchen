import type { AccordionHeaderProps } from './AccordionHeader';

describe('AccordionHeaderProps', () => {
  // they link the header to its panel, so the accordion sets them
  test('leaves out the id, aria-controls and aria-expanded', () => {
    expectTypeOf<AccordionHeaderProps>().not.toHaveProperty('id');
    expectTypeOf<AccordionHeaderProps>().not.toHaveProperty('aria-controls');
    expectTypeOf<AccordionHeaderProps>().not.toHaveProperty('aria-expanded');
  });

  test('keeps the props of a button', () => {
    expectTypeOf<AccordionHeaderProps>().toHaveProperty('onClick');
    expectTypeOf<AccordionHeaderProps>().toHaveProperty('aria-disabled');
  });
});
