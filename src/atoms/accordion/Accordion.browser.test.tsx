import { page, userEvent } from 'vitest/browser';
import { render, renderHook } from 'vitest-browser-react';
import { Accordion, AccordionHeader, AccordionPanel } from '.';
import { AccordionContext, useAccordion } from './bones/AccordionContext';

describe('Accordion general behavior', () => {
  describe('Accordion main wrapping component', () => {
    test('renders without crashing', async () => {
      await render(<Accordion></Accordion>);
    });

    test('open is "false" by default', async () => {
      await render(
        <Accordion>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.open}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const container = page.getByTestId('test-container');
      await expect.element(container).toHaveTextContent('false');
    });

    test('initial sets initial open state', async () => {
      await render(
        <Accordion initial={true}>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.open}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const container = page.getByTestId('test-container');
      await expect.element(container).toHaveTextContent('true');
    });

    test('onClick toggles open state', async () => {
      await render(
        <Accordion>
          <AccordionContext.Consumer>
            {(value) => (
              <button onClick={value?.onClick}>{`${value?.open}`}</button>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const button = page.getByRole('button');
      await expect.element(button).toHaveTextContent('false');

      await userEvent.click(button);
      await expect.element(button).toHaveTextContent('true');

      await userEvent.click(button);
      await expect.element(button).toHaveTextContent('false');
    });

    test('onClick prop is invoked with requested open state', async () => {
      const mock = vi.fn();
      const { rerender } = await render(
        <Accordion open={false} onClick={mock}>
          <AccordionContext.Consumer>
            {(value) => (
              <button onClick={value?.onClick}>{`${value?.open}`}</button>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      expect(mock).not.toHaveBeenCalled();
      const button = page.getByRole('button');

      await userEvent.click(button);
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock.mock.calls[0][1]).toBe(true);

      await rerender(
        <Accordion open={true} onClick={mock}>
          <AccordionContext.Consumer>
            {(value) => (
              <button onClick={value?.onClick}>{`${value?.open}`}</button>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      await userEvent.click(button);
      expect(mock).toHaveBeenCalledTimes(2);
      expect(mock.mock.calls[1][1]).toBe(false);
    });

    test('Accordion context provides an id', async () => {
      await render(
        <Accordion>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.id}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const container = page.getByTestId('test-container');
      await expect.element(container).toMatchTextContent(/accordion-\d+/);
    });
  });

  describe('Accordion Header general behavior', () => {
    test('renders without crashing', async () => {
      await render(
        <Accordion>
          <AccordionHeader>content</AccordionHeader>
        </Accordion>
      );
    });

    test('renders with aria-attributes', async () => {
      await render(
        <Accordion>
          <AccordionHeader>content</AccordionHeader>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.id}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const id = page.getByTestId('test-container').element().innerHTML;
      const button = page.getByRole('button');
      await expect.element(button).toHaveAttribute('id', `${id}_button`);
      await expect
        .element(button)
        .toHaveAttribute('aria-controls', `${id}_content`);
      await expect.element(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('toggles open state on click', async () => {
      await render(
        <Accordion>
          <AccordionHeader>content</AccordionHeader>
        </Accordion>
      );

      const button = page.getByRole('button');
      await expect.element(button).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(button);
      await expect.element(button).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(button);
      await expect.element(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('prints an warning to the console if "open" is missing while the component is in controlled mode', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await render(
        <Accordion onClick={vi.fn()}>
          <AccordionHeader>content</AccordionHeader>
        </Accordion>
      );

      const button = page.getByRole('button');
      expect(warn).not.toHaveBeenCalled();

      await userEvent.click(button);
      expect(warn).toHaveBeenCalledTimes(1);
      warn.mockRestore();
    });

    // aria-disabled buttons are not actionable for Playwright,
    // so the click has to be forced to reach the handler
    test('disabled suppresses click event', async () => {
      const mock = vi.fn();
      await render(
        <Accordion onClick={mock}>
          <AccordionHeader disabled>content</AccordionHeader>
        </Accordion>
      );
      const button = page.getByRole('button');

      expect(mock).not.toHaveBeenCalled();
      await userEvent.click(button, { force: true });
      expect(mock).not.toHaveBeenCalled();
    });

    test('aria-disabled suppresses click event', async () => {
      const mock = vi.fn();
      await render(
        <Accordion onClick={mock}>
          <AccordionHeader aria-disabled>content</AccordionHeader>
        </Accordion>
      );
      const button = page.getByRole('button');

      expect(mock).not.toHaveBeenCalled();
      await userEvent.click(button, { force: true });
      expect(mock).not.toHaveBeenCalled();
    });

    test('aria-disabled is used when button is disabled', async () => {
      const { rerender } = await render(
        <Accordion onClick={vi.fn()}>
          <AccordionHeader disabled>content</AccordionHeader>
        </Accordion>
      );
      const button = page.getByRole('button');

      await expect.element(button).not.toHaveAttribute('disabled');
      await expect.element(button).toHaveAttribute('aria-disabled', 'true');

      await rerender(
        <Accordion onClick={vi.fn()}>
          <AccordionHeader aria-disabled>content</AccordionHeader>
        </Accordion>
      );

      await expect.element(button).not.toHaveAttribute('disabled');
      await expect.element(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Accordion Panel general behavior', () => {
    test('renders without crashing', async () => {
      await render(
        <Accordion>
          <AccordionPanel></AccordionPanel>
        </Accordion>
      );
    });

    test('renders with aria-attributes', async () => {
      await render(
        <Accordion>
          <AccordionPanel data-testid="accordion-panel"></AccordionPanel>
          <AccordionContext.Consumer>
            {(value) => (
              <>
                <p data-testid="test-id-container">{value?.id}</p>
                <p data-testid="test-state-container">{`${value?.open}`}</p>
              </>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const panel = page.getByTestId('accordion-panel');
      const id = page.getByTestId('test-id-container').element().innerHTML;
      const open = page.getByTestId('test-state-container').element();

      await expect.element(panel).toHaveAttribute('id', `${id}_content`);
      await expect
        .element(panel)
        .toHaveAttribute('aria-labelledby', `${id}_button`);
      await expect
        .element(panel)
        .toHaveAttribute(
          'aria-hidden',
          open.innerHTML === 'true' ? 'false' : 'true'
        );
    });

    test('aria-hidden value is determined by open state', async () => {
      const { rerender } = await render(
        <Accordion open={false}>
          <AccordionPanel data-testid="accordion-panel"></AccordionPanel>
        </Accordion>
      );

      const panel = page.getByTestId('accordion-panel');

      await expect.element(panel).toHaveAttribute('aria-hidden', 'true');

      await rerender(
        <Accordion open={true}>
          <AccordionPanel data-testid="accordion-panel"></AccordionPanel>
        </Accordion>
      );

      await expect.element(panel).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('useAccordion general behavior', () => {
    test('throws error if AccordionContext provider is not an parent', async () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(renderHook(() => useAccordion())).rejects.toThrow(
        'Component must be wrapped by "Accordion"'
      );

      error.mockRestore();
    });
  });
});
