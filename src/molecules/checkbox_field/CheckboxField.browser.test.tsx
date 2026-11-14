import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { CheckboxField } from '.';

describe('CheckboxField default behaviour', () => {
  test('renders without crashing', async () => {
    await render(<CheckboxField label="field" />);
  });

  test('label is associated with checkbox', async () => {
    await render(<CheckboxField label="field" />);
    const checkbox = page.getByLabelText('field');
    await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('onClick is invoked on click', async () => {
    const mockFn = vi.fn();
    await render(<CheckboxField label="field" onClick={mockFn} />);
    const checkbox = page.getByLabelText('field');

    expect(mockFn).not.toHaveBeenCalled();
    await userEvent.click(checkbox);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('error is associated with input', async () => {
    const errorText = 'This is an error';
    await render(<CheckboxField label="field" error={errorText} />);

    // the alert defers its content, so wait for it to appear
    const errorBox = page.getByText(errorText);
    await expect.element(errorBox).toBeInTheDocument();

    const checkbox = page.getByLabelText('field');
    await expect
      .element(checkbox)
      .toHaveAttribute('aria-describedby', errorBox.element().id);
  });

  test('error marks the checkbox as invalid', async () => {
    await render(<CheckboxField label="field" error="This is an error" />);

    await expect
      .element(page.getByLabelText('field'))
      .toHaveAttribute('aria-invalid', 'true');
  });

  test('ref is attached to the checkbox', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<CheckboxField label="field" ref={ref} />);

    expect(ref.current).toBe(page.getByLabelText('field').element());
  });
});
