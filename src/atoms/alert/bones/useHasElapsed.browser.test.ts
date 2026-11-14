import { renderHook } from 'vitest-browser-react';

import { useHasElapsed } from './useHasElapsed';

describe('useHasElapsed general behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('turns true once the delay has passed', async () => {
    const { result, act } = await renderHook(() => useHasElapsed(100));
    expect(result.current).toBe(false);

    await act(() => vi.advanceTimersByTime(99));
    expect(result.current).toBe(false);

    await act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe(true);
  });

  test('stays true when re-rendered', async () => {
    const { result, act, rerender } = await renderHook(() =>
      useHasElapsed(100)
    );

    await act(() => vi.advanceTimersByTime(100));
    await rerender();

    expect(result.current).toBe(true);
  });

  test('does not restart the delay when re-rendered', async () => {
    const { result, act, rerender } = await renderHook(() =>
      useHasElapsed(100)
    );

    await act(() => vi.advanceTimersByTime(60));
    await rerender();
    await act(() => vi.advanceTimersByTime(40));

    expect(result.current).toBe(true);
  });

  test('stops its timer when unmounted', async () => {
    const { unmount } = await renderHook(() => useHasElapsed(100));
    expect(vi.getTimerCount()).toBe(1);

    await unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
