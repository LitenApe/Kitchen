import { Accordion } from '../../../atoms/accordion';
import { rendersNothing } from './rendersNothing';

describe('rendersNothing', () => {
  test('accepts null, undefined and booleans', () => {
    expect(rendersNothing(null)).toBe(true);
    expect(rendersNothing(undefined)).toBe(true);
    expect(rendersNothing(false)).toBe(true);
    expect(rendersNothing(true)).toBe(true);
  });

  test('rejects elements, text and numbers, which render something', () => {
    expect(rendersNothing(<Accordion />)).toBe(false);
    expect(rendersNothing('Shipping')).toBe(false);
    expect(rendersNothing(0)).toBe(false);
  });
});
