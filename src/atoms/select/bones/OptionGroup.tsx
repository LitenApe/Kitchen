import type { ComponentPropsWithRef, JSX } from 'react';

export type OptionGroupProps = ComponentPropsWithRef<'optgroup'>;

function OptionGroup(props: OptionGroupProps): JSX.Element {
  return <optgroup {...props} />;
}

export default OptionGroup;
