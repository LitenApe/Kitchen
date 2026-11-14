import { type FocusEventHandler, createContext, use } from 'react';

export type GroupMemberProps = {
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

type RadioGroupContextValue = {
  /**
   * Merges the props shared by the group with a radio's own props, where the
   * radio's own props take precedence.
   */
  readonly getGroupProps: <T extends GroupMemberProps>(props: T) => T;
};

export const RadioGroupContext = createContext<RadioGroupContextValue>({
  getGroupProps: (props) => props,
});

export function useRadioGroup(): RadioGroupContextValue {
  return use(RadioGroupContext);
}
