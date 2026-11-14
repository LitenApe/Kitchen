import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Field } from '../field';
import Radio from '../radio/Radio';
import RadioGroup from './RadioGroup';

describe('Radios general behavior', () => {
  test('renders without crashing', async () => {
    await render(<RadioGroup />);
  });

  test('renders children', async () => {
    await render(
      <RadioGroup>
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    const radios = page.getByRole('radio').all();
    expect(radios).toHaveLength(2);
  });

  test('radios share name', async () => {
    await render(
      <RadioGroup name="test-name">
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    const radios = page.getByRole('radio').all();
    expect(radios).toHaveLength(2);
    for (const radio of radios) {
      await expect.element(radio).toHaveAttribute('name', 'test-name');
    }
  });

  test('one event is emitted each click', async () => {
    const mock = vi.fn();
    await render(
      <RadioGroup name="testing-group" onChange={mock}>
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    const radios = page.getByRole('radio').all();

    expect(radios).toHaveLength(2);
    expect(mock).not.toHaveBeenCalled();

    const [radioOne, radioTwo] = radios;

    await userEvent.click(radioOne);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'change', target: radioOne.element() })
    );

    await userEvent.click(radioTwo);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'change', target: radioTwo.element() })
    );

    await userEvent.click(radioOne);
    expect(mock).toHaveBeenCalledTimes(3);
    expect(mock).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'change', target: radioOne.element() })
    );
  });

  test('onBlur is not invoked when focus remains inside of group', async () => {
    const mock = vi.fn();
    await render(
      <RadioGroup name="testing-group" onBlur={mock}>
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    const radios = page.getByRole('radio').elements();

    expect(mock).not.toHaveBeenCalled();
    radios[0].focus();
    expect(mock).not.toHaveBeenCalled();
    radios[1].focus();
    expect(mock).not.toHaveBeenCalled();
  });

  test('onBlur is invoked when focus moves outside of radio group', async () => {
    const mock = vi.fn();
    await render(
      <RadioGroup name="testing-group" onBlur={mock}>
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    const radios = page.getByRole('radio').elements();

    expect(mock).toHaveBeenCalledTimes(0);
    radios[0].focus();
    radios[0].blur();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('renders a fieldset with the radiogroup role', async () => {
    await render(
      <RadioGroup>
        <Radio value="1" />
      </RadioGroup>
    );

    expect(page.getByRole('radiogroup').element().nodeName).toBe('FIELDSET');
  });

  test("a radio's own props take precedence over the group's", async () => {
    await render(
      <RadioGroup name="group">
        <Radio value="1" name="own" />
      </RadioGroup>
    );

    await expect
      .element(page.getByRole('radio'))
      .toHaveAttribute('name', 'own');
  });

  test("a radio's own onBlur is invoked as well", async () => {
    const mock = vi.fn();
    await render(
      <RadioGroup name="testing-group">
        <Radio value="1" onBlur={mock} />
      </RadioGroup>
    );
    const radio = page.getByRole('radio').element();

    radio.focus();
    radio.blur();

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('ref is attached to the fieldset without affecting onBlur', async () => {
    const ref = createRef<HTMLFieldSetElement>();
    const mock = vi.fn();
    await render(
      <RadioGroup ref={ref} name="testing-group" onBlur={mock}>
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );
    const radios = page.getByRole('radio').elements();

    expect(ref.current).toBe(page.getByRole('radiogroup').element());
    radios[0].focus();
    radios[1].focus();
    expect(mock).not.toHaveBeenCalled();
  });

  test('is valid without an error', async () => {
    await render(
      <RadioGroup>
        <Radio value="1" />
      </RadioGroup>
    );

    await expect
      .element(page.getByRole('radiogroup'))
      .toHaveAttribute('aria-invalid', 'false');
  });

  test('an error marks the group as invalid, rather than its radios', async () => {
    await render(
      <RadioGroup error="Choose an option">
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    await expect
      .element(page.getByRole('radiogroup'))
      .toHaveAttribute('aria-invalid', 'true');
    for (const radio of page.getByRole('radio').all()) {
      await expect.element(radio).not.toHaveAttribute('aria-invalid');
    }
  });

  test('an error keeps every radio from being submitted', async () => {
    await render(
      <RadioGroup error="Choose an option">
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
    );

    for (const radio of page.getByRole('radio').elements()) {
      expect(radio).toHaveProperty('validationMessage', 'Choose an option');
    }
  });

  test('aria-describedby describes the group rather than its radios', async () => {
    await render(
      <RadioGroup aria-describedby="hint">
        <Radio value="1" />
      </RadioGroup>
    );

    await expect
      .element(page.getByRole('radiogroup'))
      .toHaveAttribute('aria-describedby', 'hint');
    await expect
      .element(page.getByRole('radio'))
      .not.toHaveAttribute('aria-describedby');
  });

  test('takes the error and description of a surrounding field', async () => {
    await render(
      <Field error="Choose an option" aria-describedby="message">
        <RadioGroup>
          <Radio value="1" />
        </RadioGroup>
      </Field>
    );
    const group = page.getByRole('radiogroup');

    await expect.element(group).toHaveAttribute('aria-invalid', 'true');
    await expect.element(group).toHaveAttribute('aria-describedby', 'message');
  });

  test('aria-label and aria-required apply to the group rather than its radios', async () => {
    await render(
      <RadioGroup aria-label="Size" aria-required>
        <Radio value="1" />
      </RadioGroup>
    );

    await expect
      .element(page.getByRole('radiogroup', { name: 'Size' }))
      .toHaveAttribute('aria-required', 'true');

    const radio = page.getByRole('radio');
    await expect.element(radio).not.toHaveAttribute('aria-label');
    await expect.element(radio).not.toHaveAttribute('aria-required');
  });

  test('aria-labelledby names the group rather than its radios', async () => {
    await render(
      <>
        <p id="size-label">Size</p>
        <RadioGroup aria-labelledby="size-label">
          <Radio value="1" />
        </RadioGroup>
      </>
    );

    await expect
      .element(page.getByRole('radiogroup', { name: 'Size' }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole('radio'))
      .not.toHaveAttribute('aria-labelledby');
  });
});
