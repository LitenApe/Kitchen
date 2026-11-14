import type { DistributiveOmit, PolymorphicProps } from './PolymorphicProps';

describe('PolymorphicProps', () => {
  test('accepts the props of the element given through `as`', () => {
    expectTypeOf<PolymorphicProps<'a'>>().toHaveProperty('href');
    expectTypeOf<PolymorphicProps<'div'>>().not.toHaveProperty('href');
  });

  test('accepts the element itself through `as`', () => {
    expectTypeOf<PolymorphicProps<'a'>['as']>().toEqualTypeOf<
      'a' | undefined
    >();
  });

  test("gives the component's own props precedence over the element's", () => {
    expectTypeOf<
      PolymorphicProps<'div', { title: number }>['title']
    >().toEqualTypeOf<number>();
  });
});

describe('DistributiveOmit', () => {
  test('removes keys from every member of a union', () => {
    type Union =
      | { kind: 'a'; a: string; shared: number }
      | { kind: 'b'; b: boolean; shared: number };

    expectTypeOf<DistributiveOmit<Union, 'shared'>>().toEqualTypeOf<
      { kind: 'a'; a: string } | { kind: 'b'; b: boolean }
    >();
  });
});
