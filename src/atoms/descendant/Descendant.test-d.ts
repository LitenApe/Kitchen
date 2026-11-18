import {
  type DescendantProps,
  type UseDescendantResult,
  useDescendant,
} from '.';

describe('Descendant types', () => {
  test('exports the props of Descendant', () => {
    expectTypeOf<DescendantProps>().toHaveProperty('children');
  });

  test('exports what useDescendant returns', () => {
    expectTypeOf(useDescendant<HTMLButtonElement>).returns.toEqualTypeOf<
      UseDescendantResult<HTMLButtonElement>
    >();
  });
});
