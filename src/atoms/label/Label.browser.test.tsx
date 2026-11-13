import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field } from '../field';

import Label from './Label';

describe('Label general behavior', () => {
  test('has no id attribute by default', async () => {
    await render(<Label data-testid="test-component" />);
    const label = page.getByTestId('test-component');
    await expect.element(label).not.toHaveAttribute('for');
  });

  test('has id when wrapped by "FormField"', async () => {
    await render(
      <Field>
        <Label data-testid="test-component" />
      </Field>
    );
    const label = page.getByTestId('test-component');
    await expect.element(label).toHaveAttribute('for');
  });

  test('overrides id from "FormField"', async () => {
    const { rerender } = await render(
      <Field>
        <Label data-testid="test-component" />
      </Field>
    );

    const input = page.getByTestId('test-component');
    await expect.element(input).toHaveAttribute('for');
    expect(input.element().getAttribute('for')).toContain('form-field');

    await rerender(
      <Field>
        <Label htmlFor="test-id" data-testid="test-component" />
      </Field>
    );
    await expect.element(input).toHaveAttribute('for', 'test-id');
  });
});
