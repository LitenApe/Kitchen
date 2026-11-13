import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { BaseField } from '.';
import { Input } from '../../atoms/input';
import { Label } from '../../atoms/label';

describe('BaseField default behavior', () => {
  test('renders without crashing', async () => {
    await render(
      <BaseField>
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );
  });

  test('dont render alert unless error is sent inn', async () => {
    const { rerender, container } = await render(
      <BaseField>
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const errorNotMounted = container.querySelector('[aria-live="polite"]');
    expect(errorNotMounted).toBeNull();

    await rerender(
      <BaseField error="some error">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const errorMounted = container.querySelector('[aria-live="assertive"]');
    expect(errorMounted).not.toBeNull();
  });

  test('input is invalid if error is sent in', async () => {
    await render(
      <BaseField error="some error">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('has aria-describedby when error exist', async () => {
    const { rerender, container } = await render(
      <BaseField>
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const input = page.getByRole('textbox');
    await expect.element(input).not.toHaveAttribute('aria-describedby');

    await rerender(
      <BaseField error="some error">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const error = container.querySelector('[aria-live="assertive"]');
    expect(error).not.toBeNull();

    const errorId = (error as Element).getAttribute('id');
    await expect.element(input).toHaveAttribute('aria-describedby', errorId);
  });

  test('additional aria-describedby is concattenated', async () => {
    const { container } = await render(
      <BaseField error="some error" aria-describedby="anotherId">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('aria-describedby');
    const descriptions = input.element().getAttribute('aria-describedby');
    const alert = container.querySelector('[aria-live="assertive"]');

    expect(descriptions?.split(' ')).toHaveLength(2);
    expect(descriptions).toContain(alert?.id);
    expect(descriptions).toContain('anotherId');
  });

  test("Input's internal aria-describedby is preserved", async () => {
    const { container } = await render(
      <BaseField error="some error" aria-describedby="anotherId">
        <Label>Some Label</Label>
        <Input postfix="😁" />
      </BaseField>
    );

    const input = page.getByRole('textbox');
    await expect.element(input).toHaveAttribute('aria-describedby');
    const descriptions = input.element().getAttribute('aria-describedby');
    expect(descriptions?.split(' ')).toHaveLength(3);

    const alert = container.querySelector('[aria-live="assertive"]');
    const postfix = container.querySelector('span');

    expect(descriptions).toContain(alert?.id);
    expect(descriptions).toContain(postfix?.id);
    expect(descriptions).toContain('anotherId');
  });
});
