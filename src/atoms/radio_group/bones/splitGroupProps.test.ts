import type { ComponentPropsWithoutRef } from 'react';

import { splitGroupProps } from './splitGroupProps';

describe('splitGroupProps', () => {
  test('keeps the attributes of the group apart from the shared props', () => {
    const { group, shared } = splitGroupProps({
      'aria-label': 'Size',
      'aria-labelledby': 'legend',
      'aria-describedby': 'hint',
      'aria-required': true,
      'aria-invalid': true,
      'aria-errormessage': 'error',
      name: 'size',
      disabled: true,
    });

    expect(group).toEqual({
      'aria-label': 'Size',
      'aria-labelledby': 'legend',
      'aria-describedby': 'hint',
      'aria-required': true,
      'aria-invalid': true,
      'aria-errormessage': 'error',
    });
    expect(shared).toEqual({ name: 'size', disabled: true });
  });

  test('shares everything when the group has no attributes of its own', () => {
    const props: ComponentPropsWithoutRef<'input'> = { name: 'size' };
    expect(splitGroupProps(props).shared).toEqual({ name: 'size' });
  });
});
