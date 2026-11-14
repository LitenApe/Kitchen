import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import OptionGroup from './OptionGroup';

describe('OptionGroup general behavior', () => {
  test('groups its options under its label', async () => {
    await render(
      <select>
        <OptionGroup label="Japanese">
          <option>Fujifilm</option>
        </OptionGroup>
      </select>
    );

    const option = page.getByRole('option', { name: 'Fujifilm' }).element();
    expect(option.closest('optgroup')?.label).toBe('Japanese');
  });

  test('attaches its ref to the group', async () => {
    const ref = createRef<HTMLOptGroupElement>();
    await render(
      <select>
        <OptionGroup ref={ref} label="Japanese" />
      </select>
    );

    expect(ref.current).toBeInstanceOf(HTMLOptGroupElement);
    expect(ref.current?.label).toBe('Japanese');
  });
});
