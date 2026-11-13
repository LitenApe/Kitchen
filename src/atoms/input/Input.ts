import { BaseInput, BaseInputProps } from '../base_input';
import { FieldProps, useField } from '../field';
import {
  ForwardedRef,
  JSX,
  cloneElement,
  createElement,
  forwardRef,
} from 'react';
import { PermittedTags, WithPostfix, WithPrefix } from './types';

import { concat } from '../../utils/functions/concat';
import { isDefined } from '../../utils/functions/isDefined';
import { useId } from '../../utils/hooks/useId';

export type InputProps<T extends PermittedTags = 'input'> = BaseInputProps<T> &
  (WithPostfix | WithPrefix);

function Input<T extends PermittedTags = 'input'>(
  props: InputProps<T>,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
): JSX.Element {
  const { getFieldProps } = useField();
  const id = useId();
  const { postfix, prefix, ...rest } = getFieldProps(props as InputProps);

  const component = createElement(BaseInput, {
    type: props.as === 'textarea' ? undefined : 'text',
    ...rest,
    ref,
  });

  if (isDefined(postfix) || isDefined(prefix)) {
    const descriptionId = `${id}_post-or-pre-fix`;

    return createElement(
      'div',
      {
        style: {
          display: 'inline-flex',
          flexDirection: isDefined(postfix) ? 'row' : 'row-reverse',
          justifyContent: isDefined(postfix) ? 'flex-start' : 'flex-end',
        },
      },
      cloneElement(component, {
        ...component.props,
        'aria-describedby': concat(
          component.props['aria-describedby'],
          descriptionId
        ),
      }),
      createElement('span', { id: descriptionId }, postfix ?? prefix)
    );
  }

  return component;
}

export default forwardRef(Input);
