import { getErrorProps } from './getErrorProps';

describe('getErrorProps', () => {
  test('marks the control as invalid, and describes it with the error, while there is an error', () => {
    expect(getErrorProps('Choose a size', 'error', {})).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'error',
    });
  });

  test('marks the control as valid, and leaves the error out, while there is no error', () => {
    expect(getErrorProps(undefined, 'error', {})).toEqual({
      'aria-invalid': false,
      'aria-describedby': undefined,
    });
  });

  test('counts an empty error as no error', () => {
    expect(getErrorProps('', 'error', {})).toEqual({
      'aria-invalid': false,
      'aria-describedby': undefined,
    });
  });

  test('keeps an aria-invalid of its own', () => {
    expect(
      getErrorProps(undefined, 'error', { 'aria-invalid': true })
    ).toHaveProperty('aria-invalid', true);
    expect(
      getErrorProps('Choose a size', 'error', { 'aria-invalid': false })
    ).toHaveProperty('aria-invalid', false);
  });

  // a component which forwards its props passes them on as undefined
  test('follows the error when its own aria-invalid is undefined', () => {
    expect(
      getErrorProps('Choose a size', 'error', { 'aria-invalid': undefined })
    ).toHaveProperty('aria-invalid', true);
  });

  test('describes the control with the error ahead of its own descriptions', () => {
    expect(
      getErrorProps('Choose a size', 'error', { 'aria-describedby': 'hint' })
    ).toHaveProperty('aria-describedby', 'error hint');
  });

  test('keeps its own descriptions while there is no error', () => {
    expect(
      getErrorProps(undefined, 'error', { 'aria-describedby': 'hint' })
    ).toHaveProperty('aria-describedby', 'hint');
  });
});
