import { getOpenIndex } from './getOpenIndex';

describe('getOpenIndex', () => {
  test('opens the accordion which asks to open', () => {
    expect(getOpenIndex(2, true)).toBe(2);
  });

  test('leaves every accordion closed when one asks to close', () => {
    expect(getOpenIndex(2, false)).toBe(-1);
  });
});
