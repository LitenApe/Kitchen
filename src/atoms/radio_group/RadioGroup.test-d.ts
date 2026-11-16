import type { FocusEventHandler } from 'react';

import type { RadioGroupProps } from './RadioGroup';

describe('RadioGroupProps', () => {
  test('requires a name', () => {
    expectTypeOf<RadioGroupProps['name']>().toEqualTypeOf<string>();
  });

  test('leaves out props which only make sense on a single radio', () => {
    expectTypeOf<RadioGroupProps>().not.toHaveProperty('value');
    expectTypeOf<RadioGroupProps>().not.toHaveProperty('checked');
  });

  test('keeps the radiogroup role', () => {
    expectTypeOf<RadioGroupProps>().not.toHaveProperty('role');
  });

  // the blur of any control inside the group reaches onBlur through the
  // fieldset, so it is not always the blur of a radio
  test('calls onBlur with an event of the fieldset', () => {
    expectTypeOf<RadioGroupProps['onBlur']>().toEqualTypeOf<
      FocusEventHandler<HTMLFieldSetElement> | undefined
    >();
  });
});
