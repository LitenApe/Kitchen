import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Field } from '../field';
import { Input } from '.';

describe('Input default behavior', () => {
  test('renders without crashing', async () => {
    await render(<Input />);
  });

  test('renders as "input" by default', async () => {
    await render(<Input />);
    const element = page.getByRole('textbox');
    expect(element.element().nodeName).toBe('INPUT');
  });

  test('has type "text" by default', async () => {
    await render(<Input />);
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('type', 'text');
  });

  test('has type "tel" when specified', async () => {
    await render(<Input type="tel" />);
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('type', 'tel');
  });

  test('prefix is related to input', async () => {
    await render(<Input prefix="😁" />);
    const element = page.getByRole('textbox');
    const prefixId = element.element().getAttribute('aria-describedby');
    const prefix = page.getByText('😁');

    await expect.element(prefix).toHaveAttribute('id', prefixId);
  });

  test('postfix is related to input', async () => {
    await render(<Input postfix="😁" />);
    const element = page.getByRole('textbox');
    const postfixId = element.element().getAttribute('aria-describedby');
    const postfix = page.getByText('😁');

    await expect.element(postfix).toHaveAttribute('id', postfixId);
  });

  test('shows the prefix before the input', async () => {
    await render(<Input prefix="€" />);
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const prefix = page.getByText('€').element().getBoundingClientRect();

    expect(prefix.right).toBeLessThanOrEqual(input.left);
  });

  test('shows the postfix after the input', async () => {
    await render(<Input postfix="kg" />);
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const postfix = page.getByText('kg').element().getBoundingClientRect();

    expect(postfix.left).toBeGreaterThanOrEqual(input.right);
  });

  test('keeps its own aria-describedby next to the affix', async () => {
    await render(<Input prefix="€" aria-describedby="hint" />);
    const describedBy = page
      .getByRole('textbox')
      .element()
      .getAttribute('aria-describedby');

    expect(describedBy).toBe(`hint ${page.getByText('€').element().id}`);
  });

  test('passes aria-describedby on unchanged without an affix', async () => {
    await render(<Input aria-describedby="hint" />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('aria-describedby', 'hint');
  });

  test('renders JSX prefix', async () => {
    await render(<Input prefix={<span data-testid="test-container" />} />);
    const element = page.getByTestId('test-container');
    await expect.element(element).toBeInTheDocument();
  });

  test('renders JSX postfix', async () => {
    await render(<Input postfix={<span data-testid="test-container" />} />);
    const element = page.getByTestId('test-container');
    await expect.element(element).toBeInTheDocument();
  });

  test('has "id" when wrapped by "Field"', async () => {
    await render(
      <Field>
        <Input />
      </Field>
    );
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('id');
  });

  test('prefix on Field is passed down to Input', async () => {
    await render(
      <Field prefix="😁">
        <Input />
      </Field>
    );

    const element = page.getByRole('textbox');
    const prefixId = element.element().getAttribute('aria-describedby');
    const prefix = page.getByText('😁');

    await expect.element(prefix).toHaveAttribute('id', prefixId);
  });

  test('postfix on Field is passed down to Input', async () => {
    await render(
      <Field postfix="😁">
        <Input />
      </Field>
    );

    const element = page.getByRole('textbox');
    const postfixId = element.element().getAttribute('aria-describedby');
    const postfix = page.getByText('😁');

    await expect.element(postfix).toHaveAttribute('id', postfixId);
  });

  test('its own id takes precedence over the one from "Field"', async () => {
    await render(
      <Field>
        <Input id="own" />
      </Field>
    );

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('id', 'own');
  });

  test('takes props from "Field", where its own props take precedence', async () => {
    await render(
      <Field name="field" placeholder="field" error="Enter a value">
        <Input placeholder="own" />
      </Field>
    );
    const input = page.getByRole('textbox');

    await expect.element(input).toHaveAttribute('name', 'field');
    await expect.element(input).toHaveAttribute('placeholder', 'own');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('attaches its ref to the input', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Input ref={ref} />);

    expect(ref.current).toBe(page.getByRole('textbox').element());
  });

  test('is valid without an error', async () => {
    await render(<Input />);
    const input = page.getByRole('textbox');

    await expect.element(input).toHaveAttribute('aria-invalid', 'false');
    await expect.element(input).toBeValid();
  });

  test('an error marks it as invalid, with the error as its message', async () => {
    await render(<Input error="Enter a value" />);
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
    await render(<Input ref={ref} error="Enter a value" />);

    expect(ref.current?.validationMessage).toBe('Enter a value');
  });
});
