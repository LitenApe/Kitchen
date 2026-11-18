import type { AccordionPanelProps } from './AccordionPanel';

describe('AccordionPanelProps', () => {
  // they link the panel to its header, or follow the accordion, so the
  // accordion sets them
  test('leaves out the id, aria-labelledby and hidden', () => {
    expectTypeOf<AccordionPanelProps>().not.toHaveProperty('id');
    expectTypeOf<AccordionPanelProps>().not.toHaveProperty('aria-labelledby');
    expectTypeOf<AccordionPanelProps>().not.toHaveProperty('hidden');
  });

  test('keeps the props of a section', () => {
    expectTypeOf<AccordionPanelProps>().toHaveProperty('className');
    expectTypeOf<AccordionPanelProps>().toHaveProperty('ref');
  });
});
