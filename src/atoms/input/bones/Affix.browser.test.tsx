import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Affix from './Affix';

describe('Affix general behavior', () => {
  test('renders its children, and its content with the given id', async () => {
    await render(
      <Affix id="unit" content="kg" placement="after">
        <input />
      </Affix>
    );

    await expect.element(page.getByRole('textbox')).toBeInTheDocument();
    await expect.element(page.getByText('kg')).toHaveAttribute('id', 'unit');
  });

  test('shows its content after its children when placed after', async () => {
    await render(
      <Affix id="unit" content="kg" placement="after">
        <input />
      </Affix>
    );
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const content = page.getByText('kg').element().getBoundingClientRect();

    expect(content.left).toBeGreaterThanOrEqual(input.right);
  });

  test('shows its content before its children when placed before', async () => {
    await render(
      <Affix id="currency" content="€" placement="before">
        <input />
      </Affix>
    );
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const content = page.getByText('€').element().getBoundingClientRect();

    expect(content.right).toBeLessThanOrEqual(input.left);
  });
});
