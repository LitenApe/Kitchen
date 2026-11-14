import { callAll } from './callAll';

describe('utility function callAll', () => {
  test('returns a function on initiation', () => {
    const fn = callAll();
    expect(typeof fn).toBe('function');
  });

  test('calls all arguments when invoked', () => {
    const mock = vi.fn();
    const fn = callAll(mock, mock, mock);

    expect(mock).not.toHaveBeenCalled();
    fn();
    expect(mock).toHaveBeenCalledTimes(3);
  });

  test('calls all arguments when invoked with parameters', () => {
    const first = vi.fn();
    const second = vi.fn();
    const third = vi.fn();
    const fn = callAll(first, second, third);

    const testString = 'cookies is the best snack';
    fn(testString);
    expect(first).toHaveBeenCalledExactlyOnceWith(testString);
    expect(second).toHaveBeenCalledExactlyOnceWith(testString);
    expect(third).toHaveBeenCalledExactlyOnceWith(testString);
  });

  test('skips missing callbacks', () => {
    const mock = vi.fn();
    const fn = callAll(mock, undefined, mock, null, mock, undefined);

    fn();
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
