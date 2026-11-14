import type { ReactNode } from 'react';
import { renderHook } from 'vitest-browser-react';

import { FieldContext } from '../../field';
import { useGroupError } from './useGroupError';

/** Places the hook in a field which shares the given error and description. */
function inField(error: string, describedBy: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <FieldContext
        value={{
          id: 'field',
          getFieldProps: (own) => ({
            error,
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
  test('returns its own error and description outside a field', async () => {
    const { result } = await renderHook(() =>
      useGroupError({ error: 'own', 'aria-describedby': 'hint' })
    );

    expect(result.current).toEqual({
      error: 'own',
      'aria-describedby': 'hint',
    });
  });

  test('takes the error and description of the surrounding field', async () => {
    const { result } = await renderHook(() => useGroupError({}), {
      wrapper: inField('field error', 'message'),
    });

    expect(result.current).toEqual({
      error: 'field error',
      'aria-describedby': 'message',
    });
  });

  test('prefers its own error, and combines both descriptions', async () => {
    const { result } = await renderHook(
      () => useGroupError({ error: 'own', 'aria-describedby': 'hint' }),
      { wrapper: inField('field error', 'message') }
    );

    expect(result.current).toEqual({
      error: 'own',
      'aria-describedby': 'message hint',
    });
  });
});
