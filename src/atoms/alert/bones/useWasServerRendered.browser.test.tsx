import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { renderHook } from 'vitest-browser-react';

import { useWasServerRendered } from './useWasServerRendered';

/** Shows what the hook returns. */
function Show() {
  return <p>{`${useWasServerRendered()}`}</p>;
}

describe('useWasServerRendered general behavior', () => {
  test('is false for a component which first renders in the browser', async () => {
    const { result } = await renderHook(() => useWasServerRendered());
    expect(result.current).toBe(false);
  });

  test('is true on the server', () => {
    expect(renderToString(<Show />)).toBe('<p>true</p>');
  });

  // React switches to the browser's value once it has hydrated
  test('stays true for a component which hydrated what the server rendered', async () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Show />);
    document.body.append(container);
    const errors: unknown[] = [];

    const root = hydrateRoot(container, <Show />, {
      onRecoverableError: (error) => errors.push(error),
    });
    onTestFinished(() => {
      root.unmount();
      container.remove();
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(container.textContent).toBe('true');
    expect(errors).toEqual([]);
  });
});
