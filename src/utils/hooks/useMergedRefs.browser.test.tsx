import { type Ref, createRef } from 'react';
import { page } from 'vitest/browser';
import { render, renderHook } from 'vitest-browser-react';

import { useMergedRefs } from './useMergedRefs';

function Input({ refs }: { refs: Array<Ref<HTMLInputElement>> }) {
  const ref = useMergedRefs(...refs);
  return <input ref={ref} />;
}

describe('useMergedRefs general behavior', () => {
  test('attaches the element to every ref, and detaches it when removed', async () => {
    const objectRef = createRef<HTMLInputElement>();
    const callbackRef = vi.fn();
    const { unmount } = await render(<Input refs={[objectRef, callbackRef]} />);

    const input = page.getByRole('textbox').element();
    expect(objectRef.current).toBe(input);
    expect(callbackRef).toHaveBeenLastCalledWith(input);

    await unmount();

    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  test('returns the same ref while the given refs stay the same', async () => {
    const ref = createRef<HTMLInputElement>();
    const { result, rerender } = await renderHook(() => useMergedRefs(ref));
    const merged = result.current;

    await rerender();

    expect(result.current).toBe(merged);
  });

  test('returns a new ref when one of the given refs changes', async () => {
    const { result, rerender } = await renderHook(
      (ref?: Ref<HTMLInputElement>) => useMergedRefs(ref),
      { initialProps: createRef<HTMLInputElement>() }
    );
    const merged = result.current;

    await rerender(createRef<HTMLInputElement>());

    expect(result.current).not.toBe(merged);
  });
});
