import type {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  JSXElementConstructor,
} from 'react';

export type PropsOf<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<T, ComponentPropsWithoutRef<T>>;

export type AsProps<T extends ElementType> = {
  as?: T;
};

export type ExtendableProps<ExtendedProps, OverrideProps> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

export type InheritableElementProps<T extends ElementType, P> = ExtendableProps<
  PropsOf<T>,
  P
>;

export type DynamicProps<T extends ElementType> = AsProps<T> &
  ComponentPropsWithoutRef<T>;
