import { type MouseEvent, createContext, use } from 'react';

type AccordionContextValue = {
  /** Links the header to the panel it controls. */
  readonly id: string;
  readonly open: boolean;
  /** Requests the accordion to open or close. */
  readonly onClick: (event: MouseEvent) => void;
};

export const AccordionContext = createContext<AccordionContextValue | null>(
  null
);

export function useAccordion(): AccordionContextValue {
  const context = use(AccordionContext);

  if (context === null) {
    throw new Error('Component must be wrapped by "Accordion"');
  }

  return context;
}
