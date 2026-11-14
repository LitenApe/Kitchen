import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import InputElement from './InputElement';

describe('InputElement general behavior', () => {
  test('renders a text input by default', async () => {
    await render(<InputElement />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('type', 'text');
  });

  test('takes another type when given one', async () => {
    await render(<InputElement type="email" />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('type', 'email');
  });

  test('is valid without an error', async () => {
    await render(<InputElement />);
    const input = page.getByRole('textbox');

    await expect.element(input).toHaveAttribute('aria-invalid', 'false');
    await expect.element(input).toBeValid();
  });

  test('an error marks it as invalid, with the error as its message', async () => {
    await render(<InputElement error="Enter a value" />);
    const input = page.getByRole('textbox');

    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
    await expect.element(input).not.toHaveAttribute('error');
    expect(input.element()).toHaveProperty(
      'validationMessage',
      'Enter a value'
    );
  });

  test('keeps its error message when given a ref', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<InputElement ref={ref} error="Enter a value" />);

    expect(ref.current).toBe(page.getByRole('textbox').element());
    expect(ref.current?.validationMessage).toBe('Enter a value');
  });

  test('is described by an affix next to its own descriptions', async () => {
    await render(<InputElement aria-describedby="hint" affixId="unit" />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('aria-describedby', 'hint unit');
  });

  test('keeps its own descriptions without an affix', async () => {
    await render(<InputElement aria-describedby="hint" />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('aria-describedby', 'hint');
  });

  test('does not pass the affix id on as an attribute', async () => {
    await render(<InputElement affixId="unit" />);

    await expect
      .element(page.getByRole('textbox'))
      .not.toHaveAttribute('affixid');
  });
});
