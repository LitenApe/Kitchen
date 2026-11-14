import type { MouseEvent, ReactNode } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Accordion from '../Accordion';
import { AccordionContext } from './AccordionContext';
import AccordionHeader from './AccordionHeader';

type AccordionState = {
  open?: boolean;
  onClick?: (event: MouseEvent) => void;
};

/** Places the header in an accordion with the given state. */
function inAccordion(
  header: ReactNode,
  { open = false, onClick = () => {} }: AccordionState = {}
) {
  return (
    <AccordionContext value={{ id: 'accordion', open, onClick }}>
      {header}
    </AccordionContext>
  );
}

describe('AccordionHeader general behavior', () => {
  test('renders a button with its children', async () => {
    await render(inAccordion(<AccordionHeader>Shipping</AccordionHeader>));

    await expect
      .element(page.getByRole('button', { name: 'Shipping' }))
      .toBeInTheDocument();
  });

  test('controls the panel of its accordion', async () => {
    await render(inAccordion(<AccordionHeader />));
    const button = page.getByRole('button');

    await expect.element(button).toHaveAttribute('id', 'accordion_button');
    await expect
      .element(button)
      .toHaveAttribute('aria-controls', 'accordion_content');
  });

  test('shows whether its accordion is open', async () => {
    const { rerender } = await render(
      inAccordion(<AccordionHeader />, { open: false })
    );
    const button = page.getByRole('button');
    await expect.element(button).toHaveAttribute('aria-expanded', 'false');

    await rerender(inAccordion(<AccordionHeader />, { open: true }));
    await expect.element(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('asks its accordion to toggle when clicked', async () => {
    const onClick = vi.fn();
    await render(inAccordion(<AccordionHeader />, { onClick }));

    await userEvent.click(page.getByRole('button'));

    expect(onClick).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ type: 'click' })
    );
  });

  test('calls its own onClick as well', async () => {
    const ownOnClick = vi.fn();
    const onClick = vi.fn();
    await render(
      inAccordion(<AccordionHeader onClick={ownOnClick} />, { onClick })
    );

    await userEvent.click(page.getByRole('button'));

    expect(ownOnClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // aria-disabled buttons are not actionable for Playwright,
  // so the click has to be forced to reach the handler
  test('ignores clicks when disabled', async () => {
    const ownOnClick = vi.fn();
    const onClick = vi.fn();
    await render(
      inAccordion(<AccordionHeader disabled onClick={ownOnClick} />, {
        onClick,
      })
    );

    await userEvent.click(page.getByRole('button'), { force: true });

    expect(ownOnClick).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test('ignores clicks when aria-disabled', async () => {
    const ownOnClick = vi.fn();
    const onClick = vi.fn();
    await render(
      inAccordion(<AccordionHeader aria-disabled onClick={ownOnClick} />, {
        onClick,
      })
    );

    await userEvent.click(page.getByRole('button'), { force: true });

    expect(ownOnClick).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test('stays focusable when disabled', async () => {
    const { rerender } = await render(
      inAccordion(<AccordionHeader disabled />)
    );
    const button = page.getByRole('button');
    await expect.element(button).not.toHaveAttribute('disabled');
    await expect.element(button).toHaveAttribute('aria-disabled', 'true');

    button.element().focus();
    expect(document.activeElement).toBe(button.element());

    await rerender(inAccordion(<AccordionHeader aria-disabled />));
    await expect.element(button).not.toHaveAttribute('disabled');
    await expect.element(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('toggles a real accordion', async () => {
    await render(
      <Accordion>
        <AccordionHeader>Shipping</AccordionHeader>
      </Accordion>
    );
    const button = page.getByRole('button');

    await userEvent.click(button);
    await expect.element(button).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(button);
    await expect.element(button).toHaveAttribute('aria-expanded', 'false');
  });
});
