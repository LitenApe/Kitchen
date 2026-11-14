import type { JSX } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import ErrorBoundary from './ErrorBoundary';

function ErrorButton(): JSX.Element {
  throw new Error('test error');
}

describe('ErrorBoundary default behavior', () => {
  test('renders without crashing', async () => {
    await render(
      <ErrorBoundary fallback={() => <></>}>
        <p>child</p>
      </ErrorBoundary>
    );
  });

  test('renders children by default', async () => {
    await render(
      <ErrorBoundary fallback={() => <></>}>
        <p>test content</p>
      </ErrorBoundary>
    );

    await expect.element(page.getByText('test content')).toBeInTheDocument();
  });

  test('renders fallback on error', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    await render(
      <ErrorBoundary fallback={() => <p>fallback component rendered</p>}>
        <p>test content</p>
        <ErrorButton />
      </ErrorBoundary>
    );

    await expect
      .element(page.getByText('fallback component rendered'))
      .toBeInTheDocument();
    await expect
      .element(page.getByText('test content'))
      .not.toBeInTheDocument();

    error.mockRestore();
  });

  test('logger is invoked on error', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mock = vi.fn();
    await render(
      <ErrorBoundary logger={mock} fallback={() => <></>}>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(mock).toHaveBeenCalledExactlyOnceWith(
      new Error('test error'),
      expect.objectContaining({ componentStack: expect.any(String) })
    );

    error.mockRestore();
  });
});
