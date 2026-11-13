import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field, FieldContext } from '.';

describe('Field general behaviour', () => {
  test('renders without crashing', async () => {
    await render(<Field></Field>);
  });

  test('Field provides an id', async () => {
    await render(
      <Field>
        <FieldContext.Consumer>
          {({ getFieldProps }) => (
            <input {...getFieldProps({})} data-testid="test" />
          )}
        </FieldContext.Consumer>
      </Field>
    );
    const input = page.getByTestId('test');
    expect(input.element().id).not.toBeUndefined();
  });

  test('Field prefixes provided id with "form-field"', async () => {
    await render(
      <Field>
        <FieldContext.Consumer>
          {({ getFieldProps }) => (
            <input {...getFieldProps({})} data-testid="test" />
          )}
        </FieldContext.Consumer>
      </Field>
    );
    const input = page.getByTestId('test');
    expect(input.element().id).toMatch(/form-field/);
  });

  test('Props is forwarded', async () => {
    const mock = vi.fn();
    await render(
      <Field onChange={mock}>
        <FieldContext.Consumer>
          {({ getFieldProps }) => (
            <input {...getFieldProps({})} data-testid="test" />
          )}
        </FieldContext.Consumer>
      </Field>
    );
    const input = page.getByTestId('test');

    expect(mock).not.toHaveBeenCalled();

    const testInput = 'cats looming in the shadow';
    await userEvent.type(input, testInput);

    expect(mock).toHaveBeenCalledTimes(testInput.length);
  });
});
