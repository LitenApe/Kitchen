import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Option from './Option';

describe('Option general behavior', () => {
  test('renders an option with its label and value', async () => {
    await render(
      <select>
        <Option value="fujifilm">Fujifilm</Option>
      </select>
    );

    await expect
      .element(page.getByRole('option', { name: 'Fujifilm' }))
      .toHaveAttribute('value', 'fujifilm');
  });

  test('attaches its ref to the option', async () => {
    const ref = createRef<HTMLOptionElement>();
    await render(
      <select>
        <Option ref={ref} value="fujifilm">
          Fujifilm
        </Option>
      </select>
    );

    expect(ref.current).toBe(page.getByRole('option').element());
  });
});
