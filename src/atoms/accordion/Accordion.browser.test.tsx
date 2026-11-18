import { useState } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Accordion, AccordionHeader, AccordionPanel } from '.';
import { useAccordion } from './bones/AccordionContext';

/** Shows the state of its accordion, and asks it to toggle when clicked. */
function Toggle() {
  const { headerId, open, onClick } = useAccordion();

  return (
    <button data-id={headerId} onClick={onClick}>
      {`${open}`}
    </button>
  );
}

/** An accordion whose user opens and closes it whenever it asks. */
function Shipping() {
  const [open, setOpen] = useState(false);

  return (
    <Accordion open={open} onOpenChange={setOpen}>
      <AccordionHeader>Shipping</AccordionHeader>
      <AccordionPanel>Details</AccordionPanel>
    </Accordion>
  );
}

describe('Accordion general behavior', () => {
  test('follows "open"', async () => {
    const { rerender } = await render(
      <Accordion open={false} onOpenChange={vi.fn()}>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');
    await expect.element(button).toHaveTextContent('false');

    await rerender(
      <Accordion open onOpenChange={vi.fn()}>
        <Toggle />
      </Accordion>
    );
    await expect.element(button).toHaveTextContent('true');
  });

  test('asks for the opposite state through onOpenChange when clicked', async () => {
    const onOpenChange = vi.fn();
    const { rerender } = await render(
      <Accordion open={false} onOpenChange={onOpenChange}>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');

    await userEvent.click(button);
    expect(onOpenChange).toHaveBeenLastCalledWith(
      true,
      expect.objectContaining({ type: 'click' })
    );

    await rerender(
      <Accordion open onOpenChange={onOpenChange}>
        <Toggle />
      </Accordion>
    );

    await userEvent.click(button);
    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ type: 'click' })
    );
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  // its user can refuse a change by leaving "open" as it is
  test('does not open or close by itself when clicked', async () => {
    await render(
      <Accordion open={false} onOpenChange={vi.fn()}>
        <AccordionHeader>Shipping</AccordionHeader>
        <AccordionPanel>Details</AccordionPanel>
      </Accordion>
    );

    await userEvent.click(page.getByRole('button', { name: 'Shipping' }));

    await expect.element(page.getByText('Details')).not.toBeVisible();
  });

  test('opens and closes when its user updates "open" from onOpenChange', async () => {
    await render(<Shipping />);
    const header = page.getByRole('button', { name: 'Shipping' });

    await userEvent.click(header);
    await expect.element(page.getByText('Details')).toBeVisible();

    await userEvent.click(header);
    await expect.element(page.getByText('Details')).not.toBeVisible();
  });

  test('gives every accordion an id of its own', async () => {
    await render(
      <>
        <Accordion open={false} onOpenChange={vi.fn()}>
          <Toggle />
        </Accordion>
        <Accordion open={false} onOpenChange={vi.fn()}>
          <Toggle />
        </Accordion>
      </>
    );
    const [first, second] = page.getByRole('button').elements();

    expect(first.dataset.id).toBeTruthy();
    expect(second.dataset.id).toBeTruthy();
    expect(first.dataset.id).not.toBe(second.dataset.id);
  });

  test('links its header and panel to each other', async () => {
    await render(
      <Accordion open onOpenChange={vi.fn()}>
        <AccordionHeader>Shipping</AccordionHeader>
        <AccordionPanel>Details</AccordionPanel>
      </Accordion>
    );
    // the panel is named by the header which labels it
    const panel = page.getByRole('region', { name: 'Shipping' });

    await expect.element(panel).toBeVisible();
    await expect
      .element(page.getByRole('button', { name: 'Shipping' }))
      .toHaveAttribute('aria-controls', panel.element().id);
  });

  test('passes other props to its element', async () => {
    await render(
      <Accordion
        open={false}
        onOpenChange={vi.fn()}
        data-testid="accordion"
        className="custom"
      />
    );
    await expect.element(page.getByTestId('accordion')).toHaveClass('custom');
  });

  // onClick is the element's own, so it can be used to track clicks
  test('passes onClick on to its element, which also hears clicks on the header', async () => {
    const onClick = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <Accordion open={false} onOpenChange={onOpenChange} onClick={onClick}>
        <AccordionHeader>Shipping</AccordionHeader>
      </Accordion>
    );

    await userEvent.click(page.getByRole('button', { name: 'Shipping' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
      true,
      expect.objectContaining({ type: 'click' })
    );
  });
});
