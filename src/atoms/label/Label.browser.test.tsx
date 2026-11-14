import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Field } from '../field';

import Label from './Label';

describe('Label general behavior', () => {
  test('renders its children', async () => {
    await render(<Label>Name</Label>);
    await expect.element(page.getByText('Name')).toBeInTheDocument();
  });

  test('points at nothing outside "Field"', async () => {
    await render(<Label data-testid="test-component" />);
    const label = page.getByTestId('test-component');
    await expect.element(label).not.toHaveAttribute('for');
  });

  test('points at the control of its "Field"', async () => {
    await render(
      <Field id="control">
        <Label data-testid="test-component" />
      </Field>
    );
    const label = page.getByTestId('test-component');
    await expect.element(label).toHaveAttribute('for', 'control');
  });

  test('uses its own "htmlFor" over the one from "Field"', async () => {
    await render(
      <Field id="control">
        <Label htmlFor="test-id" data-testid="test-component" />
      </Field>
    );
    const label = page.getByTestId('test-component');
    await expect.element(label).toHaveAttribute('for', 'test-id');
  });

  test('keeps pointing at the control when given an id of its own', async () => {
    await render(
      <Field id="control">
        <Label id="label" data-testid="test-component" />
      </Field>
    );
    const label = page.getByTestId('test-component');
    await expect.element(label).toHaveAttribute('id', 'label');
    await expect.element(label).toHaveAttribute('for', 'control');
  });

  test('can be focused programmatically', async () => {
    await render(<Label data-testid="test-component">Name</Label>);
    const label = page.getByTestId('test-component').element();

    label.focus();

    expect(document.activeElement).toBe(label);
  });
});
