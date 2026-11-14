import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field, FieldContext } from '.';
import { Input } from '../input';
import { Label } from '../label';

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
    expect(input.element().id).not.toBe('');
  });

  test('Field provides its own id when given one', async () => {
    await render(
      <Field id="custom-id">
        <FieldContext.Consumer>
          {({ getFieldProps }) => (
            <input {...getFieldProps({})} data-testid="test" />
          )}
        </FieldContext.Consumer>
      </Field>
    );
    const input = page.getByTestId('test');
    expect(input.element().id).toBe('custom-id');
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

  test("a control's own props take precedence over the field's", async () => {
    await render(
      <Field name="field">
        <FieldContext.Consumer>
          {({ getFieldProps }) => (
            <input {...getFieldProps({ name: 'own' })} data-testid="test" />
          )}
        </FieldContext.Consumer>
      </Field>
    );

    await expect
      .element(page.getByTestId('test'))
      .toHaveAttribute('name', 'own');
  });

  test('links its label to its control', async () => {
    await render(
      <Field>
        <Label>Name</Label>
        <Input />
      </Field>
    );

    expect(page.getByLabelText('Name').element()).toBe(
      page.getByRole('textbox').element()
    );
  });

  test("keeps its aria-describedby next to a control's own", async () => {
    await render(
      <Field aria-describedby="error">
        <Input aria-describedby="hint" />
      </Field>
    );

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('aria-describedby', 'error hint');
  });
});
