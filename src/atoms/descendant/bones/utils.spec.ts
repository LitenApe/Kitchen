import { getNextIndex, getPreviousIndex } from './utils';

describe('getNextIndex', () => {
  test('increment with 1 when current is lower then length', () => {
    expect(getNextIndex(0, 2)).toBe(1);
  });

  test('returns 0 when increment results in overflow', () => {
    expect(getNextIndex(1, 2)).toBe(0);
  });

  test('returns same index when increment overflows and loop is disabled', () => {
    expect(getNextIndex(1, 2, false)).toBe(1);
  });
});

describe('getPreviousIndex', () => {
  test('decrement with 1 when current is higher then 0', () => {
    expect(getPreviousIndex(1, 2)).toBe(0);
  });

  test('returns 1 when decrement results in overflow', () => {
    expect(getPreviousIndex(0, 2)).toBe(1);
  });

  test('returns same index when increment overflows and loop is disabled', () => {
    expect(getPreviousIndex(0, 2, false)).toBe(0);
  });
});
