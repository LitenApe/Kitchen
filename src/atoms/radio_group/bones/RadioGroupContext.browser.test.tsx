import type { ReactNode } from 'react';
import { renderHook } from 'vitest-browser-react';

import {
  type GroupMemberProps,
  RadioGroupContext,
  useRadioGroup,
} from './RadioGroupContext';

describe('useRadioGroup general behavior', () => {
  test('leaves props as they are outside a radio group', async () => {
    const { result } = await renderHook(() => useRadioGroup());
    const props = { name: 'own', onBlur: vi.fn() };

    expect(result.current.getGroupProps(props)).toBe(props);
  });

  test('has no error outside a radio group', async () => {
    const { result } = await renderHook(() => useRadioGroup());
    expect(result.current.error).toBeUndefined();
  });

  test('returns the surrounding radio group', async () => {
    const group = {
      getGroupProps: <T extends GroupMemberProps>(props: T) => props,
      error: 'Choose an option',
    };
    const { result } = await renderHook(() => useRadioGroup(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <RadioGroupContext value={group}>{children}</RadioGroupContext>
      ),
    });

    expect(result.current).toBe(group);
  });
});
