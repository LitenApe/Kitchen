import { createElement, createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { mergeRefs } from './mergeRefs';

describe('mergeRefs with DOM elements', () => {
  test('refs are attached to the element and reset when it is removed', async () => {
    const objectRef = createRef<HTMLButtonElement>();
    const callback = vi.fn();

    const { unmount } = await render(
      createElement('button', { ref: mergeRefs(objectRef, callback) })
    );

    const element = page.getByRole('button').element();
    expect(objectRef.current).toBe(element);
    expect(callback).toHaveBeenCalledWith(element);

    await unmount();

    expect(objectRef.current).toBeNull();
    expect(callback).toHaveBeenLastCalledWith(null);
  });
});
