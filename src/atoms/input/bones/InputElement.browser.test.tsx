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

  // a component which forwards its props passes `type` on as undefined
  test('stays a text input when its type is undefined', async () => {
    await render(<InputElement type={undefined} />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('type', 'text');
  });

  test('attaches its ref to the input', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<InputElement ref={ref} />);

    expect(ref.current).toBe(page.getByRole('textbox').element());
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
