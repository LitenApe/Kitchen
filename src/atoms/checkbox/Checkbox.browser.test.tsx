import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Checkbox from './Checkbox';

describe('Radio general behavior', () => {
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
});
