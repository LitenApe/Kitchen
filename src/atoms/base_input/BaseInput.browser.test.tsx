import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field } from '../field';

import { BaseInput } from './';

describe('BaseInput general behavior', () => {
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

  test('has id when wrapped by "Field"', async () => {
    await render(
      <Field>
        <BaseInput data-testid="test-component" />
      </Field>
    );
    const input = page.getByTestId('test-component');
    await expect.element(input).toHaveAttribute('id');
  });

  test('overrides id from "Field"', async () => {
    const { rerender } = await render(
      <Field>
        <BaseInput data-testid="test-component" />
      </Field>
    );

    const input = page.getByTestId('test-component');
    await expect.element(input).toHaveAttribute('id');

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

  test('renders as a textarea when "as" is "textarea"', async () => {
    await render(<BaseInput as="textarea" data-testid="test-component" />);
    const textarea = page.getByTestId('test-component');

    expect(textarea.element().nodeName).toBe('TEXTAREA');
    await expect.element(textarea).not.toHaveAttribute('as');
  });

  test('is valid without an error', async () => {
    await render(<BaseInput data-testid="test-component" />);
    const input = page.getByTestId('test-component');

    await expect.element(input).toHaveAttribute('aria-invalid', 'false');
    await expect.element(input).toBeValid();
  });

  test('an error marks it as invalid, with the error as its message', async () => {
    await render(
      <BaseInput data-testid="test-component" error="Enter a value" />
    );
    const input = page.getByTestId('test-component');

    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
    await expect.element(input).not.toHaveAttribute('error');
    expect(input.element()).toHaveProperty(
      'validationMessage',
      'Enter a value'
    );
  });

  test('an error marks a textarea as invalid as well', async () => {
    await render(
      <BaseInput
        as="textarea"
        data-testid="test-component"
        error="Enter a value"
      />
    );
    const textarea = page.getByTestId('test-component');

    await expect.element(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea.element()).toHaveProperty(
      'validationMessage',
      'Enter a value'
    );
  });

  test('keeps its error message when given a ref', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<BaseInput ref={ref} error="Enter a value" />);

    expect(ref.current?.validationMessage).toBe('Enter a value');
  });

  test('takes props from "Field", where its own props take precedence', async () => {
    await render(
      <Field name="field" placeholder="field" error="Enter a value">
        <BaseInput data-testid="test-component" placeholder="own" />
      </Field>
    );
    const input = page.getByTestId('test-component');

    await expect.element(input).toHaveAttribute('name', 'field');
    await expect.element(input).toHaveAttribute('placeholder', 'own');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('does not mark a radio as invalid, but takes the error as its message', async () => {
    await render(
      <BaseInput
        type="radio"
        data-testid="test-component"
        error="Choose an option"
      />
    );
    const radio = page.getByTestId('test-component');

    await expect.element(radio).not.toHaveAttribute('aria-invalid');
    expect(radio.element()).toHaveProperty(
      'validationMessage',
      'Choose an option'
    );
  });
});
