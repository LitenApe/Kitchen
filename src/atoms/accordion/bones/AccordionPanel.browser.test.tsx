import { type ReactNode, useState } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Accordion from '../Accordion';
import { AccordionContext } from './AccordionContext';
import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';

/** Places the panel in an accordion which is either open or closed. */
function inAccordion(panel: ReactNode, open = false) {
  return (
    <AccordionContext
      value={{ headerId: 'header', panelId: 'panel', open, onClick: () => {} }}
    >
      {panel}
    </AccordionContext>
  );
}

type ShippingProps = {
  /** The panel of the accordion. */
  children: ReactNode;
  startsOpen?: boolean;
};

/** A real accordion, whose user opens and closes it whenever it asks. */
function Shipping({ children, startsOpen = false }: ShippingProps) {
  const [open, setOpen] = useState(startsOpen);

  return (
    <Accordion open={open} onOpenChange={setOpen}>
      <AccordionHeader>Shipping</AccordionHeader>
      {children}
    </Accordion>
  );
}

describe('AccordionPanel general behavior', () => {
  test('is labelled by the header of its accordion', async () => {
    await render(inAccordion(<AccordionPanel data-testid="panel" />));
    const panel = page.getByTestId('panel');

    await expect.element(panel).toHaveAttribute('id', 'panel');
    await expect.element(panel).toHaveAttribute('aria-labelledby', 'header');
  });

  test('shows its children only while its accordion is open', async () => {
    const { rerender } = await render(
      inAccordion(<AccordionPanel>Details</AccordionPanel>, false)
    );
    const details = page.getByText('Details');
    await expect.element(details).not.toBeVisible();

    await rerender(inAccordion(<AccordionPanel>Details</AccordionPanel>, true));
    await expect.element(details).toBeVisible();
  });

  // its padding and border would otherwise show as an empty box
  test('takes up no space while its accordion is closed', async () => {
    await render(
      inAccordion(
        <AccordionPanel
          data-testid="panel"
          style={{ padding: '16px', border: '2px solid' }}
        >
          Details
        </AccordionPanel>
      )
    );
    const panel = page.getByTestId('panel');

    await expect.element(panel).not.toBeVisible();
    expect(panel.element().getBoundingClientRect().height).toBe(0);
  });

  // the `hidden` attribute only hides an element through the browser's own
  // styles, which a display of its own would override
  test('stays hidden while closed when given a display of its own', async () => {
    await render(
      inAccordion(
        <AccordionPanel data-testid="panel" style={{ display: 'flex' }}>
          Details
        </AccordionPanel>
      )
    );
    const panel = page.getByTestId('panel');

    await expect.element(panel).not.toBeVisible();
    expect(panel.element().getBoundingClientRect().height).toBe(0);
  });

  test('passes other props to its element', async () => {
    await render(
      inAccordion(<AccordionPanel data-testid="panel" className="custom" />)
    );
    await expect.element(page.getByTestId('panel')).toHaveClass('custom');
  });

  test('is a region named by its header', async () => {
    await render(
      <Shipping startsOpen>
        <AccordionPanel>Details</AccordionPanel>
      </Shipping>
    );
    const region = page.getByRole('region', { name: 'Shipping' });

    await expect.element(region).toBeVisible();
    await expect.element(region).toHaveTextContent('Details');
  });

  // a component which forwards its props passes them on as undefined
  test('stays a region when region is undefined', async () => {
    await render(
      <Shipping startsOpen>
        <AccordionPanel region={undefined}>Details</AccordionPanel>
      </Shipping>
    );

    await expect
      .element(page.getByRole('region', { name: 'Shipping' }))
      .toBeVisible();
  });

  // many open regions crowd the landmarks screen readers list
  test('is no landmark when region is false, while its header still controls it', async () => {
    await render(
      <Shipping startsOpen>
        <AccordionPanel region={false}>Details</AccordionPanel>
      </Shipping>
    );
    const details = page.getByText('Details');

    await expect.element(details).toBeVisible();
    await expect.element(page.getByRole('region')).not.toBeInTheDocument();
    await expect
      .element(page.getByRole('button', { name: 'Shipping' }))
      .toHaveAttribute('aria-controls', details.element().id);
  });

  test('opens together with a real accordion', async () => {
    await render(
      <Shipping>
        <AccordionPanel>Details</AccordionPanel>
      </Shipping>
    );

    await userEvent.click(page.getByRole('button'));

    await expect.element(page.getByText('Details')).toBeVisible();
  });

  test('keeps the state of its content while its accordion is closed', async () => {
    await render(
      <Shipping startsOpen>
        <AccordionPanel>
          <input aria-label="Address" />
        </AccordionPanel>
      </Shipping>
    );
    const header = page.getByRole('button', { name: 'Shipping' });
    // a hidden input has no role, as it is left out of the accessibility tree
    const address = page.getByRole('textbox', {
      name: 'Address',
      includeHidden: true,
    });
    await userEvent.fill(address, 'Main Street 1');

    await userEvent.click(header);
    await expect.element(address).not.toBeVisible();

    await userEvent.click(header);
    await expect.element(address).toBeVisible();
    await expect.element(address).toHaveValue('Main Street 1');
  });
});
