import type { ReactNode } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Accordion from '../Accordion';
import { AccordionContext } from './AccordionContext';
import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';

/** Places the panel in an accordion which is either open or closed. */
function inAccordion(panel: ReactNode, open = false) {
  return (
    <AccordionContext value={{ id: 'accordion', open, onClick: () => {} }}>
      {panel}
    </AccordionContext>
  );
}

describe('AccordionPanel general behavior', () => {
  test('is labelled by the header of its accordion', async () => {
    await render(inAccordion(<AccordionPanel data-testid="panel" />));
    const panel = page.getByTestId('panel');

    await expect.element(panel).toHaveAttribute('id', 'accordion_content');
    await expect
      .element(panel)
      .toHaveAttribute('aria-labelledby', 'accordion_button');
  });

  test('shows its children only while its accordion is open', async () => {
    const { rerender } = await render(
      inAccordion(
        <AccordionPanel data-testid="panel">Details</AccordionPanel>,
        false
      )
    );
    const panel = page.getByTestId('panel');
    await expect.element(panel).toHaveAttribute('aria-hidden', 'true');
    await expect.element(panel).toBeEmptyDOMElement();

    await rerender(
      inAccordion(
        <AccordionPanel data-testid="panel">Details</AccordionPanel>,
        true
      )
    );
    await expect.element(panel).toHaveAttribute('aria-hidden', 'false');
    await expect.element(panel).toHaveTextContent('Details');
  });

  test('passes other props to its element', async () => {
    await render(
      inAccordion(<AccordionPanel data-testid="panel" className="custom" />)
    );
    await expect.element(page.getByTestId('panel')).toHaveClass('custom');
  });

  test('opens together with a real accordion', async () => {
    await render(
      <Accordion>
        <AccordionHeader>Shipping</AccordionHeader>
        <AccordionPanel>Details</AccordionPanel>
      </Accordion>
    );

    await userEvent.click(page.getByRole('button'));

    await expect.element(page.getByText('Details')).toBeVisible();
  });
});
