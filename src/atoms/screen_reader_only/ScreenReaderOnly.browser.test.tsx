import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { ScreenReaderOnly } from '.';

/** How much of the element can be seen, as its size and what is clipped. */
function getShownArea(element: Element) {
  const { width, height } = element.getBoundingClientRect();
  return { width, height, clipPath: getComputedStyle(element).clipPath };
}

describe('ScreenReaderOnly general behavior', () => {
  test('is read by screen readers, such as for the name of a button', async () => {
    await render(
      <button>
        <span aria-hidden="true">✕</span>
        <ScreenReaderOnly>Close</ScreenReaderOnly>
      </button>
    );

    await expect
      .element(page.getByRole('button', { name: 'Close' }))
      .toBeVisible();
  });

  test('can describe another element', async () => {
    await render(
      <>
        <a href="/terms" aria-describedby="new-tab">
          Terms
        </a>
        <ScreenReaderOnly id="new-tab">Opens in a new tab</ScreenReaderOnly>
      </>
    );

    await expect
      .element(page.getByRole('link', { name: 'Terms' }))
      .toHaveAccessibleDescription('Opens in a new tab');
  });

  test('takes up no room next to the content around it', async () => {
    await render(
      <>
        <span data-testid="with">
          Visible
          <ScreenReaderOnly>
            , followed by a long text which only screen readers read
          </ScreenReaderOnly>
        </span>
        <br />
        <span data-testid="without">Visible</span>
      </>
    );
    const widthOf = (id: string) =>
      page.getByTestId(id).element().getBoundingClientRect().width;

    expect(widthOf('with')).toBe(widthOf('without'));
  });

  test('shows no more than a single pixel, which is clipped away', async () => {
    await render(
      <ScreenReaderOnly data-testid="hidden">Close</ScreenReaderOnly>
    );
    const { width, height, clipPath } = getShownArea(
      page.getByTestId('hidden').element()
    );

    expect(width).toBeLessThanOrEqual(1);
    expect(height).toBeLessThanOrEqual(1);
    expect(clipPath).toBe('inset(50%)');
  });

  // styles given to the element for other reasons must not reveal it
  test('stays hidden when given styles of its own', async () => {
    await render(
      <ScreenReaderOnly
        data-testid="hidden"
        style={{
          position: 'static',
          width: 'auto',
          height: 'auto',
          clipPath: 'none',
        }}
      >
        Close
      </ScreenReaderOnly>
    );
    const { width, height, clipPath } = getShownArea(
      page.getByTestId('hidden').element()
    );

    expect(width).toBeLessThanOrEqual(1);
    expect(height).toBeLessThanOrEqual(1);
    expect(clipPath).toBe('inset(50%)');
  });

  test('renders a span by default, so it can sit wherever text can', async () => {
    await render(
      <ScreenReaderOnly data-testid="hidden">Close</ScreenReaderOnly>
    );

    expect(page.getByTestId('hidden').element().nodeName).toBe('SPAN');
  });

  test('renders as the element given through "as"', async () => {
    await render(<ScreenReaderOnly as="h2">Filters</ScreenReaderOnly>);

    await expect
      .element(page.getByRole('heading', { name: 'Filters', level: 2 }))
      .toBeInTheDocument();
  });

  test('keeps hiding its content when given a class name', async () => {
    await render(
      <ScreenReaderOnly data-testid="hidden" className="custom">
        Close
      </ScreenReaderOnly>
    );
    const hidden = page.getByTestId('hidden');

    await expect.element(hidden).toHaveClass('custom');
    expect(getShownArea(hidden.element()).clipPath).toBe('inset(50%)');
  });
});
