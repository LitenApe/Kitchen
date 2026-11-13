import { renderHook } from 'vitest-browser-react';
import { useMount } from '../useMount';

describe('useMount general behaviour', () => {
  test('invokes supplied callback', async () => {
    const mock = vi.fn();
    await renderHook(() => useMount(mock));
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('callback is only invoked once', async () => {
    const mock = vi.fn();
    const { rerender, unmount } = await renderHook(() => useMount(mock));

    expect(mock).toHaveBeenCalledTimes(1);
    await rerender();
    expect(mock).toHaveBeenCalledTimes(1);
    await unmount();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
