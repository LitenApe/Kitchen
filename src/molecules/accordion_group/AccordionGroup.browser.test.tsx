import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Accordion, AccordionHeader } from '../../atoms/accordion';
import AccordionGroup from './AccordionGroup';

describe('AccordionGroup general behavior', () => {
  test('renders without crashing', async () => {
    await render(<AccordionGroup>{[]}</AccordionGroup>);
  });

  test('all accordions are closed by default', async () => {
    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    const buttons = page.getByRole('button').all();

    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      await expect.element(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('initial open accordion is open when specified', async () => {
    await render(
      <AccordionGroup initial={1}>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    const buttons = page.getByRole('button').all();

    expect(buttons).toHaveLength(3);
    await expect.element(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    await expect.element(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  test('only one accordion is open at the time', async () => {
    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    const buttons = page.getByRole('button').all();

    expect(buttons).toHaveLength(3);
    await expect.element(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(buttons[2]);
    await expect.element(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[2]).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(buttons[0]);
    await expect.element(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    await expect.element(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(buttons[1]);
    await expect.element(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    await expect.element(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(buttons[1]);
    await expect.element(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    await expect.element(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  test('onClick is called with index of clicked button and requested new state', async () => {
    const mock = vi.fn();
    const { rerender } = await render(
      <AccordionGroup onClick={mock} open={-1}>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    const buttons = page.getByRole('button').all();

    expect(mock).not.toHaveBeenCalled();

    await userEvent.click(buttons[1]);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock.mock.calls[0][1]).toBe(1);
    expect(mock.mock.calls[0][2]).toBe(true);

    await rerender(
      <AccordionGroup onClick={mock} open={1}>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    await userEvent.click(buttons[1]);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock.mock.calls[1][1]).toBe(1);
    expect(mock.mock.calls[1][2]).toBe(false);
  });

  test('onClick is suppressed when onClick handler is supplied but open is not', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const mock = vi.fn();
    await render(
      <AccordionGroup onClick={mock}>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    const buttons = page.getByRole('button').all();

    expect(mock).not.toHaveBeenCalled();
    await userEvent.click(buttons[1]);
    expect(mock).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  test('invalid childrens are ignored', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await render(
      <AccordionGroup>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <p data-testid="test-container">fsjks</p>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
        <Accordion>
          <AccordionHeader></AccordionHeader>
        </Accordion>
      </AccordionGroup>
    );

    const testContainer = page.getByTestId('test-container');
    await expect.element(testContainer).not.toBeInTheDocument();

    warn.mockRestore();
  });
});
