import {
  Children,
  JSX,
  PropsWithChildren,
  cloneElement,
  createElement,
  isValidElement,
} from 'react';
import { Field, FieldProps } from '../../atoms/field';

import { Alert } from '../../atoms/alert';
import { concat } from '../../utils/functions/concat';
import { useId } from '../../utils/hooks/useId';

export type BaseFieldProps = PropsWithChildren<FieldProps>;

function BaseField(props: BaseFieldProps): JSX.Element {
  const id = useId('form-field');
  const { children, ...rest } = props;

  const alertId = `form-field-alert-${id}`;
  const isInvalid = Boolean(rest.error);

  return createElement(
    Field,
    {
      ...rest,
      'aria-describedby': concat(
        isInvalid && alertId,
        rest['aria-describedby']
      ),
    },
    createElement('div', null, [
      Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return null;
        }

        return cloneElement(child, { key: `field-element-${id}-${index}` });
      }),
      isInvalid &&
        createElement(
          Alert,
          { key: `field-alert-${id}`, id: alertId, 'aria-live': 'assertive' },
          props.error
        ),
    ])
  );
}

export default BaseField;
