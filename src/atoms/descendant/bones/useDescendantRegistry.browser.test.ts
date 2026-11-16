import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { renderHook } from 'vitest-browser-react';

import { useDescendantRegistry } from './useDescendantRegistry';

// the registry sorts by document order, so its elements have to be attached
const container = document.createElement('div');

beforeAll(() => {
  document.body.append(container);
});

afterAll(() => {
  container.remove();
});

/** Creates elements with the given ids, in that order in the document. */
function createElements(...ids: string[]): HTMLElement[] {
  const elements = ids.map((id) => {
    const element = document.createElement('p');
    element.id = id;
    return element;
  });
  container.replaceChildren(...elements);
  return elements;
}

function getIds(elements: ReadonlyArray<HTMLElement>): string[] {
  return elements.map((element) => element.id);
}

describe('useDescendantRegistry general behavior', () => {
  test('starts without elements', async () => {
    const { result } = await renderHook(() => useDescendantRegistry());
    expect(result.current.elements).toHaveLength(0);
  });

  test('keeps the registered elements in document order', async () => {
    const [first, second, third] = createElements('first', 'second', 'third');
    const { result, act } = await renderHook(() => useDescendantRegistry());

    await act(() => {
      result.current.register(third);
      result.current.register(first);
      result.current.register(second);
    });

    expect(getIds(result.current.elements)).toEqual([
      'first',
      'second',
      'third',
    ]);
  });

  test('returns the same value until its elements change', async () => {
    const [element] = createElements('element');
    const { result, act, rerender } = await renderHook(() =>
      useDescendantRegistry()
    );
    const initial = result.current;

    await rerender();
    expect(result.current).toBe(initial);

    await act(() => result.current.register(element));
    expect(result.current).not.toBe(initial);
    expect(result.current.register).toBe(initial.register);
    expect(result.current.unregister).toBe(initial.unregister);
  });

  // React moves elements without registering them again
  test('sorts its elements again when they are moved', async () => {
    const [first, second, third] = createElements('first', 'second', 'third');
    const { result, act } = await renderHook(() => useDescendantRegistry());

    await act(() => {
      result.current.register(first);
      result.current.register(second);
      result.current.register(third);
    });
    container.append(first);

    await expect
      .poll(() => getIds(result.current.elements))
      .toEqual(['second', 'third', 'first']);
  });

  // the server has to be given the elements of its own, as it never
  // subscribes to the registry
  test('renders on the server, without elements', () => {
    function Count() {
      const { elements } = useDescendantRegistry();
      return createElement('p', null, elements.length);
    }

    expect(renderToString(createElement(Count))).toBe('<p>0</p>');
  });
});
