import type { ReactNode } from 'react';
import { renderHook } from 'vitest-browser-react';

import { DescendantContext, useDescendant } from './DescendantContext';

/**
 * Renders the hook inside a registry which holds the given elements, and
 * records what the hook registers and unregisters.
 */
async function renderDescendant(elements: HTMLElement[] = []) {
  const register = vi.fn();
  const unregister = vi.fn();
  const hook = await renderHook(() => useDescendant<HTMLElement>(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <DescendantContext value={{ elements, register, unregister }}>
        {children}
      </DescendantContext>
    ),
  });

  /** Attaches the hook's ref to an element, like React would. */
  async function attach(element: HTMLElement | null) {
    let detach: (() => void) | undefined;
    await hook.act(() => {
      const cleanup = hook.result.current.ref(element);
      detach = typeof cleanup === 'function' ? cleanup : undefined;
    });
    return detach;
  }

  return { ...hook, register, unregister, attach };
}

function createElements(count: number): HTMLElement[] {
  return Array.from({ length: count }, () => document.createElement('p'));
}

describe('useDescendant general behavior', () => {
  test('has no index until its ref is attached', async () => {
    const { result } = await renderDescendant();
    expect(result.current.index).toBe(-1);
  });

  test('registers its element when attached, and unregisters it when detached', async () => {
    const [element] = createElements(1);
    const { register, unregister, attach } = await renderDescendant();

    const detach = await attach(element);
    expect(register).toHaveBeenCalledExactlyOnceWith(element);
    expect(unregister).not.toHaveBeenCalled();

    detach?.();
    expect(unregister).toHaveBeenCalledExactlyOnceWith(element);
  });

  test('ignores its ref being called without an element', async () => {
    const { result, register, attach } = await renderDescendant();

    expect(await attach(null)).toBeUndefined();
    expect(register).not.toHaveBeenCalled();
    expect(result.current.index).toBe(-1);
  });

  test('takes its index and neighbours from the registered elements', async () => {
    const [first, second, third] = createElements(3);
    const { result, attach } = await renderDescendant([first, second, third]);

    await attach(second);

    expect(result.current.index).toBe(1);
    expect(result.current.next()).toBe(third);
    expect(result.current.prev()).toBe(first);
  });

  test('wraps around at the ends', async () => {
    const [first, second] = createElements(2);
    const { result, attach } = await renderDescendant([first, second]);

    await attach(second);
    expect(result.current.next()).toBe(first);

    await attach(first);
    expect(result.current.prev()).toBe(second);
  });

  test('stays on its element at the ends when not looping', async () => {
    const [first, second] = createElements(2);
    const { result, attach } = await renderDescendant([first, second]);

    await attach(second);
    expect(result.current.next(false)).toBe(second);

    await attach(first);
    expect(result.current.prev(false)).toBe(first);
  });

  test('throws when not wrapped by Descendant', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(renderHook(() => useDescendant())).rejects.toThrow(
      'Component must be wrapped by Descendant'
    );

    error.mockRestore();
  });
});
