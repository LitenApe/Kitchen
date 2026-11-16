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

describe('Accordion general behavior', () => {
  test('is closed by default', async () => {
    await render(
      <Accordion>
        <Toggle />
      </Accordion>
    );

    await expect.element(page.getByRole('button')).toHaveTextContent('false');
  });

  test('starts open when "initial" is set', async () => {
    await render(
      <Accordion initial>
        <Toggle />
      </Accordion>
    );

    await expect.element(page.getByRole('button')).toHaveTextContent('true');
  });

  test('toggles itself when uncontrolled', async () => {
    await render(
      <Accordion>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');

    await userEvent.click(button);
    await expect.element(button).toHaveTextContent('true');

    await userEvent.click(button);
    await expect.element(button).toHaveTextContent('false');
  });

  test('follows "open" when controlled', async () => {
    const { rerender } = await render(
      <Accordion open={false} onClick={vi.fn()}>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');
    await expect.element(button).toHaveTextContent('false');

    await rerender(
      <Accordion open onClick={vi.fn()}>
        <Toggle />
      </Accordion>
    );
    await expect.element(button).toHaveTextContent('true');
  });

  test('requests the opposite state through onClick when controlled', async () => {
    const onClick = vi.fn();
    const { rerender } = await render(
      <Accordion open={false} onClick={onClick}>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'click' }),
      true
    );
    // only the user changes "open"
    await expect.element(button).toHaveTextContent('false');

    await rerender(
      <Accordion open onClick={onClick}>
        <Toggle />
      </Accordion>
    );

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onClick).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'click' }),
      false
    );
  });

  test('ignores clicks when controlled without onClick', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await render(
      <Accordion open={false}>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');

    await userEvent.click(button);

    await expect.element(button).toHaveTextContent('false');
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  test('warns and ignores clicks when given onClick without "open"', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const onClick = vi.fn();
    await render(
      <Accordion onClick={onClick}>
        <Toggle />
      </Accordion>
    );
    const button = page.getByRole('button');

    await userEvent.click(button);

    await expect.element(button).toHaveTextContent('false');
    expect(onClick).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  test('gives every accordion an id of its own', async () => {
    await render(
      <>
        <Accordion>
          <Toggle />
        </Accordion>
        <Accordion>
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
      <Accordion initial>
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
    await render(<Accordion data-testid="accordion" className="custom" />);
    await expect.element(page.getByTestId('accordion')).toHaveClass('custom');
  });
});
