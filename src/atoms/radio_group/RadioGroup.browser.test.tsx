import { type FocusEvent, createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { Field } from '../field';
import { Label } from '../label';
import { Legend } from '../legend';
import Radio from '../radio/Radio';
import RadioGroup from './RadioGroup';

describe('Radios general behavior', () => {
  test('renders without crashing', async () => {
    await render(<RadioGroup name="size" />);
  });

  test('renders children', async () => {
    await render(
      <RadioGroup name="size">
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

  test('shares required, disabled and form with its radios', async () => {
    await render(
      <>
        <form id="order" />
        <RadioGroup name="size" required disabled form="order">
          <Radio value="small" />
          <Radio value="large" />
        </RadioGroup>
      </>
    );

    for (const radio of page.getByRole('radio').all()) {
      await expect.element(radio).toBeRequired();
      await expect.element(radio).toBeDisabled();
      await expect.element(radio).toHaveAttribute('form', 'order');
    }
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

  test('onBlur is not invoked when focus moves between a radio and another control inside the group', async () => {
    const mock = vi.fn();
    await render(
      <RadioGroup name="size" onBlur={mock}>
        <Radio value="other" aria-label="Other" />
        <input aria-label="Other size" />
      </RadioGroup>
    );
    const radio = page.getByRole('radio', { name: 'Other' });

    await userEvent.click(radio);
    await userEvent.click(page.getByRole('textbox', { name: 'Other size' }));
    await userEvent.click(radio);

    expect(mock).not.toHaveBeenCalled();
  });

  test('onBlur is invoked when focus leaves the group from another control inside it', async () => {
    const mock = vi.fn();
    await render(
      <>
        <RadioGroup name="size" onBlur={mock}>
          <Radio value="other" aria-label="Other" />
          <input aria-label="Other size" />
        </RadioGroup>
        <button>Next</button>
      </>
    );

    await userEvent.click(page.getByRole('textbox', { name: 'Other size' }));
    await userEvent.click(page.getByRole('button', { name: 'Next' }));

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('onBlur receives the radio which lost focus as its target, and the fieldset as its currentTarget', async () => {
    // React clears currentTarget once the handler has run, so both are kept
    let target: EventTarget | undefined;
    let currentTarget: EventTarget | undefined;
    const mock = vi.fn((event: FocusEvent<HTMLFieldSetElement>) => {
      target = event.target;
      currentTarget = event.currentTarget;
    });
    await render(
      <>
        <RadioGroup name="size" onBlur={mock}>
          <Radio value="small" aria-label="Small" />
        </RadioGroup>
        <button>Next</button>
      </>
    );
    const radio = page.getByRole('radio', { name: 'Small' });

    await userEvent.click(radio);
    await userEvent.click(page.getByRole('button', { name: 'Next' }));

    expect(mock).toHaveBeenCalledTimes(1);
    expect(target).toBe(radio.element());
    expect(currentTarget).toBe(page.getByRole('radiogroup').element());
  });

  test('renders a fieldset with the radiogroup role', async () => {
    await render(
      <RadioGroup name="size">
        <Radio value="1" />
      </RadioGroup>
    );

    expect(page.getByRole('radiogroup').element().nodeName).toBe('FIELDSET');
  });

  test('sets its own attributes, such as id, className and style, on the fieldset', async () => {
    await render(
      <RadioGroup
        name="size"
        id="size"
        className="options"
        style={{ margin: 0 }}
        data-section="sizes"
      >
        <Field>
          <Radio value="small" />
          <Label>Small</Label>
        </Field>
      </RadioGroup>
    );
    const group = page.getByRole('radiogroup');

    await expect.element(group).toHaveAttribute('id', 'size');
    await expect.element(group).toHaveClass('options');
    await expect.element(group).toHaveStyle({ margin: '0px' });
    await expect.element(group).toHaveAttribute('data-section', 'sizes');

    // the radio keeps the id of its field, so its label still names it
    const radio = page.getByRole('radio', { name: 'Small' });
    await expect.element(radio).toBeVisible();
    await expect.element(radio).not.toHaveClass('options');
  });

  test('sets other event handlers on the fieldset, where they also receive the events of its radios', async () => {
    const onClick = vi.fn();
    await render(
      <RadioGroup name="size" onClick={onClick}>
        <Legend>Size</Legend>
        <Radio value="small" />
      </RadioGroup>
    );

    // only the fieldset hears a click on its legend
    await userEvent.click(page.getByText('Size'));
    expect(onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(page.getByRole('radio'));
    expect(onClick).toHaveBeenCalledTimes(2);
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

  // a component which forwards its props passes them on as undefined
  test("a radio keeps the group's props which it passes as undefined", async () => {
    await render(
      <RadioGroup name="group">
        <Radio value="1" name={undefined} />
        <Radio value="2" name={undefined} />
      </RadioGroup>
    );
    const [first, second] = page.getByRole('radio').all();

    await userEvent.click(first);
    await userEvent.click(second);

    await expect.element(first).not.toBeChecked();
    await expect.element(second).toBeChecked();
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

  test('ref is attached to the fieldset', async () => {
    const ref = createRef<HTMLFieldSetElement>();
    await render(
      <RadioGroup ref={ref} name="testing-group">
        <Radio value="1" />
      </RadioGroup>
    );

    expect(ref.current).toBe(page.getByRole('radiogroup').element());
  });

  test('aria-invalid marks the group as invalid, rather than its radios', async () => {
    await render(
      <RadioGroup name="size" aria-invalid>
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

  test('aria-describedby describes the group rather than its radios', async () => {
    await render(
      <RadioGroup name="size" aria-describedby="hint">
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

  test('takes aria-invalid and the description of a surrounding field', async () => {
    await render(
      <Field aria-invalid aria-describedby="message">
        <RadioGroup name="size">
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
      <RadioGroup name="size" aria-label="Size" aria-required>
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
        <RadioGroup name="size" aria-labelledby="size-label">
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
