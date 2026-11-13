import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

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
    expect(mock.mock.calls[0][0]?.target?.value).toBe('1');

    await userEvent.click(radioTwo);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock.mock.calls[1][0]?.target?.value).toBe('2');

    await userEvent.click(radioOne);
    expect(mock).toHaveBeenCalledTimes(3);
    expect(mock.mock.calls[2][0]?.target?.value).toBe('1');
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
});
