import type { ComponentPropsWithRef, JSX } from 'react';

import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import { useField } from '../field';

export type TextareaProps = ComponentPropsWithRef<'textarea'> & {
  /**
   * An error message, which marks the textarea as invalid and becomes its
   * native validation message.
   */
  error?: string;
};

/**
 * A field for longer text, which takes its id and other props from a
 * surrounding `Field`.
 */
function Textarea(ownProps: TextareaProps): JSX.Element {
  const { error, ref, ...props } = useField().getFieldProps(ownProps);
  const validityRef = useCustomValidity<HTMLTextAreaElement>(error);
  const textareaRef = useMergedRefs(validityRef, ref);

  return (
    <textarea aria-invalid={Boolean(error)} {...props} ref={textareaRef} />
  );
}

export default Textarea;
