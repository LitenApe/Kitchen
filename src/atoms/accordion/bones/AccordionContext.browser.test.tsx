import type { ReactNode } from 'react';
import { renderHook } from 'vitest-browser-react';

import { AccordionContext, useAccordion } from './AccordionContext';

describe('useAccordion general behavior', () => {
  test('returns the state of the surrounding accordion', async () => {
    const accordion = { id: 'accordion', open: true, onClick: vi.fn() };
    const { result } = await renderHook(() => useAccordion(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <AccordionContext value={accordion}>{children}</AccordionContext>
      ),
    });

    expect(result.current).toBe(accordion);
  });

  test('throws when not wrapped by an accordion', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(renderHook(() => useAccordion())).rejects.toThrow(
      'Component must be wrapped by "Accordion"'
    );

    error.mockRestore();
  });
});
