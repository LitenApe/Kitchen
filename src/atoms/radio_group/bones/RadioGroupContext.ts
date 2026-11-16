import { createContext, use } from 'react';

type RadioGroupContextValue = {
  /**
   * Merges the props shared by the group with a radio's own props, where the
   * radio's own props take precedence unless they are `undefined`.
   */
  readonly getGroupProps: <T extends object>(props: T) => T;
};

export const RadioGroupContext = createContext<RadioGroupContextValue>({
  getGroupProps: (props) => props,
});

export function useRadioGroup(): RadioGroupContextValue {
  return use(RadioGroupContext);
}
