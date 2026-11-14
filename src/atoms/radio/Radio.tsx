import type { ComponentPropsWithRef, JSX } from 'react';

import { BaseInput } from '../base_input';
import { useRadioGroup } from '../radio_group';

/**
 * A radio cannot be invalid on its own, so it takes no `error`. Its
 * `RadioGroup` takes the error instead.
 */
export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

function Radio(props: RadioProps): JSX.Element {
  const { getGroupProps, error } = useRadioGroup();

  // the group's error keeps the form from being submitted
  return <BaseInput {...getGroupProps(props)} error={error} type="radio" />;
}

export default Radio;
