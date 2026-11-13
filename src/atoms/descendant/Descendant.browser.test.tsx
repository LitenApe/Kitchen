import { createRef } from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Descendant, useDescendant } from '.';
import { useMount } from '../../utils/hooks/useMount';
import { DescendantManager } from './bones/DescendantManager';
import { sortNodes } from './bones/utils';

describe('Descendant default behavior', () => {
  describe('DescendantManager', () => {
    test('initiates without crashing', () => {
      new DescendantManager();
    });

    test('registered node has an index', async () => {
      const ref = createRef<HTMLParagraphElement>();
      await render(<p ref={ref}></p>);
      const manager = new DescendantManager();

      manager.register(ref.current);
      const index = manager.getIndex(ref.current);

      expect(index).toBe(0);
    });

    test('not registered node has -1 as index', async () => {
      const ref = createRef<HTMLParagraphElement>();
      await render(<p ref={ref}></p>);
      const manager = new DescendantManager();

      const index = manager.getIndex(ref.current);

      expect(index).toBe(-1);
    });

    test('unregistered node loses index', async () => {
      const ref = createRef<HTMLParagraphElement>();
      await render(<p ref={ref}></p>);
      const manager = new DescendantManager();

      manager.register(ref.current);
      const initialIndex = manager.getIndex(ref.current);

      expect(initialIndex).toBe(0);

      manager.unregister(ref.current);
      const finalIndex = manager.getIndex(ref.current);

      expect(finalIndex).toBe(-1);
    });

    test('getIndex returns -1 on null', () => {
      const manager = new DescendantManager();
      expect(manager.getIndex(null)).toBe(-1);
    });

    test('nothing happens when sending null as argument to register', () => {
      const manager = new DescendantManager();
      expect(manager.getIndex(null)).toBe(-1);

      manager.register(null);

      expect(manager.getIndex(null)).toBe(-1);
    });

    test('nothing happens when sending null as argument to unregister', () => {
      const manager = new DescendantManager();
      expect(manager.getIndex(null)).toBe(-1);

      manager.unregister(null);

      expect(manager.getIndex(null)).toBe(-1);
    });

    test('returns next descendant', async () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      await render(
        <>
          <p ref={refOne}></p>
          <p ref={refTwo}></p>
        </>
      );

      const manager = new DescendantManager();
      manager.register(refOne.current);
      manager.register(refTwo.current);

      expect(manager.next(0)).toBe(refTwo.current);
    });

    test('returns first descedant when last descedant ask for next', async () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      await render(
        <>
          <p ref={refOne}></p>
          <p ref={refTwo}></p>
        </>
      );

      const manager = new DescendantManager();
      manager.register(refOne.current);
      manager.register(refTwo.current);

      expect(manager.next(1)).toBe(refOne.current);
    });

    test('returns same descedant when last descedant ask for next and loop is disabled', async () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      await render(
        <>
          <p ref={refOne}></p>
          <p ref={refTwo}></p>
        </>
      );

      const manager = new DescendantManager();
      manager.register(refOne.current);
      manager.register(refTwo.current);

      expect(manager.next(1, false)).toBe(refTwo.current);
    });

    test('returns previous descendant', async () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      await render(
        <>
          <p ref={refOne}></p>
          <p ref={refTwo}></p>
        </>
      );

      const manager = new DescendantManager();
      manager.register(refOne.current);
      manager.register(refTwo.current);

      expect(manager.prev(1)).toBe(refOne.current);
    });

    test('returns last descendant when first descedant ask for prev', async () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      await render(
        <>
          <p ref={refOne}></p>
          <p ref={refTwo}></p>
        </>
      );

      const manager = new DescendantManager();
      manager.register(refOne.current);
      manager.register(refTwo.current);

      expect(manager.prev(0)).toBe(refTwo.current);
    });

    test('returns same descendant when first descedant ask for prev and loop is disabled', async () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      await render(
        <>
          <p ref={refOne}></p>
          <p ref={refTwo}></p>
        </>
      );

      const manager = new DescendantManager();
      manager.register(refOne.current);
      manager.register(refTwo.current);

      expect(manager.prev(0, false)).toBe(refOne.current);
    });
  });

  describe('Descendant', () => {
    function TestComponent({ id }: { id: number }) {
      const ref = createRef<HTMLParagraphElement>();
      const { index, register } = useDescendant();

      useMount(() => {
        register(ref);
      });

      return (
        <p ref={ref} data-id={index} data-testid={`test-component-${id}`}>
          index {`${index}`}
        </p>
      );
    }

    test('renders without crashing', async () => {
      await render(<Descendant></Descendant>);
    });

    test('assign consumer an id', async () => {
      await render(
        <Descendant>
          <TestComponent id={1} />
        </Descendant>
      );

      const container = page.getByTestId('test-component-1');
      await expect.element(container).toHaveAttribute('data-id', '0');
    });

    test("consumers are assigned id's in ascending order", async () => {
      await render(
        <Descendant>
          <TestComponent id={1} />
          <div>
            <TestComponent id={2} />
          </div>
          <div>
            <div>
              <TestComponent id={3} />
            </div>
          </div>
          <TestComponent id={4} />
        </Descendant>
      );

      const first = page.getByTestId('test-component-1');
      await expect.element(first).toHaveAttribute('data-id', '0');

      const second = page.getByTestId('test-component-2');
      await expect.element(second).toHaveAttribute('data-id', '1');

      const third = page.getByTestId('test-component-3');
      await expect.element(third).toHaveAttribute('data-id', '2');

      const fourth = page.getByTestId('test-component-4');
      await expect.element(fourth).toHaveAttribute('data-id', '3');
    });

    test('assigned new id on re-render', async () => {
      const { rerender } = await render(
        <Descendant>
          <TestComponent id={1} />
          <div>
            <TestComponent id={2} />
          </div>
          <div>
            <div>
              <TestComponent id={3} />
            </div>
          </div>
          <TestComponent id={4} />
        </Descendant>
      );

      const first = page.getByTestId('test-component-1');
      await expect.element(first).toHaveAttribute('data-id', '0');

      const second = page.getByTestId('test-component-2');
      await expect.element(second).toHaveAttribute('data-id', '1');

      const third = page.getByTestId('test-component-3');
      await expect.element(third).toHaveAttribute('data-id', '2');

      const fourth = page.getByTestId('test-component-4');
      await expect.element(fourth).toHaveAttribute('data-id', '3');

      await rerender(
        <Descendant>
          <TestComponent id={1} />
          <div>
            <TestComponent id={2} />
          </div>
          <TestComponent id={4} />
        </Descendant>
      );

      const fifth = page.getByTestId('test-component-1');
      await expect.element(fifth).toHaveAttribute('data-id', '0');

      const sixth = page.getByTestId('test-component-2');
      await expect.element(sixth).toHaveAttribute('data-id', '1');

      const seventh = page.getByTestId('test-component-4');
      await expect.element(seventh).toHaveAttribute('data-id', '2');
    });

    test('throws error if not wrapped by Descendant', async () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(render(<TestComponent id={0} />)).rejects.toThrow();

      error.mockRestore();
    });
  });

  describe('utils', () => {
    describe('sortNodes', () => {
      test('nodes are sorted in ascending order', async () => {
        const first = createRef<HTMLDivElement>();
        const second = createRef<HTMLDivElement>();
        const third = createRef<HTMLDivElement>();

        await render(
          <div>
            <div ref={first}></div>
            <div ref={second}></div>
            <div ref={third}></div>
          </div>
        );

        const nodes = [first, second, third]
          .map((ref) => ref.current)
          .filter((ref): ref is HTMLDivElement => ref !== null);

        expect(nodes).toHaveLength(3);
        const sorted = sortNodes([nodes[1], nodes[2], nodes[0]]);

        expect(sorted[0]).toBe(nodes[0]);
        expect(sorted[1]).toBe(nodes[1]);
        expect(sorted[2]).toBe(nodes[2]);
      });
    });
  });
});
