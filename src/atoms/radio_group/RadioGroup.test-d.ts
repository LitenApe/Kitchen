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
});
