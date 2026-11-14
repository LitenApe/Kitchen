import type { ComponentPropsWithRef, JSX } from 'react';

import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import { useField } from '../field';

type InputElementProps = { as?: 'input' } & ComponentPropsWithRef<'input'>;
type TextareaElementProps = {
  as: 'textarea';
} & ComponentPropsWithRef<'textarea'>;

export type BaseInputProps = (InputElementProps | TextareaElementProps) & {
  /**
   * An error message, which marks the control as invalid and becomes its
   * native validation message. A radio only takes it as its validation
   * message, as its group is the one marked as invalid.
   */
  error?: string;
};

type ControlElement = HTMLInputElement | HTMLTextAreaElement;

/**
 * The shared foundation of `Input`, `Checkbox` and `Radio`. Renders an
 * `input`, or a `textarea` through `as`, which takes its id and other props
 * from a surrounding `Field`.
 */
function BaseInput(ownProps: BaseInputProps): JSX.Element {
  const props = useField().getFieldProps(ownProps);
  const validityRef = useCustomValidity<ControlElement>(props.error);
  const ref = useMergedRefs<ControlElement>(validityRef, props.ref);
  const invalid = Boolean(props.error);

  if (props.as === 'textarea') {
    const { as: _as, error: _error, ...textareaProps } = props;
    return <textarea aria-invalid={invalid} {...textareaProps} ref={ref} />;
  }

  const { as: _as, error: _error, ...inputProps } = props;
  return (
    <input
      // a radio's group is marked as invalid rather than the radio itself
      aria-invalid={inputProps.type === 'radio' ? undefined : invalid}
      {...inputProps}
      ref={ref}
    />
  );
}

export default BaseInput;
