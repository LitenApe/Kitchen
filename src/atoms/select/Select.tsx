import type { ComponentPropsWithRef, JSX } from 'react';

import { useField } from '../field';

export type SelectProps = ComponentPropsWithRef<'select'>;

function Select(ownProps: SelectProps): JSX.Element {
  const props = useField().getFieldProps(ownProps);

  return <select {...props} />;
}

export default Select;
