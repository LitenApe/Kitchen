type AccordionIds = {
  /** The id of the header, which labels the panel. */
  headerId: string;
  /** The id of the panel, which the header controls. */
  panelId: string;
};

/**
 * Derives the ids which link an accordion's header and panel to each other
 * from the accordion's own id.
 *
 * @param id the accordion's id
 * @returns the ids of the header and the panel
 */
export function getAccordionIds(id: string): AccordionIds {
  return { headerId: `${id}_button`, panelId: `${id}_content` };
}
