import { renderHook } from 'vitest-browser-react';
import { useNumber } from '../useNumber';

describe('useBoolean general behaviour', () => {
  test('iniates with "0" by default', async () => {
    const { result } = await renderHook(() => useNumber());
    const [value] = result.current;
    expect(value).toBe(0);
  });

  test('initial value sets initial state', async () => {
    const { result } = await renderHook(() => useNumber(123));
    const [value] = result.current;
    expect(value).toBe(123);
  });

  test('setter updates state', async () => {
    const { result, act } = await renderHook(() => useNumber(123));

    expect(result.current[0]).toBe(123);
    await act(() => result.current[1](321));
    expect(result.current[0]).toBe(321);
    await act(() => result.current[1](5161));
    expect(result.current[0]).toBe(5161);
  });

  test('"increment" increases value with 1', async () => {
    const { result, act } = await renderHook(() => useNumber(123));

    expect(result.current[0]).toBe(123);
    await act(() => result.current[2].increment());
    expect(result.current[0]).toBe(124);
    await act(() => result.current[2].increment());
    expect(result.current[0]).toBe(125);
  });

  test('"decrement" decreases value with 1', async () => {
    const { result, act } = await renderHook(() => useNumber(123));

    expect(result.current[0]).toBe(123);
    await act(() => result.current[2].decrement());
    expect(result.current[0]).toBe(122);
    await act(() => result.current[2].decrement());
    expect(result.current[0]).toBe(121);
  });
});
