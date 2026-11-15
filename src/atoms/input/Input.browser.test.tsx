import { createRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Field } from '../field';
import { Input } from '.';

/** An input which shows how many characters it holds once it holds any. */
function CountedInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      postfix={value === '' ? undefined : `${value.length} characters`}
    />
  );
}

describe('Input default behavior', () => {
  test('renders without crashing', async () => {
    await render(<Input />);
  });

  test('renders as "input" by default', async () => {
    await render(<Input />);
    const element = page.getByRole('textbox');
    expect(element.element().nodeName).toBe('INPUT');
  });

  test('has type "text" by default', async () => {
    await render(<Input />);
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('type', 'text');
  });

  test('has type "tel" when specified', async () => {
    await render(<Input type="tel" />);
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('type', 'tel');
  });

  test('prefix is related to input', async () => {
    await render(<Input prefix="😁" />);
    const element = page.getByRole('textbox');
    const prefixId = element.element().getAttribute('aria-describedby');
    const prefix = page.getByText('😁');

    await expect.element(prefix).toHaveAttribute('id', prefixId);
  });

  test('postfix is related to input', async () => {
    await render(<Input postfix="😁" />);
    const element = page.getByRole('textbox');
    const postfixId = element.element().getAttribute('aria-describedby');
    const postfix = page.getByText('😁');

    await expect.element(postfix).toHaveAttribute('id', postfixId);
  });

  test('shows the prefix before the input', async () => {
    await render(<Input prefix="€" />);
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const prefix = page.getByText('€').element().getBoundingClientRect();

    expect(prefix.right).toBeLessThanOrEqual(input.left);
  });

  test('shows the postfix after the input', async () => {
    await render(<Input postfix="kg" />);
    const input = page.getByRole('textbox').element().getBoundingClientRect();
    const postfix = page.getByText('kg').element().getBoundingClientRect();

    expect(postfix.left).toBeGreaterThanOrEqual(input.right);
  });

  test('keeps its own aria-describedby next to the affix', async () => {
    await render(<Input prefix="€" aria-describedby="hint" />);
    const describedBy = page
      .getByRole('textbox')
      .element()
      .getAttribute('aria-describedby');

    expect(describedBy).toBe(`hint ${page.getByText('€').element().id}`);
  });

  test('passes aria-describedby on unchanged without an affix', async () => {
    await render(<Input aria-describedby="hint" />);

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('aria-describedby', 'hint');
  });

  test('renders JSX prefix', async () => {
    await render(<Input prefix={<span data-testid="test-container" />} />);
    const element = page.getByTestId('test-container');
    await expect.element(element).toBeInTheDocument();
  });

  test('renders JSX postfix', async () => {
    await render(<Input postfix={<span data-testid="test-container" />} />);
    const element = page.getByTestId('test-container');
    await expect.element(element).toBeInTheDocument();
  });

  test('has "id" when wrapped by "Field"', async () => {
    await render(
      <Field>
        <Input />
      </Field>
    );
    const element = page.getByRole('textbox');
    await expect.element(element).toHaveAttribute('id');
  });

  test('prefix on Field is passed down to Input', async () => {
    await render(
      <Field prefix="😁">
        <Input />
      </Field>
    );

    const element = page.getByRole('textbox');
    const prefixId = element.element().getAttribute('aria-describedby');
    const prefix = page.getByText('😁');

    await expect.element(prefix).toHaveAttribute('id', prefixId);
  });

  test('postfix on Field is passed down to Input', async () => {
    await render(
      <Field postfix="😁">
        <Input />
      </Field>
    );

    const element = page.getByRole('textbox');
    const postfixId = element.element().getAttribute('aria-describedby');
    const postfix = page.getByText('😁');

    await expect.element(postfix).toHaveAttribute('id', postfixId);
  });

  test('its own id takes precedence over the one from "Field"', async () => {
    await render(
      <Field>
        <Input id="own" />
      </Field>
    );

    await expect
      .element(page.getByRole('textbox'))
      .toHaveAttribute('id', 'own');
  });

  test('takes props from "Field", where its own props take precedence', async () => {
    await render(
      <Field name="field" placeholder="field" aria-invalid>
        <Input placeholder="own" />
      </Field>
    );
    const input = page.getByRole('textbox');

    await expect.element(input).toHaveAttribute('name', 'field');
    await expect.element(input).toHaveAttribute('placeholder', 'own');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('attaches its ref to the input', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Input ref={ref} />);

    expect(ref.current).toBe(page.getByRole('textbox').element());
  });

  // the HTML parser ends a paragraph where a div starts, which would move a
  // server rendered input out of its paragraph
  test('stays inside a paragraph when rendered on the server', async () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(
      <p>
        Weight <Input postfix="kg" />
      </p>
    );
    document.body.append(container);
    onTestFinished(() => container.remove());

    const input = page.getByRole('textbox');
    await expect.element(input).toBeVisible();
    expect(container.querySelector('p')?.contains(input.element())).toBe(true);
  });
});

// React replaces an element whose parent element changes, which would lose the
// focus of the input and what was typed into it
describe('Input with an affix which comes and goes', () => {
  test('keeps its focus when a postfix appears while typing', async () => {
    await render(<CountedInput />);
    const input = page.getByRole('textbox');

    await userEvent.click(input);
    await userEvent.keyboard('abc');

    await expect.element(input).toBeVisible();
    await expect.element(input).toHaveFocus();
    await expect.element(input).toHaveValue('abc');
    await expect.element(page.getByText('3 characters')).toBeVisible();
  });

  test('keeps what was typed when its affix is added, replaced or removed', async () => {
    const { rerender } = await render(<Input />);
    const input = page.getByRole('textbox');
    await userEvent.fill(input, '42');

    await rerender(<Input prefix="€" />);
    await expect.element(page.getByText('€')).toBeVisible();
    await expect.element(input).toHaveValue('42');

    await rerender(<Input postfix="EUR" />);
    await expect.element(page.getByText('EUR')).toBeVisible();
    await expect.element(input).toHaveValue('42');

    await rerender(<Input />);
    await expect.element(input).toBeVisible();
    await expect.element(input).toHaveValue('42');
  });
});
