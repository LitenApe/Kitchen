import type { ComponentPropsWithRef, JSX } from 'react';

import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import { useField } from '../field';
import { useRadioGroup } from '../radio_group';

/**
 * A radio cannot be invalid on its own, so it takes no `error`. Its
 * `RadioGroup` takes the error instead.
 */
export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

/** A field may also share an error, which a radio leaves to its group. */
type FieldRadioProps = RadioProps & { error?: string };

/**
 * A radio, which takes the props its `RadioGroup` shares, and its id and other
 * props from a surrounding `Field`.
 */
function Radio(ownProps: RadioProps): JSX.Element {
  const { getGroupProps, error } = useRadioGroup();
  const {
    error: _fieldError,
    ref,
    ...props
  } = useField().getFieldProps<FieldRadioProps>(getGroupProps(ownProps));
  // the group's error keeps the form from being submitted, while only the
  // group is marked as invalid
  const validityRef = useCustomValidity<HTMLInputElement>(error);
  const radioRef = useMergedRefs(validityRef, ref);

  return <input {...props} type="radio" ref={radioRef} />;
}

export default Radio;
