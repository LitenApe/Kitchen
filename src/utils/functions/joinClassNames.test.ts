import { joinClassNames } from './joinClassNames';

describe('joinClassNames default behavior', () => {
  test('returns nothing when invoked with no args', () => {
    expect(joinClassNames()).toBeUndefined();
  });

  test('returns nothing when every class name is missing', () => {
    expect(joinClassNames(false, undefined, null, '')).toBeUndefined();
  });

  test('joins class names with spaces', () => {
    expect(joinClassNames('foo', 'bar baz')).toBe('foo bar baz');
  });

  test('skips missing class names', () => {
    expect(joinClassNames('foo', false, undefined, null, '', 'bar')).toBe(
      'foo bar'
    );
  });
});
