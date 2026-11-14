import type { AriaAttributes } from 'react';

type DisableableProps = {
  disabled?: boolean;
  'aria-disabled'?: AriaAttributes['aria-disabled'];
};

/**
 * Checks whether an element is disabled through either `disabled` or
 * `aria-disabled`.
 *
 * @param props the element's props
 * @returns whether the element is disabled
 */
export function isDisabled(props: DisableableProps): boolean {
  const ariaDisabled = props['aria-disabled'];
  return (
    props.disabled === true || ariaDisabled === true || ariaDisabled === 'true'
  );
}
