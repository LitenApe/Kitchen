import { Accordion, AccordionHeader } from '../../../atoms/accordion';
import { isAccordion } from './isAccordion';

describe('isAccordion', () => {
  test('accepts Accordion elements', () => {
    expect(isAccordion(<Accordion />)).toBe(true);
  });

  test('rejects other elements', () => {
    expect(isAccordion(<div />)).toBe(false);
    expect(isAccordion(<AccordionHeader />)).toBe(false);
  });

  test('rejects anything which is not an element', () => {
    expect(isAccordion('Accordion')).toBe(false);
    expect(isAccordion(1)).toBe(false);
    expect(isAccordion(null)).toBe(false);
    expect(isAccordion(undefined)).toBe(false);
    expect(isAccordion([<Accordion key="accordion" />])).toBe(false);
  });
});
