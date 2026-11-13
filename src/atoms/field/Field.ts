import { FieldContext, FieldProps } from './bones/FieldContext';
import { JSX, PropsWithChildren, createElement } from 'react';

import { useId } from '../../utils/hooks/useId';

function Field(props: PropsWithChildren<FieldProps>): JSX.Element {
  const id = useId('form-field');
  const { children, ...rest } = props;

  function getFieldProps<T extends FieldProps>(args: T): T {
    return {
      id,
      ...rest,
      ...args,
    };
  }

  return createElement(
    FieldContext.Provider,
    { value: { getFieldProps } },
    children
  );
}

export default Field;
