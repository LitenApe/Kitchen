import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { renderHook } from 'vitest-browser-react';

import { useIsHydrated } from './useIsHydrated';

/** Shows what the hook returns, and records it on every render. */
function Show({ values = [] }: { values?: boolean[] }) {
  const isHydrated = useIsHydrated();
  values.push(isHydrated);
  return <p>{`${isHydrated}`}</p>;
}

describe('useIsHydrated general behavior', () => {
  test('is true for a component which first renders in the browser', async () => {
    const { result } = await renderHook(() => useIsHydrated());
    expect(result.current).toBe(true);
  });

  test('is false on the server', () => {
    expect(renderToString(<Show />)).toBe('<p>false</p>');
  });

  test('is false while hydrating, and true once hydrated', async () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Show />);
    document.body.append(container);
    const values: boolean[] = [];
    const errors: unknown[] = [];

    const root = hydrateRoot(container, <Show values={values} />, {
      onRecoverableError: (error) => errors.push(error),
    });
    onTestFinished(() => {
      root.unmount();
      container.remove();
    });
    await expect.poll(() => container.textContent).toBe('true');

    expect(values[0]).toBe(false);
    expect(values.at(-1)).toBe(true);
    expect(errors).toEqual([]);
  });
});
