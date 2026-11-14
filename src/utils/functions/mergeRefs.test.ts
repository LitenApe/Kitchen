import { createRef } from 'react';
import { mergeRefs } from './mergeRefs';

describe('mergeRefs default behavior', () => {
  test('returns a callback ref when invoked with nothing', () => {
    const ref = mergeRefs();
    expect(typeof ref).toBe('function');
  });

  test('assigns the value to object refs', () => {
    const first = createRef<string>();
    const second = createRef<string>();

    mergeRefs(first, second)('foo bar');

    expect(first.current).toBe('foo bar');
    expect(second.current).toBe('foo bar');
  });

  test('calls callback refs with the value', () => {
    const callback = vi.fn();

    mergeRefs(callback)('foo bar');

    expect(callback).toHaveBeenCalledWith('foo bar');
  });

  test('ignores missing refs', () => {
    const ref = createRef<string>();

    mergeRefs(undefined, ref, null)('foo bar');

    expect(ref.current).toBe('foo bar');
  });

  test('cleanup resets object refs and calls callback refs with null', () => {
    const objectRef = createRef<string>();
    const callback = vi.fn();

    const cleanup = mergeRefs(objectRef, callback)('foo bar');
    cleanup?.();

    expect(objectRef.current).toBeNull();
    expect(callback).toHaveBeenLastCalledWith(null);
  });

  test('cleanup calls the cleanup function of callback refs instead of calling them with null', () => {
    const refCleanup = vi.fn();
    const callback = vi.fn(() => refCleanup);

    const cleanup = mergeRefs(callback)('foo bar');
    cleanup?.();

    expect(refCleanup).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
