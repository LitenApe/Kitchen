import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Field } from '../field';
import Checkbox from './Checkbox';

describe('Checkbox general behavior', () => {
  test('renders as input', async () => {
    await render(<Checkbox data-testid="test-component" />);
    const checkbox = page.getByTestId('test-component');
    expect(checkbox.element().nodeName).toBe('INPUT');
  });

  test('is of type "checkbox"', async () => {
    await render(<Checkbox data-testid="test-component" />);
    const checkbox = page.getByTestId('test-component');
    await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('not checked initially', async () => {
    await render(<Checkbox data-testid="test-component" />);
    const checkbox = page.getByTestId('test-component');
    await expect.element(checkbox).not.toBeChecked();
  });

  test('is checked after click', async () => {
    await render(<Checkbox data-testid="test-component" />);
    const checkbox = page.getByTestId('test-component');

    await userEvent.click(checkbox);
    await expect.element(checkbox).toBeChecked();
  });

  test('refs are attached to DOM element', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Checkbox ref={ref} checked onChange={vi.fn()} />);

    expect(ref.current).not.toBeNull();
    await expect.element(ref.current).toBeChecked();
  });

  test('has "id" when wrapped by "Field"', async () => {
    await render(
      <Field>
        <Checkbox data-testid="test-component" />
      </Field>
    );

    await expect
      .element(page.getByTestId('test-component'))
      .toHaveAttribute('id');
  });

  test('takes props from "Field", where its own props take precedence', async () => {
    await render(
      <Field name="field" value="field" aria-invalid>
        <Checkbox data-testid="test-component" value="own" />
      </Field>
    );
    const checkbox = page.getByTestId('test-component');

    await expect.element(checkbox).toHaveAttribute('name', 'field');
    await expect.element(checkbox).toHaveAttribute('value', 'own');
    await expect.element(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  test('stays a checkbox when "Field" shares another type', async () => {
    await render(
      <Field type="text">
        <Checkbox data-testid="test-component" />
      </Field>
    );

    await expect
      .element(page.getByTestId('test-component'))
      .toHaveAttribute('type', 'checkbox');
  });
});
