import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Backdrop } from '.';

describe('Backdrop general behavior', () => {
  test('renders without crashing', async () => {
    await render(<Backdrop />);
  });

  test('renders its children', async () => {
    await render(
      <Backdrop visible>
        <p>dialog</p>
      </Backdrop>
    );

    await expect.element(page.getByText('dialog')).toBeInTheDocument();
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

  test('keeps its own styling when given a class name', async () => {
    await render(
      <Backdrop data-testid="test-element" className="custom" visible />
    );

    const backdrop = page.getByTestId('test-element');
    await expect.element(backdrop).toHaveClass('custom');
    await expect.element(backdrop).toHaveStyle({ position: 'fixed' });
  });

  test('keeps its own styling when given a style', async () => {
    await render(
      <Backdrop
        data-testid="test-element"
        style={{ backgroundColor: 'rgb(255, 0, 0)' }}
        visible
      />
    );

    await expect.element(page.getByTestId('test-element')).toHaveStyle({
      position: 'fixed',
      backgroundColor: 'rgb(255, 0, 0)',
    });
  });
});
