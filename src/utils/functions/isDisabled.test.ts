import { isDisabled } from './isDisabled';

describe('isDisabled default behavior', () => {
  test('is not disabled by default', () => {
    expect(isDisabled({})).toBe(false);
  });

  test('is disabled through "disabled"', () => {
    expect(isDisabled({ disabled: true })).toBe(true);
  });

  test('is disabled through "aria-disabled"', () => {
    expect(isDisabled({ 'aria-disabled': true })).toBe(true);
    expect(isDisabled({ 'aria-disabled': 'true' })).toBe(true);
  });

  test('is not disabled when both are false', () => {
    expect(isDisabled({ disabled: false, 'aria-disabled': 'false' })).toBe(
      false
    );
  });
});
