import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Backdrop } from '.';

describe('Backdrop general behavior', () => {
  test('renders without crashing', async () => {
    await render(<Backdrop />);
  });

  test('renders when "visible" is "true"', async () => {
    const { rerender } = await render(
      <Backdrop data-testid="test-element" visible />
    );

    const backdrop = page.getByTestId('test-element');
    await expect.element(backdrop).toBeInTheDocument();
    await rerender(<Backdrop data-testid="test-element" />);
    await expect.element(backdrop).not.toBeInTheDocument();
  });
});
