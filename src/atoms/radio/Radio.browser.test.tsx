import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field } from '../field';
import Radio from './Radio';

describe('Radio general behavior', () => {
  test('renders as input', async () => {
    await render(<Radio />);
    const radio = page.getByRole('radio');
    expect(radio.element().nodeName).toBe('INPUT');
  });

  test('is of type "radio"', async () => {
    await render(<Radio />);
    const radio = page.getByRole('radio');
    await expect.element(radio).toHaveAttribute('type', 'radio');
  });

  test('not checked initially', async () => {
    await render(<Radio />);
    const radio = page.getByRole('radio');
    await expect.element(radio).not.toBeChecked();
  });

  test('is checked after click', async () => {
    await render(<Radio />);
    const radio = page.getByRole('radio');

    await userEvent.click(radio);
    await expect.element(radio).toBeChecked();
  });

  test('refs are attached to DOM element', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Radio ref={ref} checked onChange={vi.fn()} />);

    expect(ref.current).not.toBeNull();
    await expect.element(ref.current).toBeChecked();
  });

  test('has "id" when wrapped by "Field"', async () => {
    await render(
      <Field>
        <Radio />
      </Field>
    );
    const element = page.getByRole('radio');
    await expect.element(element).toHaveAttribute('id');
  });
});
