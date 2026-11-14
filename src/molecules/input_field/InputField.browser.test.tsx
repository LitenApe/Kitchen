import { type Ref, createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { InputField } from '.';
import { Input } from '../../atoms/input';

describe('InputField general behavior', () => {
  test('labels its input', async () => {
    await render(<InputField label="Name" />);
    await expect
      .element(page.getByLabelText('Name'))
      .toHaveAttribute('type', 'text');
  });

  test('passes its props on to the input', async () => {
    const onChange = vi.fn();
    await render(
      <InputField label="Name" placeholder="Jane Doe" onChange={onChange} />
    );
    const input = page.getByLabelText('Name');

    await expect.element(input).toHaveAttribute('placeholder', 'Jane Doe');
    await userEvent.type(input, 'Jo');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('attaches its ref to the input', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<InputField label="Name" ref={ref} />);

    expect(ref.current).toBe(page.getByLabelText('Name').element());
  });

  test('shows an error, which marks the input as invalid and describes it', async () => {
    await render(<InputField label="Name" error="Enter your name" />);

    // the alert defers its content, so wait for it to appear
    const error = page.getByText('Enter your name');
    await expect.element(error).toBeInTheDocument();

    const input = page.getByLabelText('Name');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
    await expect
      .element(input)
      .toHaveAttribute('aria-describedby', error.element().id);
  });

  test('shows a prefix which describes the input', async () => {
    await render(<InputField label="Price" prefix="€" />);
    const prefix = page.getByText('€');

    await expect
      .element(page.getByLabelText('Price'))
      .toHaveAttribute('aria-describedby', prefix.element().id);
  });

  test('renders the component given through "as" in place of the input', async () => {
    function CustomInput({ ref }: { ref?: Ref<HTMLInputElement> }) {
      return <Input ref={ref} data-custom="" />;
    }
    const ref = createRef<HTMLInputElement>();
    await render(<InputField label="Name" as={CustomInput} ref={ref} />);
    const input = page.getByLabelText('Name');

    await expect.element(input).toHaveAttribute('data-custom');
    expect(ref.current).toBe(input.element());
  });
});
