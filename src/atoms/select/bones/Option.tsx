import type { ComponentPropsWithRef, JSX } from 'react';

export type OptionProps = ComponentPropsWithRef<'option'>;

function Option(props: OptionProps): JSX.Element {
  return <option {...props} />;
}

export default Option;
