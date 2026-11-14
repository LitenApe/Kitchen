import type { FocusEvent } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { useGroupBlur } from './useGroupBlur';

type GroupProps = {
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Whether the group's element is attached to the hook. */
  attached?: boolean;
};

/** Two inputs which report blur through the hook, and a button outside them. */
function Group({ onBlur, attached = true }: GroupProps) {
  const { groupRef, handleBlur } = useGroupBlur<HTMLDivElement>(onBlur);

  return (
    <>
      <div ref={attached ? groupRef : undefined}>
        <input aria-label="first" onBlur={handleBlur} />
        <input aria-label="second" onBlur={handleBlur} />
      </div>
      <button>outside</button>
    </>
  );
}

describe('useGroupBlur general behavior', () => {
  test('ignores focus moving between the elements of the group', async () => {
    const onBlur = vi.fn();
    await render(<Group onBlur={onBlur} />);

    page.getByLabelText('first').element().focus();
    page.getByLabelText('second').element().focus();

    expect(onBlur).not.toHaveBeenCalled();
  });

  test('calls onBlur when focus leaves the group', async () => {
    const onBlur = vi.fn();
    await render(<Group onBlur={onBlur} />);

    page.getByLabelText('first').element().focus();
    page.getByRole('button').element().focus();

    expect(onBlur).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ type: 'blur' })
    );
  });

  test('calls onBlur when focus is lost altogether', async () => {
    const onBlur = vi.fn();
    await render(<Group onBlur={onBlur} />);

    const first = page.getByLabelText('first').element();
    first.focus();
    first.blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('calls onBlur on every blur while no group is attached', async () => {
    const onBlur = vi.fn();
    await render(<Group onBlur={onBlur} attached={false} />);

    page.getByLabelText('first').element().focus();
    page.getByLabelText('second').element().focus();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
