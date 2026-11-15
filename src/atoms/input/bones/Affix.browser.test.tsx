import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Affix from './Affix';
import { InputLayout } from './getInputLayout';

describe('Affix general behavior', () => {
  test('renders its children, and its content with the given id', async () => {
    await render(
      <Affix id="unit" layout={InputLayout.Postfixed} content="kg">
        <input />
      </Affix>
    );
    const content = page.getByText('kg');

    await expect.element(page.getByRole('textbox')).toBeVisible();
    await expect.element(content).toBeVisible();
    await expect.element(content).toHaveAttribute('id', 'unit');
  });

  test('shows its content after its children when postfixed', async () => {
    await render(
      <Affix id="unit" layout={InputLayout.Postfixed} content="kg">
        <input />
      </Affix>
    );
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const content = page.getByText('kg').element().getBoundingClientRect();

    expect(content.left).toBeGreaterThanOrEqual(input.right);
  });

  test('shows its content before its children when prefixed', async () => {
    await render(
      <Affix id="currency" layout={InputLayout.Prefixed} content="€">
        <input />
      </Affix>
    );
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const content = page.getByText('€').element().getBoundingClientRect();

    expect(content.right).toBeLessThanOrEqual(input.left);
  });

  test('shows no content when plain', async () => {
    await render(
      <Affix id="unit" layout={InputLayout.Plain} content="kg">
        <input />
      </Affix>
    );

    await expect.element(page.getByRole('textbox')).toBeVisible();
    await expect.element(page.getByText('kg')).not.toBeInTheDocument();
  });

  // the input fills the flex container only if it is laid out as its child
  test('lays out its children as if they were not wrapped when plain', async () => {
    await render(
      <div style={{ display: 'flex', width: '300px' }}>
        <Affix id="unit" layout={InputLayout.Plain}>
          <input style={{ flexGrow: 1 }} />
        </Affix>
      </div>
    );
    const input = page.getByRole('textbox');

    await expect.element(input).toBeVisible();
    expect(input.element().getBoundingClientRect().width).toBe(300);
  });
});
