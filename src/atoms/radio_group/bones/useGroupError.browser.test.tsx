import type { ReactNode } from 'react';
import { renderHook } from 'vitest-browser-react';

import { FieldContext } from '../../field';
import { useGroupError } from './useGroupError';

/** Places the hook in a field which marks its control as invalid, and describes it. */
function inField(describedBy: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <FieldContext
        value={{
          id: 'field',
          getFieldProps: (own) => ({
            'aria-invalid': true,
            'aria-describedby': describedBy,
            ...own,
          }),
        }}
      >
        {children}
      </FieldContext>
    );
  };
}

describe('useGroupError general behavior', () => {
  test('returns its own aria-invalid and description outside a field', async () => {
    const { result } = await renderHook(() =>
      useGroupError({ 'aria-invalid': true, 'aria-describedby': 'hint' })
    );

    expect(result.current).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'hint',
    });
  });

  test('takes aria-invalid and the description of the surrounding field', async () => {
    const { result } = await renderHook(() => useGroupError({}), {
      wrapper: inField('message'),
    });

    expect(result.current).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'message',
    });
  });

  test('prefers its own aria-invalid, and combines both descriptions', async () => {
    const { result } = await renderHook(
      () =>
        useGroupError({ 'aria-invalid': false, 'aria-describedby': 'hint' }),
      { wrapper: inField('message') }
    );

    expect(result.current).toEqual({
      'aria-invalid': false,
      'aria-describedby': 'message hint',
    });
  });
});
