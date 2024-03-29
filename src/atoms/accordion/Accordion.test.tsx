import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionHeader, AccordionPanel } from '.';
import { AccordionContext, useAccordion } from './bones/AccordionContext';

describe('Accordion general behavior', () => {
  describe('Accordion main wrapping component', () => {
    test('renders without crashing', () => {
      render(<Accordion></Accordion>);
    });

    test('open is "false" by default', () => {
      render(
        <Accordion>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.open}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const container = screen.getByTestId('test-container');
      expect(container).toHaveTextContent('false');
    });

    test('initial sets initial open state', () => {
      render(
        <Accordion initial={true}>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.open}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const container = screen.getByTestId('test-container');
      expect(container).toHaveTextContent('true');
    });

    test('onClick toggles open state', () => {
      render(
        <Accordion>
          <AccordionContext.Consumer>
            {(value) => (
              <button onClick={value?.onClick}>{`${value?.open}`}</button>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('false');

      userEvent.click(button);
      expect(button).toHaveTextContent('true');

      userEvent.click(button);
      expect(button).toHaveTextContent('false');
    });

    test('onClick prop is invoked with requested open state', () => {
      const mock = jest.fn();
      const { rerender } = render(
        <Accordion open={false} onClick={mock}>
          <AccordionContext.Consumer>
            {(value) => (
              <button onClick={value?.onClick}>{`${value?.open}`}</button>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      expect(mock).not.toHaveBeenCalled();
      const button = screen.getByRole('button');

      userEvent.click(button);
      expect(mock).toBeCalledTimes(1);
      expect(mock.mock.calls[0][1]).toBe(true);

      rerender(
        <Accordion open={true} onClick={mock}>
          <AccordionContext.Consumer>
            {(value) => (
              <button onClick={value?.onClick}>{`${value?.open}`}</button>
            )}
          </AccordionContext.Consumer>
        </Accordion>
      );

      userEvent.click(button);
      expect(mock).toBeCalledTimes(2);
      expect(mock.mock.calls[1][1]).toBe(false);
    });

    test('Accordion context provides an id', () => {
      render(
        <Accordion>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.id}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const container = screen.getByTestId('test-container');
      expect(container).toHaveTextContent(/accordion-\d+/);
    });
  });

  describe('Accordion Header general behavior', () => {
    test('renders without crashing', () => {
      render(
        <Accordion>
          <AccordionHeader>content</AccordionHeader>
        </Accordion>
      );
    });

    test('renders with aria-attributes', () => {
      render(
        <Accordion>
          <AccordionHeader>content</AccordionHeader>
          <AccordionContext.Consumer>
            {(value) => <p data-testid="test-container">{`${value?.id}`}</p>}
          </AccordionContext.Consumer>
        </Accordion>
      );

      const id = screen.getByTestId('test-container').innerHTML;
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', `${id}_button`);
      expect(button).toHaveAttribute('aria-controls', `${id}_content`);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('toggles open state on click', () => {
      render(
        <Accordion>
          <AccordionHeader>content</AccordionHeader>
        </Accordion>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      userEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('prints an warning to the console if "open" is missing while the component is in controlled mode', () => {
      const original = global.console.warn;
      const mock = jest.fn();
      global.console.warn = mock;

      render(
        <Accordion onClick={jest.fn()}>
          <AccordionHeader>content</AccordionHeader>
        </Accordion>
      );

      const button = screen.getByRole('button');
      expect(mock).not.toBeCalled();

      userEvent.click(button);
      expect(mock).toBeCalledTimes(1);
      global.console.warn = original;
    });

    test('disabled suppresses click event', () => {
      const mock = jest.fn();
      render(
        <Accordion onClick={jest.fn()}>
          <AccordionHeader disabled>content</AccordionHeader>
        </Accordion>
      );
      const button = screen.getByRole('button');

      expect(mock).not.toHaveBeenCalled();
      userEvent.click(button);
      expect(mock).not.toHaveBeenCalled();
    });

    test('aria-disabled suppresses click event', () => {
      const mock = jest.fn();
      render(
        <Accordion onClick={jest.fn()}>
          <AccordionHeader aria-disabled>content</AccordionHeader>
        </Accordion>
      );
      const button = screen.getByRole('button');

      expect(mock).not.toHaveBeenCalled();
      userEvent.click(button);
      expect(mock).not.toHaveBeenCalled();
    });

    test('aria-disabled is used when button is disabled', () => {
      const { rerender } = render(
        <Accordion onClick={jest.fn()}>
          <AccordionHeader disabled>content</AccordionHeader>
        </Accordion>
      );
      const button = screen.getByRole('button');

      expect(button).not.toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');

      rerender(
        <Accordion onClick={jest.fn()}>
          <AccordionHeader aria-disabled>content</AccordionHeader>
        </Accordion>
      );

      expect(button).not.toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Accordion Panel general behavior', () => {
    test('renders without crashing', () => {
      render(
        <Accordion>
          <AccordionPanel></AccordionPanel>
        </Accordion>
      );
    });

    test('renders with aria-attributes', () => {
      render(
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

      const panel = screen.getByTestId('accordion-panel');
      const id = screen.getByTestId('test-id-container').innerHTML;
      const open = screen.getByTestId('test-state-container');

      expect(panel).toHaveAttribute('id', `${id}_content`);
      expect(panel).toHaveAttribute('aria-labelledby', `${id}_button`);
      expect(panel).toHaveAttribute(
        'aria-hidden',
        open.innerHTML === 'true' ? 'false' : 'true'
      );
    });

    test('aria-hidden value is determined by open state', () => {
      const { rerender } = render(
        <Accordion open={false}>
          <AccordionPanel data-testid="accordion-panel"></AccordionPanel>
        </Accordion>
      );

      const panel = screen.getByTestId('accordion-panel');

      expect(panel).toHaveAttribute('aria-hidden', 'true');

      rerender(
        <Accordion open={true}>
          <AccordionPanel data-testid="accordion-panel"></AccordionPanel>
        </Accordion>
      );

      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('useAccordion general behavior', () => {
    test('throws error if AccordionContext provider is not an parent', () => {
      const { result } = renderHook(() => useAccordion());
      expect(result.error?.message).toBe(
        'Component must be wrapped by "Accordion"'
      );
    });
  });
});
