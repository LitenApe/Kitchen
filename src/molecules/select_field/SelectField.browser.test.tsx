import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { SelectField } from '.';
import { Option } from '../../atoms/select';

const options = [
  { label: 'Fujifilm', value: 'fujifilm' },
  { label: 'Phase One', value: 'phase-one' },
];

function Leica() {
  return <Option value="leica">Leica</Option>;
}

function Hasselblad() {
  return <Option value="hasselblad">Hasselblad</Option>;
}

describe('SelectField general behavior', () => {
  test('labels its select', async () => {
    await render(<SelectField label="Camera" options={options} />);

    expect(page.getByLabelText('Camera').element()).toBeInstanceOf(
      HTMLSelectElement
    );
  });

  test('renders an option for every entry', async () => {
    await render(<SelectField label="Camera" options={options} />);

    await expect
      .element(page.getByRole('option', { name: 'Fujifilm' }))
      .toHaveAttribute('value', 'fujifilm');
    await expect
      .element(page.getByRole('option', { name: 'Phase One' }))
      .toHaveAttribute('value', 'phase-one');
  });

  test('renders components given as options', async () => {
    await render(
      <SelectField label="Camera" options={[...options, Leica, Hasselblad]} />
    );

    await expect
      .element(page.getByRole('option', { name: 'Leica' }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('option', { name: 'Hasselblad' }))
      .toBeInTheDocument();
  });

  // an option keyed by its value is moved rather than overwritten
  test('keeps each option when the options are reordered', async () => {
    const { rerender } = await render(
      <SelectField label="Camera" options={options} />
    );
    const fujifilm = page.getByRole('option', { name: 'Fujifilm' }).element();

    await rerender(
      <SelectField label="Camera" options={[...options].reverse()} />
    );

    expect(page.getByRole('option', { name: 'Fujifilm' }).element()).toBe(
      fujifilm
    );
  });

  test('calls onChange when an option is chosen', async () => {
    const onChange = vi.fn();
    await render(
      <SelectField label="Camera" options={options} onChange={onChange} />
    );
    const select = page.getByLabelText('Camera');

    await userEvent.selectOptions(select, 'phase-one');

    expect(onChange).toHaveBeenCalledTimes(1);
    await expect.element(select).toHaveValue('phase-one');
  });

  test('attaches its ref to the select', async () => {
    const ref = createRef<HTMLSelectElement>();
    await render(<SelectField label="Camera" options={options} ref={ref} />);

    expect(ref.current).toBe(page.getByLabelText('Camera').element());
  });

  test('shows an error, which marks the select as invalid and describes it', async () => {
    await render(
      <SelectField label="Camera" options={options} error="Pick a camera" />
    );

    // the alert defers its content, so wait for it to appear
    const error = page.getByText('Pick a camera');
    await expect.element(error).toBeInTheDocument();

    const select = page.getByLabelText('Camera');
    await expect.element(select).toHaveAttribute('aria-invalid', 'true');
    await expect
      .element(select)
      .toHaveAttribute('aria-describedby', error.element().id);
  });
});
