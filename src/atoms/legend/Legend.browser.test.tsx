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
});
