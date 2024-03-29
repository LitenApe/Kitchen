import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Descendant, useDescendant } from '.';
import { useMount } from '../../utils/hooks/useMount';
import { DescendantManager } from './bones/DescendantManager';
import { getNextIndex, getPreviousIndex, sortNodes } from './bones/utils';

describe('Descendant default behavior', () => {
  describe('DescendantManager', () => {
    test('initiates without crashing', () => {
      new DescendantManager();
    });

    test('registered node has an index', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<p ref={ref}></p>);
      const manager = new DescendantManager();

      manager.register(ref.current);
      const index = manager.getIndex(ref.current);

      expect(index).toBe(0);
    });

    test('not registered node has -1 as index', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<p ref={ref}></p>);
      const manager = new DescendantManager();

      const index = manager.getIndex(ref.current);

      expect(index).toBe(-1);
    });

    test('unregistered node loses index', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<p ref={ref}></p>);
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

    test('returns next descendant', () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      render(
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

    test('returns first descedant when last descedant ask for next', () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      render(
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

    test('returns same descedant when last descedant ask for next and loop is disabled', () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      render(
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

    test('returns previous descendant', () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      render(
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

    test('returns last descendant when first descedant ask for prev', () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      render(
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

    test('returns same descendant when first descedant ask for prev and loop is disabled', () => {
      const refOne = createRef<HTMLParagraphElement>();
      const refTwo = createRef<HTMLParagraphElement>();
      render(
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

    test('renders without crashing', () => {
      render(<Descendant></Descendant>);
    });

    test('assign consumer an id', () => {
      render(
        <Descendant>
          <TestComponent id={1} />
        </Descendant>
      );

      const container = screen.getByTestId('test-component-1');
      expect(container).toHaveAttribute('data-id', '0');
    });

    test("consumers are assigned id's in ascending order", () => {
      render(
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

      const first = screen.getByTestId('test-component-1');
      expect(first).toHaveAttribute('data-id', '0');

      const second = screen.getByTestId('test-component-2');
      expect(second).toHaveAttribute('data-id', '1');

      const third = screen.getByTestId('test-component-3');
      expect(third).toHaveAttribute('data-id', '2');

      const fourth = screen.getByTestId('test-component-4');
      expect(fourth).toHaveAttribute('data-id', '3');
    });

    test('assigned new id on re-render', () => {
      const { rerender } = render(
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

      const first = screen.getByTestId('test-component-1');
      expect(first).toHaveAttribute('data-id', '0');

      const second = screen.getByTestId('test-component-2');
      expect(second).toHaveAttribute('data-id', '1');

      const third = screen.getByTestId('test-component-3');
      expect(third).toHaveAttribute('data-id', '2');

      const fourth = screen.getByTestId('test-component-4');
      expect(fourth).toHaveAttribute('data-id', '3');

      rerender(
        <Descendant>
          <TestComponent id={1} />
          <div>
            <TestComponent id={2} />
          </div>
          <TestComponent id={4} />
        </Descendant>
      );

      const fifth = screen.getByTestId('test-component-1');
      expect(fifth).toHaveAttribute('data-id', '0');

      const sixth = screen.getByTestId('test-component-2');
      expect(sixth).toHaveAttribute('data-id', '1');

      const seventh = screen.getByTestId('test-component-4');
      expect(seventh).toHaveAttribute('data-id', '2');
    });

    test('throws error if not wrapped by Descendant', () => {
      const original = global.console.error;
      global.console.error = jest.fn();
      function renderComponent() {
        render(<TestComponent id={0} />);
      }

      expect(renderComponent).toThrowError();
      global.console.error = original;
    });
  });

  describe('utils', () => {
    describe('sortNodes', () => {
      test('nodes are sorted in ascending order', () => {
        const first = createRef<HTMLDivElement>();
        const second = createRef<HTMLDivElement>();
        const third = createRef<HTMLDivElement>();

        render(
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

    describe('getNextIndex', () => {
      test('increment with 1 when current is lower then length', () => {
        expect(getNextIndex(0, 2)).toBe(1);
      });

      test('returns 0 when increment results in overflow', () => {
        expect(getNextIndex(1, 2)).toBe(0);
      });

      test('returns same index when increment overflows and loop is disabled', () => {
        expect(getNextIndex(1, 2, false)).toBe(1);
      });
    });

    describe('getPreviousIndex', () => {
      test('decrement with 1 when current is higher then 0', () => {
        expect(getPreviousIndex(1, 2)).toBe(0);
      });

      test('returns 1 when decrement results in overflow', () => {
        expect(getPreviousIndex(0, 2)).toBe(1);
      });

      test('returns same index when increment overflows and loop is disabled', () => {
        expect(getPreviousIndex(0, 2, false)).toBe(0);
      });
    });
  });
});
