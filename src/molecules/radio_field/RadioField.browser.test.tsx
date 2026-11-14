import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { RadioField } from '.';

const options = [
  { label: 'Small', value: 'small' },
  { label: 'Large', value: 'large' },
];

describe('RadioField general behavior', () => {
  test('labels its group with a legend', async () => {
    await render(<RadioField name="size" label="Size" options={options} />);

    await expect
      .element(page.getByRole('radiogroup', { name: 'Size' }))
      .toBeInTheDocument();
  });

  test('renders a labelled radio for every option', async () => {
    await render(<RadioField name="size" label="Size" options={options} />);

    await expect
      .element(page.getByLabelText('Small'))
      .toHaveAttribute('value', 'small');
    await expect
      .element(page.getByLabelText('Large'))
      .toHaveAttribute('value', 'large');
  });

  test('lets only one radio be chosen at a time', async () => {
    await render(<RadioField name="size" label="Size" options={options} />);
    const small = page.getByLabelText('Small');
    const large = page.getByLabelText('Large');

    await userEvent.click(small);
    await userEvent.click(large);

    await expect.element(small).not.toBeChecked();
    await expect.element(large).toBeChecked();
  });

  test('does not require a choice by default', async () => {
    await render(<RadioField name="size" label="Size" options={options} />);

    expect(page.getByLabelText('Small').element().matches(':invalid')).toBe(
      false
    );
    await expect
      .element(page.getByRole('radiogroup'))
      .not.toHaveAttribute('aria-required');
  });

  test('requires one of the radios to be chosen when required', async () => {
    await render(
      <RadioField name="size" label="Size" options={options} required />
    );
    const small = page.getByLabelText('Small').element();
    expect(small.matches(':invalid')).toBe(true);

    await userEvent.click(page.getByLabelText('Large'));

    expect(small.matches(':invalid')).toBe(false);
  });

  test('tells screen readers that the group is required when required', async () => {
    await render(
      <RadioField name="size" label="Size" options={options} required />
    );

    await expect
      .element(page.getByRole('radiogroup'))
      .toHaveAttribute('aria-required', 'true');
  });

  test("passes each option's own props on to its radio", async () => {
    await render(
      <RadioField
        name="size"
        label="Size"
        options={[
          { label: 'Small', value: 'small' },
          { label: 'Large', value: 'large', disabled: true },
        ]}
      />
    );

    await expect.element(page.getByLabelText('Small')).not.toBeDisabled();
    await expect.element(page.getByLabelText('Large')).toBeDisabled();
  });

  test('attaches its ref to the group', async () => {
    const ref = createRef<HTMLFieldSetElement>();
    await render(
      <RadioField name="size" label="Size" options={options} ref={ref} />
    );

    expect(ref.current).toBe(page.getByRole('radiogroup').element());
  });

  test('shows an error, which marks the group as invalid and describes it', async () => {
    await render(
      <RadioField
        name="size"
        label="Size"
        options={options}
        error="Choose a size"
      />
    );

    // the alert defers its content, so wait for it to appear
    const error = page.getByText('Choose a size');
    await expect.element(error).toBeInTheDocument();

    const group = page.getByRole('radiogroup');
    await expect.element(group).toHaveAttribute('aria-invalid', 'true');
    await expect
      .element(group)
      .toHaveAttribute('aria-describedby', error.element().id);
  });

  test('an error keeps the radios from being submitted, without marking them', async () => {
    await render(
      <RadioField
        name="size"
        label="Size"
        options={options}
        error="Choose a size"
      />
    );

    for (const radio of page.getByRole('radio').elements()) {
      expect(radio).not.toHaveAttribute('aria-invalid');
      expect(radio).toHaveProperty('validationMessage', 'Choose a size');
    }
  });

  // Every radio is wrapped in a field of its own, which hides the field that
  // RadioField shares its props through, as described under Project Status
  // in the README. Only the group, which sits outside those fields, sees the
  // error. These tests start failing once that is fixed.
  describe('known issues', () => {
    test.fails('disables the radios when disabled', async () => {
      await render(
        <RadioField name="size" label="Size" options={options} disabled />
      );

      expect(page.getByLabelText('Small').element()).toBeDisabled();
    });

    test.fails('calls onChange when a radio is chosen', async () => {
      const onChange = vi.fn();
      await render(
        <RadioField
          name="size"
          label="Size"
          options={options}
          onChange={onChange}
        />
      );

      await userEvent.click(page.getByLabelText('Small'));

      expect(onChange).toHaveBeenCalled();
    });
  });
});
