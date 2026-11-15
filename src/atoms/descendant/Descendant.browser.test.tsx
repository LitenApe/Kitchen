import { type KeyboardEvent, memo, useState } from 'react';
import { page, userEvent } from 'vitest/browser';
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

/**
 * A button which shows its position, and moves focus to the next button when
 * the down arrow key is pressed.
 */
function Item({ name }: { name: string }) {
  const { index, ref, next } = useDescendant<HTMLButtonElement>();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown') {
      next()?.focus();
    }
  }

  return (
    <button ref={ref} onKeyDown={handleKeyDown}>
      {name} at {index}
    </button>
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

    test('indices and neighbours follow the elements when they are reordered', async () => {
      function List() {
        const [names, setNames] = useState(['first', 'second', 'third']);

        return (
          <Descendant>
            <button onClick={() => setNames(names.toReversed())}>
              Reverse
            </button>
            {names.map((name) => (
              <Item key={name} name={name} />
            ))}
          </Descendant>
        );
      }
      await render(<List />);

      await userEvent.click(page.getByRole('button', { name: 'Reverse' }));

      const third = page.getByRole('button', { name: 'third at 0' });
      const second = page.getByRole('button', { name: 'second at 1' });
      await expect.element(third).toBeVisible();
      await expect.element(second).toBeVisible();
      await expect
        .element(page.getByRole('button', { name: 'first at 2' }))
        .toBeVisible();

      // moving focus follows the new order as well
      await userEvent.click(third);
      await userEvent.keyboard('{ArrowDown}');
      await expect.element(second).toHaveFocus();
    });

    test('indices follow reordered elements which do not render again', async () => {
      const MemoItem = memo(Item);

      // only the list renders again, while React moves the items without
      // rendering them or Descendant again
      function List() {
        const [names, setNames] = useState(['first', 'second', 'third']);

        return (
          <>
            <button onClick={() => setNames(names.toReversed())}>
              Reverse
            </button>
            {names.map((name) => (
              <MemoItem key={name} name={name} />
            ))}
          </>
        );
      }
      await render(
        <Descendant>
          <List />
        </Descendant>
      );

      await userEvent.click(page.getByRole('button', { name: 'Reverse' }));

      await expect
        .element(page.getByRole('button', { name: 'third at 0' }))
        .toBeVisible();
      await expect
        .element(page.getByRole('button', { name: 'first at 2' }))
        .toBeVisible();
    });

    test('indices follow the elements when some are removed and the rest reordered at once', async () => {
      function List() {
        const [names, setNames] = useState(['first', 'second', 'third']);

        return (
          <Descendant>
            <button onClick={() => setNames(['third', 'first'])}>
              Remove second and reverse
            </button>
            {names.map((name) => (
              <Item key={name} name={name} />
            ))}
          </Descendant>
        );
      }
      await render(<List />);

      await userEvent.click(
        page.getByRole('button', { name: 'Remove second and reverse' })
      );

      await expect
        .element(page.getByRole('button', { name: 'third at 0' }))
        .toBeVisible();
      await expect
        .element(page.getByRole('button', { name: 'first at 1' }))
        .toBeVisible();
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
