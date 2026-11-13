import { renderHook } from 'vitest-browser-react';
import { useDestroy } from '../useDestroy';

describe('useDestroy general behavior', () => {
  test('does not invoked callback on mount', async () => {
    const mock = vi.fn();
    await renderHook(() => useDestroy(mock));
    expect(mock).not.toHaveBeenCalled();
  });

  test('does not invoked callback between re-renders', async () => {
    const mock = vi.fn();
    const { rerender } = await renderHook(() => useDestroy(mock));

    expect(mock).not.toHaveBeenCalled();
    await rerender();
    expect(mock).not.toHaveBeenCalled();
  });

  test('invokes callback on unmount', async () => {
    const mock = vi.fn();
    const { unmount } = await renderHook(() => useDestroy(mock));

    expect(mock).not.toHaveBeenCalled();
    await unmount();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
