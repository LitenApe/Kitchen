import { getNextIndex, getPreviousIndex, navigateFrom } from './utils';

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

describe('navigateFrom', () => {
  const elements = ['first', 'second', 'third'];

  test('finds the position of the element', () => {
    expect(navigateFrom(elements, 'second').index).toBe(1);
  });

  test('has no position without an element, or for one which is not among them', () => {
    expect(navigateFrom(elements, null).index).toBe(-1);
    expect(navigateFrom(elements, 'fourth').index).toBe(-1);
  });

  test('returns the elements next to it', () => {
    const { next, prev } = navigateFrom(elements, 'second');

    expect(next()).toBe('third');
    expect(prev()).toBe('first');
  });

  test('wraps around at the ends', () => {
    expect(navigateFrom(elements, 'third').next()).toBe('first');
    expect(navigateFrom(elements, 'first').prev()).toBe('third');
  });

  test('stays on the element at the ends when not looping', () => {
    expect(navigateFrom(elements, 'third').next(false)).toBe('third');
    expect(navigateFrom(elements, 'first').prev(false)).toBe('first');
  });

  // such as an element which has not registered yet
  test('has no neighbours without an element, or for one which is not among them', () => {
    for (const element of [null, 'fourth']) {
      const { next, prev } = navigateFrom(elements, element);

      expect(next()).toBeUndefined();
      expect(prev()).toBeUndefined();
      expect(next(false)).toBeUndefined();
      expect(prev(false)).toBeUndefined();
    }
  });

  test('still finds the elements at either end without an element', () => {
    const { first, last } = navigateFrom(elements, null);

    expect(first()).toBe('first');
    expect(last()).toBe('third');
  });

  test('returns the elements at either end', () => {
    const { first, last } = navigateFrom(elements, 'second');

    expect(first()).toBe('first');
    expect(last()).toBe('third');
  });

  test('has no elements at the ends when there are none', () => {
    const { first, last } = navigateFrom<string>([], null);

    expect(first()).toBeUndefined();
    expect(last()).toBeUndefined();
  });
});
