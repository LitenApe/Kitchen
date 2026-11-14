import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useCustomValidity } from './useCustomValidity';

function TestInput({ error }: { error?: string }) {
  const ref = useCustomValidity<HTMLInputElement>(error);
  return <input ref={ref} />;
}

describe('useCustomValidity general behaviour', () => {
  test('marks the element as invalid with the error as its message', async () => {
    await render(<TestInput error="something went wrong" />);
    const input = page.getByRole('textbox').element();

    expect(input).toBeInstanceOf(HTMLInputElement);
    if (input instanceof HTMLInputElement) {
      expect(input.validity.valid).toBe(false);
      expect(input.validationMessage).toBe('something went wrong');
    }
  });

  test('makes the element valid again when the error is cleared', async () => {
    const { rerender } = await render(<TestInput error="error" />);
    await rerender(<TestInput />);
    const input = page.getByRole('textbox').element();

    expect(input).toBeInstanceOf(HTMLInputElement);
    if (input instanceof HTMLInputElement) {
      expect(input.validity.valid).toBe(true);
    }
  });
});
