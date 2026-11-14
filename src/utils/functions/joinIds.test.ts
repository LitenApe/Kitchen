import { joinIds } from './joinIds';

describe('joinIds default behavior', () => {
  test('returns nothing when invoked with no args', () => {
    expect(joinIds()).toBeUndefined();
  });

  test('returns nothing when invoked with non string values', () => {
    expect(joinIds(false, true, undefined, null)).toBeUndefined();
  });

  test('returns the id when given one id', () => {
    expect(joinIds('test')).toBe('test');
  });

  test('joins multiple ids with spaces', () => {
    expect(joinIds('foo', 'bar', 'baz qux')).toBe('foo bar baz qux');
  });

  test('removes duplicate ids', () => {
    expect(joinIds('foo', 'bar', 'foo bar', 'zap', 'bar')).toBe('foo bar zap');
  });

  test('keeps ids which only contain another id', () => {
    expect(joinIds('foobar', 'foo')).toBe('foobar foo');
  });

  test('ignores extra whitespace', () => {
    expect(joinIds('  foo   bar ', '')).toBe('foo bar');
  });
});
