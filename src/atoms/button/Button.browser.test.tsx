import { type SubmitEvent, createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import Button from './Button';

/** Keeps a submit from navigating away from the test page. */
function preventSubmit(event: SubmitEvent) {
  event.preventDefault();
}

describe('Button general behavior', () => {
  test('renders button text', async () => {
    await render(<Button>Test</Button>);
    await expect
      .element(page.getByRole('button', { name: 'Test' }))
      .toBeVisible();
  });

  test('click handler is invoked', async () => {
    const mockOnClick = vi.fn();
    await render(<Button onClick={mockOnClick}>Test</Button>);

    expect(mockOnClick).toHaveBeenCalledTimes(0);
    await userEvent.click(page.getByRole('button', { name: 'Test' }));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('does not submit a surrounding form by default', async () => {
    const onSubmit = vi.fn(preventSubmit);
    await render(
      <form onSubmit={onSubmit}>
        <Button>Test</Button>
      </form>
    );
    const button = page.getByRole('button', { name: 'Test' });

    await userEvent.click(button);

    expect(onSubmit).not.toHaveBeenCalled();
    await expect.element(button).toHaveAttribute('type', 'button');
  });

  // a component which forwards its props passes `type` on as undefined
  test('does not submit a surrounding form when its type is undefined', async () => {
    const onSubmit = vi.fn(preventSubmit);
    await render(
      <form onSubmit={onSubmit}>
        <Button type={undefined}>Test</Button>
      </form>
    );
    const button = page.getByRole('button', { name: 'Test' });

    await userEvent.click(button);

    expect(onSubmit).not.toHaveBeenCalled();
    await expect.element(button).toHaveAttribute('type', 'button');
  });

  test('submits a surrounding form when its type is "submit"', async () => {
    const onSubmit = vi.fn(preventSubmit);
    await render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Test</Button>
      </form>
    );

    await userEvent.click(page.getByRole('button', { name: 'Test' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('refs are attached to DOM element', async () => {
    const ref = createRef<HTMLButtonElement>();
    await render(<Button ref={ref}>Test</Button>);

    expect(ref.current).toBe(
      page.getByRole('button', { name: 'Test' }).element()
    );
  });

  // disabled buttons are not actionable for Playwright,
  // so the click has to be forced to reach the button
  test('disabled keeps the button from being clicked or submitting', async () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn(preventSubmit);
    await render(
      <form onSubmit={onSubmit}>
        <Button type="submit" disabled onClick={onClick}>
          Test
        </Button>
      </form>
    );
    const button = page.getByRole('button', { name: 'Test' });

    await expect.element(button).toBeDisabled();
    await userEvent.click(button, { force: true });

    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('aria-disabled is passed on without ignoring clicks', async () => {
    const onClick = vi.fn();
    await render(
      <Button aria-disabled onClick={onClick}>
        Test
      </Button>
    );
    const button = page.getByRole('button', { name: 'Test' });

    await expect.element(button).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(button, { force: true });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
