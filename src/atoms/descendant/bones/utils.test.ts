import { getNeighbours, getNextIndex, getPreviousIndex } from './utils';

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

describe('getNeighbours', () => {
  const elements = ['first', 'second', 'third'];

  test('finds the position of the element', () => {
    expect(getNeighbours(elements, 'second').index).toBe(1);
  });

  test('has no position without an element, or for one which is not among them', () => {
    expect(getNeighbours(elements, null).index).toBe(-1);
    expect(getNeighbours(elements, 'fourth').index).toBe(-1);
  });

  test('returns the elements next to it', () => {
    const { next, prev } = getNeighbours(elements, 'second');

    expect(next()).toBe('third');
    expect(prev()).toBe('first');
  });

  test('wraps around at the ends', () => {
    expect(getNeighbours(elements, 'third').next()).toBe('first');
    expect(getNeighbours(elements, 'first').prev()).toBe('third');
  });

  test('stays on the element at the ends when not looping', () => {
    expect(getNeighbours(elements, 'third').next(false)).toBe('third');
    expect(getNeighbours(elements, 'first').prev(false)).toBe('first');
  });
});
