import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import Legend from './Legend';

describe('Legend default behavior', () => {
  test('renders without crashing', async () => {
    await render(<Legend></Legend>);
  });

  test('renders children', async () => {
    await render(<Legend>text content</Legend>);
    await expect.element(page.getByText('text content')).toBeInTheDocument();
  });

  test('names the group it belongs to', async () => {
    await render(
      <fieldset>
        <Legend>Size</Legend>
      </fieldset>
    );

    await expect
      .element(page.getByRole('group', { name: 'Size' }))
      .toBeInTheDocument();
  });

  test('attaches its ref and passes other props to the legend', async () => {
    const ref = createRef<HTMLLegendElement>();
    await render(
      <Legend ref={ref} className="custom">
        text content
      </Legend>
    );
    const legend = page.getByText('text content');

    expect(ref.current).toBe(legend.element());
    await expect.element(legend).toHaveClass('custom');
  });
});
