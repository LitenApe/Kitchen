import { renderHook } from 'vitest-browser-react';
import { useControllableState } from './useControllableState';

describe('useControllableState general behaviour', () => {
  test('keeps its own state when uncontrolled', async () => {
    const { result, act } = await renderHook(() =>
      useControllableState({
        name: 'Test',
        value: undefined,
        defaultValue: false,
        onChange: undefined,
      })
    );

    expect(result.current[0]).toBe(false);
    await act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
  });

  test('requests changes through onChange when controlled', async () => {
    const onChange = vi.fn();
    const { result, act } = await renderHook(() =>
      useControllableState<boolean, [string]>({
        name: 'Test',
        value: false,
        defaultValue: false,
        onChange,
      })
    );

    await act(() => result.current[1](true, 'extra'));

    expect(onChange).toHaveBeenCalledWith(true, 'extra');
    expect(result.current[0]).toBe(false);
  });

  test('follows the value when controlled', async () => {
    const { result, rerender } = await renderHook(
      (value?: number) =>
        useControllableState({
          name: 'Test',
          value,
          defaultValue: 0,
          onChange: vi.fn(),
        }),
      { initialProps: 1 }
    );

    expect(result.current[0]).toBe(1);
    await rerender(2);
    expect(result.current[0]).toBe(2);
  });

  test('ignores changes and warns when given onChange without a value', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const onChange = vi.fn();
    const { result, act } = await renderHook(() =>
      useControllableState({
        name: 'Test',
        value: undefined,
        defaultValue: false,
        onChange,
      })
    );

    await act(() => result.current[1](true));

    expect(onChange).not.toHaveBeenCalled();
    expect(result.current[0]).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});
