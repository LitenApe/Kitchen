import { getControllableState } from './getControllableState';

describe('getControllableState', () => {
  test('uses its own value when uncontrolled, and updates it on a change', () => {
    const setInternalValue = vi.fn();
    const [value, requestChange] = getControllableState({
      name: 'Test',
      value: undefined,
      internalValue: false,
      onChange: undefined,
      setInternalValue,
    });

    requestChange(true);

    expect(value).toBe(false);
    expect(setInternalValue).toHaveBeenCalledExactlyOnceWith(true);
  });

  test('uses the given value when controlled', () => {
    const [value] = getControllableState({
      name: 'Test',
      value: 2,
      internalValue: 1,
      onChange: vi.fn(),
      setInternalValue: vi.fn(),
    });

    expect(value).toBe(2);
  });

  test('requests a change through onChange when controlled, together with any extra arguments', () => {
    const onChange = vi.fn();
    const setInternalValue = vi.fn();
    const [, requestChange] = getControllableState<boolean, [string]>({
      name: 'Test',
      value: false,
      internalValue: false,
      onChange,
      setInternalValue,
    });

    requestChange(true, 'extra');

    expect(onChange).toHaveBeenCalledExactlyOnceWith(true, 'extra');
    expect(setInternalValue).not.toHaveBeenCalled();
  });

  test('ignores changes when controlled without onChange', () => {
    const setInternalValue = vi.fn();
    const [value, requestChange] = getControllableState({
      name: 'Test',
      value: false,
      internalValue: false,
      onChange: undefined,
      setInternalValue,
    });

    requestChange(true);

    expect(value).toBe(false);
    expect(setInternalValue).not.toHaveBeenCalled();
  });

  test('ignores changes, and warns with the name of the component, when given onChange without a value', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const onChange = vi.fn();
    const setInternalValue = vi.fn();
    const [, requestChange] = getControllableState({
      name: 'Accordion',
      value: undefined,
      internalValue: false,
      onChange,
      setInternalValue,
    });

    requestChange(true);

    expect(onChange).not.toHaveBeenCalled();
    expect(setInternalValue).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('Accordion received a change handler')
    );
    warn.mockRestore();
  });
});
