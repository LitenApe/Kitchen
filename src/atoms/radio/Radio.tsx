import type { ComponentPropsWithRef, JSX } from 'react';

import { useField } from '../field';
import { useRadioGroup } from '../radio_group';

/**
 * A radio cannot be invalid on its own, so mark its `RadioGroup` as invalid
 * instead.
 */
export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

/**
 * A radio, which takes the props its `RadioGroup` shares, and its id and other
 * props from a surrounding `Field`.
 */
function Radio(ownProps: RadioProps): JSX.Element {
  const { getGroupProps } = useRadioGroup();
  const props = useField().getFieldProps(getGroupProps(ownProps));

  return <input {...props} type="radio" />;
}

export default Radio;
