import { getAccordionIds } from './getAccordionIds';

describe('getAccordionIds', () => {
  test('derives the ids of the header and the panel from the id of the accordion', () => {
    expect(getAccordionIds('shipping')).toEqual({
      headerId: 'shipping_button',
      panelId: 'shipping_content',
    });
  });

  test('gives the headers and panels of other accordions other ids', () => {
    const shipping = getAccordionIds('shipping');
    const returns = getAccordionIds('returns');

    expect(returns.headerId).not.toBe(shipping.headerId);
    expect(returns.panelId).not.toBe(shipping.panelId);
  });
});
