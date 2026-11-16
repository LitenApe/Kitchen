import { type MouseEvent, createContext, use } from 'react';

type AccordionContextValue = {
  /** The id of the header, which labels the panel. */
  readonly headerId: string;
  /** The id of the panel, which the header controls. */
  readonly panelId: string;
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
