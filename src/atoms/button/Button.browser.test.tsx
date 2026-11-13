import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import Button from './Button';

describe('Button general behavior', () => {
  test('renders button text', async () => {
    await render(<Button>Test</Button>);
    await expect.element(page.getByText('Test')).toBeInTheDocument();
  });

  test('click handler is invoked', async () => {
    const mockOnClick = vi.fn();
    await render(<Button onClick={mockOnClick}>Test</Button>);
    const button = page.getByText('Test');

    expect(mockOnClick).toHaveBeenCalledTimes(0);
    await userEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('is type of "button" by default', async () => {
    await render(<Button>Test</Button>);
    const button = page.getByText('Test');
    await expect.element(button).toHaveAttribute('type', 'button');
  });

  test('type can be overriden', async () => {
    await render(<Button type="submit">Test</Button>);
    const button = page.getByText('Test');
    await expect.element(button).toHaveAttribute('type', 'submit');
  });

  test('renders as button element by default', async () => {
    await render(<Button>Test</Button>);
    const button = page.getByText('Test');
    expect(button.element().nodeName).toEqual('BUTTON');
  });

  test('renders as anchor element when overriden', async () => {
    await render(<Button as="a">Test</Button>);
    const button = page.getByText('Test');
    expect(button.element().nodeName).toEqual('A');
  });

  test('has no type when rendered as anchor', async () => {
    await render(<Button as="a">Test</Button>);
    const button = page.getByText('Test');
    await expect.element(button).not.toHaveAttribute('type');
  });

  test('refs are attached to DOM element', async () => {
    const ref = createRef<HTMLButtonElement>();
    await render(<Button ref={ref}>Test</Button>);

    expect(ref.current).not.toBeNull();
    await expect.element(ref.current).toHaveTextContent('Test');
  });

  // aria-disabled buttons are not actionable for Playwright,
  // so the click has to be forced to reach the handler
  test('disabled suppresses click event', async () => {
    const mock = vi.fn();
    await render(
      <Button onClick={mock} disabled>
        test
      </Button>
    );
    const button = page.getByRole('button');

    expect(mock).not.toHaveBeenCalled();
    await userEvent.click(button, { force: true });
    expect(mock).not.toHaveBeenCalled();
  });

  test('aria-disabled suppresses click event', async () => {
    const mock = vi.fn();
    await render(
      <Button onClick={mock} aria-disabled>
        test
      </Button>
    );
    const button = page.getByRole('button');

    expect(mock).not.toHaveBeenCalled();
    await userEvent.click(button, { force: true });
    expect(mock).not.toHaveBeenCalled();
  });

  test('aria-disabled is used when button is disabled', async () => {
    const { rerender } = await render(<Button disabled>test</Button>);
    const button = page.getByRole('button');

    await expect.element(button).not.toHaveAttribute('disabled');
    await expect.element(button).toHaveAttribute('aria-disabled', 'true');

    await rerender(<Button aria-disabled>test</Button>);

    await expect.element(button).not.toHaveAttribute('disabled');
    await expect.element(button).toHaveAttribute('aria-disabled', 'true');
  });
});
