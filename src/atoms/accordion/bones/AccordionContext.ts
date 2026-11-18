import { type MouseEvent, createContext, use } from 'react';

type AccordionContextValue = {
  /** The id of the header, which labels the panel. */
  readonly headerId: string;
  /** The id of the panel, which the header controls. */
  readonly panelId: string;
  readonly open: boolean;
  /** Asks the accordion's user to open or close the accordion. */
  readonly onClick: (event: MouseEvent<HTMLButtonElement>) => void;
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
