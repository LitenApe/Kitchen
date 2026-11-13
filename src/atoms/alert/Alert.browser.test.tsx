import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Alert } from '.';

describe('Alert general behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders without crashing', async () => {
    await render(<Alert></Alert>);
  });

  test('content is deferred', async () => {
    await render(<Alert data-testid="test-alert">alert message content</Alert>);
    const container = page.getByTestId('test-alert');
    await expect.element(container).toBeEmptyDOMElement();
  });

  test('content is mounted after timer runs out', async () => {
    await render(<Alert data-testid="test-alert">alert message content</Alert>);
    const container = page.getByTestId('test-alert');
    await expect.element(container).toBeEmptyDOMElement();

    vi.runAllTimers();

    await expect.element(container).not.toBeEmptyDOMElement();
    await expect.element(container).toHaveTextContent('alert message content');
  });
});
