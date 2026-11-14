import type { ComponentPropsWithRef, ElementType } from 'react';

/**
 * Props for a component which renders the element or component given through
 * `as`. They combine the component's own `Props` with the props of the
 * rendered element, where the component's own props take precedence.
 */
export type PolymorphicProps<
  T extends ElementType,
  Props extends object = object,
> = Props & { as?: T } & Omit<ComponentPropsWithRef<T>, keyof Props | 'as'>;

/**
 * Removes keys from every member of a union, unlike `Omit`, which merges the
 * members into one type first.
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
