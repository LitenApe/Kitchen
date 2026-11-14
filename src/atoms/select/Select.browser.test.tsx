import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Option, OptionGroup, Select } from '.';

import { Field } from '../field';

describe('Select default behavior', () => {
  test('renders without crashing', async () => {
    await render(<Select />);
  });

  test('renders with id', async () => {
    await render(
      <Field>
        <Select data-testid="test-component" />
      </Field>
    );

    const dropdown = page.getByTestId('test-component');
    await expect.element(dropdown).toHaveAttribute('id');
  });

  test('call onChange on option click', async () => {
    const mock = vi.fn();

    await render(
      <Select onChange={mock} data-testid="test-component">
        <OptionGroup label="japanese">
          <Option value="fujifilm">Fujifilm</Option>
        </OptionGroup>
        <Option value="phase-one">Phase One</Option>
      </Select>
    );

    const dropdown = page.getByTestId('test-component');

    expect(mock).not.toHaveBeenCalled();
    await userEvent.selectOptions(dropdown, ['phase-one']);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('selected value is present in change event', async () => {
    const mock = vi.fn();

    await render(
      <Select onChange={mock} data-testid="test-component">
        <OptionGroup label="japanese">
          <Option value="fujifilm">Fujifilm</Option>
        </OptionGroup>
        <Option value="phase-one">Phase One</Option>
      </Select>
    );

    const options = page
      .getByRole('option')
      .elements()
      .filter((element) => element instanceof HTMLOptionElement);

    const dropdown = page.getByTestId('test-component');
    await userEvent.selectOptions(dropdown, ['phase-one']);

    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
  });

  test('select multiple value is present in change event', async () => {
    const mock = vi.fn();

    await render(
      <Select onChange={mock} data-testid="test-component" multiple>
        <OptionGroup label="japanese">
          <Option value="fujifilm">Fujifilm</Option>
        </OptionGroup>
        <Option value="phase-one">Phase One</Option>
      </Select>
    );

    const dropdown = page.getByTestId('test-component');
    await userEvent.selectOptions(dropdown, ['fujifilm', 'phase-one']);
    // a real browser selects all options at once and emits one change event
    expect(mock).toHaveBeenCalledTimes(1);

    const options = page
      .getByRole('option')
      .elements()
      .filter((element) => element instanceof HTMLOptionElement);
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(true);
  });

  test('is valid without an error', async () => {
    await render(<Select data-testid="test-component" />);
    const dropdown = page.getByTestId('test-component');

    await expect.element(dropdown).toHaveAttribute('aria-invalid', 'false');
    await expect.element(dropdown).toBeValid();
  });

  test('an error marks it as invalid, with the error as its message', async () => {
    await render(<Select data-testid="test-component" error="Pick a camera" />);
    const dropdown = page.getByTestId('test-component');

    await expect.element(dropdown).toHaveAttribute('aria-invalid', 'true');
    await expect.element(dropdown).not.toHaveAttribute('error');
    expect(dropdown.element()).toHaveProperty(
      'validationMessage',
      'Pick a camera'
    );
  });

  test('keeps its error message when given a ref', async () => {
    const ref = createRef<HTMLSelectElement>();
    await render(<Select ref={ref} error="Pick a camera" />);

    expect(ref.current?.validationMessage).toBe('Pick a camera');
  });

  test('takes props from "Field", where its own props take precedence', async () => {
    await render(
      <Field name="field" error="Pick a camera">
        <Select data-testid="test-component" name="own" />
      </Field>
    );
    const dropdown = page.getByTestId('test-component');

    await expect.element(dropdown).toHaveAttribute('name', 'own');
    await expect.element(dropdown).toHaveAttribute('aria-invalid', 'true');
  });
});
