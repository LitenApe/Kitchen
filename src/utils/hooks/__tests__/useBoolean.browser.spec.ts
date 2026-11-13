import { renderHook } from 'vitest-browser-react';
import { useBoolean } from '../useBoolean';

describe('useBoolean general behaviour', () => {
  test('iniates with "false" by default', async () => {
    const { result } = await renderHook(() => useBoolean());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  test('initial value sets initial state', async () => {
    const { result } = await renderHook(() => useBoolean(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  test('setter updates state', async () => {
    const { result, act } = await renderHook(() => useBoolean(false));

    expect(result.current[0]).toBe(false);
    await act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
    await act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });
});
