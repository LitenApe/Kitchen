import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Field } from '../field';
import { Label } from '../label';
import Textarea from './Textarea';

describe('Textarea general behavior', () => {
  test('renders a textarea', async () => {
    await render(<Textarea />);
    expect(page.getByRole('textbox').element().nodeName).toBe('TEXTAREA');
  });

  test('is linked to the label of its "Field"', async () => {
    await render(
      <Field>
        <Label>Message</Label>
        <Textarea />
      </Field>
    );

    expect(page.getByLabelText('Message').element().nodeName).toBe('TEXTAREA');
  });

  test('its own id takes precedence over the one from "Field"', async () => {
    await render(
      <Field>
        <Textarea id="own" />
      </Field>
    );

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('id', 'own');
  });

  test('takes props from "Field", where its own props take precedence', async () => {
    await render(
      <Field name="field" placeholder="field" error="Enter a message">
        <Textarea placeholder="own" />
      </Field>
    );
    const textarea = page.getByRole('textbox');

    await expect.element(textarea).toHaveAttribute('name', 'field');
    await expect.element(textarea).toHaveAttribute('placeholder', 'own');
    await expect.element(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  test('keeps the descriptions of its "Field" next to its own', async () => {
    await render(
      <Field aria-describedby="error">
        <Textarea aria-describedby="hint" />
      </Field>
    );

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('aria-describedby', 'error hint');
  });

  test('attaches its ref to the textarea', async () => {
    const ref = createRef<HTMLTextAreaElement>();
    await render(<Textarea ref={ref} />);

    expect(ref.current).toBe(page.getByRole('textbox').element());
  });

  test('is valid without an error', async () => {
    await render(<Textarea />);
    const textarea = page.getByRole('textbox');

    await expect.element(textarea).toHaveAttribute('aria-invalid', 'false');
    await expect.element(textarea).toBeValid();
  });

  test('an error marks it as invalid, with the error as its message', async () => {
    await render(<Textarea error="Enter a message" />);
    const textarea = page.getByRole('textbox');

    await expect.element(textarea).toHaveAttribute('aria-invalid', 'true');
    await expect.element(textarea).not.toHaveAttribute('error');
    expect(textarea.element()).toHaveProperty(
      'validationMessage',
      'Enter a message'
    );
  });

  test('keeps its error message when given a ref', async () => {
    const ref = createRef<HTMLTextAreaElement>();
    await render(<Textarea ref={ref} error="Enter a message" />);

    expect(ref.current?.validationMessage).toBe('Enter a message');
  });
});
