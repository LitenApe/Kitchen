import type { ComponentPropsWithoutRef } from 'react';

/** The props which a group shares with every radio inside it. */
export type SharedRadioProps = Pick<
  ComponentPropsWithoutRef<'input'>,
  'onChange' | 'required' | 'disabled' | 'form'
> & {
  /**
   * The name which every radio in the group submits its value under. Radios
   * only behave as one group, where choosing one clears the others, when they
   * share a name.
   */
  name: string;
};

type SplitGroupProps<T> = {
  /** The props to share with every radio in the group. */
  shared: SharedRadioProps;
  /** The props of the group's own element. */
  group: Omit<T, keyof SharedRadioProps>;
};

/**
 * Separates the props which make the radios of a group one form control,
 * which are shared with every radio, from the props of the group's own
 * element, such as its `id`, `className`, `style` and the `aria-` props which
 * name, describe or validate the group.
 *
 * @param props the props given to the group
 * @returns the props to share with the radios, and the group's own props
 */
export function splitGroupProps<T extends SharedRadioProps>({
  name,
  onChange,
  required,
  disabled,
  form,
  ...group
}: T): SplitGroupProps<T> {
  return {
    shared: { name, onChange, required, disabled, form },
    group,
  };
}
