import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Descendant, useDescendant } from '.';

/**
 * Registers itself as a descendant, and exposes its index and the names of
 * its neighbours through data attributes.
 */
function TestComponent({ name }: { name: string }) {
  const { index, ref, next, prev } = useDescendant<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      data-testid={name}
      data-index={index}
      data-next={next()?.dataset.testid}
      data-next-no-loop={next(false)?.dataset.testid}
      data-prev={prev()?.dataset.testid}
      data-prev-no-loop={prev(false)?.dataset.testid}
    >
      {name}
    </p>
  );
}

describe('Descendant default behavior', () => {
  describe('Descendant', () => {
    test('renders without crashing', async () => {
      await render(<Descendant></Descendant>);
    });

    test('assigns a registered element an index', async () => {
      await render(
        <Descendant>
          <TestComponent name="first" />
        </Descendant>
      );

      const element = page.getByTestId('first');
      await expect.element(element).toHaveAttribute('data-index', '0');
    });

    test('elements are indexed in document order regardless of nesting', async () => {
      await render(
        <Descendant>
          <TestComponent name="first" />
          <div>
            <TestComponent name="second" />
          </div>
          <div>
            <div>
              <TestComponent name="third" />
            </div>
          </div>
          <TestComponent name="fourth" />
        </Descendant>
      );

      await expect
        .element(page.getByTestId('first'))
        .toHaveAttribute('data-index', '0');
      await expect
        .element(page.getByTestId('second'))
        .toHaveAttribute('data-index', '1');
      await expect
        .element(page.getByTestId('third'))
        .toHaveAttribute('data-index', '2');
      await expect
        .element(page.getByTestId('fourth'))
        .toHaveAttribute('data-index', '3');
    });

    test('indices are updated when an element is removed', async () => {
      const { rerender } = await render(
        <Descendant>
          <TestComponent key="first" name="first" />
          <TestComponent key="second" name="second" />
          <TestComponent key="third" name="third" />
        </Descendant>
      );

      await expect
        .element(page.getByTestId('third'))
        .toHaveAttribute('data-index', '2');

      await rerender(
        <Descendant>
          <TestComponent key="first" name="first" />
          <TestComponent key="third" name="third" />
        </Descendant>
      );

      await expect
        .element(page.getByTestId('first'))
        .toHaveAttribute('data-index', '0');
      await expect
        .element(page.getByTestId('third'))
        .toHaveAttribute('data-index', '1');
    });

    test('returns the next and previous elements', async () => {
      await render(
        <Descendant>
          <TestComponent name="first" />
          <TestComponent name="second" />
          <TestComponent name="third" />
        </Descendant>
      );

      const second = page.getByTestId('second');
      await expect.element(second).toHaveAttribute('data-next', 'third');
      await expect.element(second).toHaveAttribute('data-prev', 'first');
    });

    test('wraps around at the ends when looping', async () => {
      await render(
        <Descendant>
          <TestComponent name="first" />
          <TestComponent name="second" />
        </Descendant>
      );

      await expect
        .element(page.getByTestId('second'))
        .toHaveAttribute('data-next', 'first');
      await expect
        .element(page.getByTestId('first'))
        .toHaveAttribute('data-prev', 'second');
    });

    test('stays on the element at the ends when not looping', async () => {
      await render(
        <Descendant>
          <TestComponent name="first" />
          <TestComponent name="second" />
        </Descendant>
      );

      await expect
        .element(page.getByTestId('second'))
        .toHaveAttribute('data-next-no-loop', 'second');
      await expect
        .element(page.getByTestId('first'))
        .toHaveAttribute('data-prev-no-loop', 'first');
    });
  });
});
