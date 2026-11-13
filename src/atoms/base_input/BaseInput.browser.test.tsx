import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field } from '../field';

import { BaseInput } from './';

describe('Label general behavior', () => {
  test('renders as input', async () => {
    await render(<BaseInput data-testid="test-component" />);
    const input = page.getByTestId('test-component');
    expect(input.element().nodeName).toBe('INPUT');
  });

  test('has no id attribute by default', async () => {
    await render(<BaseInput data-testid="test-component" />);
    const input = page.getByTestId('test-component');
    await expect.element(input).not.toHaveAttribute('id');
  });

  test('has id when wrapped by "FormField"', async () => {
    await render(
      <Field>
        <BaseInput data-testid="test-component" />
      </Field>
    );
    const input = page.getByTestId('test-component');
    await expect.element(input).toHaveAttribute('id');
  });

  test('overrides id from "FormField"', async () => {
    const { rerender } = await render(
      <Field>
        <BaseInput data-testid="test-component" />
      </Field>
    );

    const input = page.getByTestId('test-component');
    await expect.element(input).toHaveAttribute('id');
    expect(input.element().getAttribute('id')).toContain('form-field');

    await rerender(
      <Field>
        <BaseInput id="test-id" data-testid="test-component" />
      </Field>
    );
    await expect.element(input).toHaveAttribute('id', 'test-id');
  });

  test('refs are attached to DOM element', async () => {
    const ref = createRef<HTMLInputElement>();
    const value = 'Skies of Blue';
    await render(<BaseInput ref={ref} value={value} onChange={vi.fn()} />);

    expect(ref.current).not.toBeNull();
    await expect.element(ref.current).toHaveValue(value);
  });
});
