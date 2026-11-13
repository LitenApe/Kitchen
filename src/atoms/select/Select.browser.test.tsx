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
      .elements() as Array<HTMLOptionElement>;

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
      .elements() as Array<HTMLOptionElement>;
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(true);
  });
});
