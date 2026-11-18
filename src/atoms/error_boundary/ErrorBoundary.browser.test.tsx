import type { JSX } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import ErrorBoundary, {
  type ErrorBoundaryFallbackProps,
} from './ErrorBoundary';

function ErrorButton(): JSX.Element {
  throw new Error('test error');
}

/** Shows the message of the error, and the component stack from its info. */
function Details({ error, info }: ErrorBoundaryFallbackProps): JSX.Element {
  return (
    <>
      <p>{error instanceof Error ? error.message : `${error}`}</p>
      <pre>{info?.componentStack}</pre>
    </>
  );
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

  test('gives its fallback the error which was thrown', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    await render(
      <ErrorBoundary fallback={Details}>
        <ErrorButton />
      </ErrorBoundary>
    );

    await expect.element(page.getByText('test error')).toBeVisible();

    error.mockRestore();
  });

  test("gives its fallback React's info about the error, such as the component stack", async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    await render(
      <ErrorBoundary fallback={Details}>
        <ErrorButton />
      </ErrorBoundary>
    );

    await expect.element(page.getByText(/at ErrorButton/)).toBeVisible();

    error.mockRestore();
  });

  // anything can be thrown, so the error itself does not tell whether one was
  test('renders its fallback for anything thrown, even undefined', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    function ThrowsUndefined(): JSX.Element {
      throw undefined;
    }

    await render(
      <ErrorBoundary fallback={Details}>
        <p>test content</p>
        <ThrowsUndefined />
      </ErrorBoundary>
    );

    await expect.element(page.getByText('undefined')).toBeVisible();
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
