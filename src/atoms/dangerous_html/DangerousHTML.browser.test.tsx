import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import DangerousHTML from './DangerousHTML';

describe('DangerousHTML default behavior', () => {
  test('renders without crashing', async () => {
    await render(<DangerousHTML content="" />);
  });

  test('renders as "div" by default', async () => {
    await render(<DangerousHTML content="" data-testid="test-container" />);

    const container = page.getByTestId('test-container');
    expect(container.element().nodeName).toBe('DIV');
  });

  test('renders as "a" when specified', async () => {
    await render(
      <DangerousHTML as="a" content="" data-testid="test-container" />
    );

    const container = page.getByTestId('test-container');
    expect(container.element().nodeName).toBe('A');
  });

  test('renders HTML string as HTML', async () => {
    await render(
      <DangerousHTML content="<button id='test-id'>test</button>" />
    );

    const button = page.getByRole('button');
    await expect.element(button).toHaveTextContent('test');
    await expect.element(button).toHaveAttribute('id', 'test-id');
  });

  test('ref is forwarded properly', async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<DangerousHTML ref={ref} content="test-text" />);

    expect(ref.current).not.toBeNull();
    await expect.element(ref.current).toHaveTextContent('test-text');
  });

  test('replaces its HTML when the content changes', async () => {
    const { rerender } = await render(
      <DangerousHTML content="<p>first</p>" data-testid="test-container" />
    );
    await rerender(
      <DangerousHTML content="<p>second</p>" data-testid="test-container" />
    );
    const container = page.getByTestId('test-container');

    await expect.element(container).toHaveTextContent('second');
    await expect.element(container).not.toHaveTextContent('first');
  });
});
