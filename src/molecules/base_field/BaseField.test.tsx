import { render, screen } from '@testing-library/react';

import { BaseField } from '.';
import { Input } from '../../atoms/input';
import { Label } from '../../atoms/label';

describe('BaseField default behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    render(
      <BaseField>
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );
  });

  test('dont render alert unless error is sent inn', () => {
    const { rerender, container } = render(
      <BaseField>
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const errorNotMounted = container.querySelector('[aria-live="polite"]');
    expect(errorNotMounted).toBeNull();

    rerender(
      <BaseField error="some error">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const errorMounted = container.querySelector('[aria-live="assertive"]');
    expect(errorMounted).not.toBeNull();
  });

  test('input is invalid if error is sent in', () => {
    render(
      <BaseField error="some error">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('has aria-describedby when error exist', () => {
    const { rerender, container } = render(
      <BaseField>
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-describedby');

    rerender(
      <BaseField error="some error">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    jest.runAllTimers();

    const error = container.querySelector('[aria-live="assertive"]');
    expect(error).not.toBeNull();

    const errorId = (error as Element).getAttribute('id');
    expect(input).toHaveAttribute('aria-describedby', errorId);
  });

  test('additional aria-describedby is concattenated', () => {
    const { container } = render(
      <BaseField error="some error" aria-describedby="anotherId">
        <Label>Some label</Label>
        <Input />
      </BaseField>
    );

    jest.runAllTimers();

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');
    const descriptions = input.getAttribute('aria-describedby');
    const alert = container.querySelector('[aria-live="assertive"]');

    expect(descriptions?.split(' ')).toHaveLength(2);
    expect(descriptions).toContain(alert?.id);
    expect(descriptions).toContain('anotherId');
  });

  test("Input's internal aria-describedby is preserved", () => {
    const { container } = render(
      <BaseField error="some error" aria-describedby="anotherId">
        <Label>Some Label</Label>
        <Input postfix="😁" />
      </BaseField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');
    const descriptions = input.getAttribute('aria-describedby');
    expect(descriptions?.split(' ')).toHaveLength(3);

    const alert = container.querySelector('[aria-live="assertive"]');
    const postfix = container.querySelector('span');

    expect(descriptions).toContain(alert?.id);
    expect(descriptions).toContain(postfix?.id);
    expect(descriptions).toContain('anotherId');
  });
});
