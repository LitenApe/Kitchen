import { renderHook } from 'vitest-browser-react';
import { useId } from '../useId';

describe('useId general behavior', () => {
  test('generates id with "kitchen" as default prefix', async () => {
    const { result } = await renderHook(() => useId());
    expect(result.current).toMatch(/kitchen/);
  });

  test('uses a dash after prefix', async () => {
    const { result } = await renderHook(() => useId());
    expect(result.current).toMatch(/kitchen-/);
  });

  test('appends a number after the prefix', async () => {
    const { result } = await renderHook(() => useId());
    expect(result.current).toMatch(/kitchen-\d/);
  });

  test('uses custom prefix when supplied', async () => {
    const { result } = await renderHook(() => useId('test-prefix'));
    expect(result.current).toMatch(/test-prefix-\d+/);
  });

  test('keeps the same id between rerenders', async () => {
    const { result, rerender } = await renderHook(() => useId('test-prefix'));

    const firstRender = result.current[0];
    await rerender();
    const secondRender = result.current[0];
    expect(firstRender).toBe(secondRender);
  });

  test('generate a new id when prefix is changed', async () => {
    const { result, rerender } = await renderHook(
      (initial?: string) => useId(initial),
      { initialProps: 'test-one' }
    );
    expect(result.current).toMatch(/test-one-\d+/);

    await rerender('test-two');
    expect(result.current).toMatch(/test-two-\d+/);
  });

  test('generated id increases with use of same prefix', async () => {
    const { result: resultOne } = await renderHook(() => useId());
    const { result: resultTwo } = await renderHook(() => useId());
    const { result: resultThree } = await renderHook(() => useId());

    const ids = [resultOne.current, resultTwo.current, resultThree.current]
      .map((value) => value.match(/\d+/)?.pop())
      .filter(<T>(value: T | undefined): value is T => value !== undefined)
      .map((value) => parseInt(value));

    expect(ids).toHaveLength(3);

    expect(ids[0]).toBeLessThan(ids[1]);
    expect(ids[1]).toBeLessThan(ids[2]);
  });
});
