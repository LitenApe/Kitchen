import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext,
  use,
} from 'react';

import type { DistributiveOmit } from '../../../utils/types/PolymorphicProps';
import type { InputProps } from '../../input';

/** Props which a field can share with the controls inside it. */
type SharedControlProps =
  | DistributiveOmit<InputProps, 'ref'>
  | ComponentPropsWithoutRef<'select'>
  | ComponentPropsWithoutRef<'label'>
  | ComponentPropsWithoutRef<'textarea'>;

export type FieldProps = {
  /** An error message, which marks the controls in the field as invalid. */
  error?: string;
  children?: ReactNode;
} & SharedControlProps;

type FieldContextValue = {
  /** The id of the field's control, which its label points to. */
  readonly id: string | undefined;
  /**
   * Merges the props shared by the field with a control's own props, where
   * the control's own props take precedence.
   */
  readonly getFieldProps: <T extends object>(props: T) => T;
};

export const FieldContext = createContext<FieldContextValue>({
  id: undefined,
  getFieldProps: (props) => props,
});

export function useField(): FieldContextValue {
  return use(FieldContext);
}
