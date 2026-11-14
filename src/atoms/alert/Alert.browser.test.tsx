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

  // expect.element advances fake timers while it retries, which would hide a
  // delay, so the tests below check the content straight after each step

  test('shows later changes straight away', async () => {
    const { rerender } = await render(
      <Alert data-testid="test-alert">first message</Alert>
    );
    const container = page.getByTestId('test-alert');

    vi.runAllTimers();
    await expect.element(container).toHaveTextContent('first message');

    await rerender(<Alert data-testid="test-alert">second message</Alert>);
    expect(container.element()).toHaveTextContent('second message');
  });

  test('re-rendering does not hold the content back', async () => {
    const createAlert = () => (
      <Alert data-testid="test-alert">
        <strong>alert message content</strong>
      </Alert>
    );
    const { rerender } = await render(createAlert());
    const container = page.getByTestId('test-alert');

    // a parent which re-renders every 50 ms creates new elements each time
    vi.advanceTimersByTime(50);
    await rerender(createAlert());
    vi.advanceTimersByTime(50);
    await rerender(createAlert());

    expect(container.element()).toHaveTextContent('alert message content');
  });

  test('is an assertive live region by default', async () => {
    await render(<Alert data-testid="test-alert">message</Alert>);
    const container = page.getByTestId('test-alert');

    await expect.element(container).toHaveAttribute('aria-live', 'assertive');
    await expect.element(container).toHaveAttribute('aria-atomic', 'true');
  });

  test('can be made polite', async () => {
    await render(
      <Alert data-testid="test-alert" aria-live="polite">
        message
      </Alert>
    );

    await expect
      .element(page.getByTestId('test-alert'))
      .toHaveAttribute('aria-live', 'polite');
  });

  test('renders as the element given through "as"', async () => {
    await render(
      <Alert as="p" data-testid="test-alert">
        message
      </Alert>
    );

    expect(page.getByTestId('test-alert').element().nodeName).toBe('P');
  });
});
