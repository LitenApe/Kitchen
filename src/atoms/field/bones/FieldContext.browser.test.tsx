import type { ReactNode } from 'react';
import { renderHook } from 'vitest-browser-react';

import { FieldContext, useField } from './FieldContext';

describe('useField general behavior', () => {
  test('has no id outside a field', async () => {
    const { result } = await renderHook(() => useField());
    expect(result.current.id).toBeUndefined();
  });

  test('leaves props as they are outside a field', async () => {
    const { result } = await renderHook(() => useField());
    const props = { name: 'own' };

    expect(result.current.getFieldProps(props)).toBe(props);
  });

  test('returns the surrounding field', async () => {
    const field = {
      id: 'field',
      getFieldProps: <T extends object>(props: T) => props,
    };
    const { result } = await renderHook(() => useField(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <FieldContext value={field}>{children}</FieldContext>
      ),
    });

    expect(result.current).toBe(field);
  });
});
