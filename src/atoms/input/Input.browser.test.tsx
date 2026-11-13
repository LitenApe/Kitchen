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

  test('renders as "textarea" when specified', async () => {
    await render(<Input as="textarea" />);
    const element = page.getByRole('textbox');
    expect(element.element().nodeName).toBe('TEXTAREA');
  });

  test('has type "text" by default', async () => {
    await render(<Input />);
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('type', 'text');
  });

  test('has no type if rendered as textarea', async () => {
    await render(<Input as="textarea" />);
    const element = page.getByRole('textbox');
    await expect.element(element).not.toHaveAttribute('type');
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

  test('renders JSX prefix', async () => {
    await render(<Input postfix={<span data-testid="test-container" />} />);
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
});
