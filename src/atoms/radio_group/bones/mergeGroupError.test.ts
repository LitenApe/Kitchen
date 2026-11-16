import { mergeGroupError } from './mergeGroupError';

describe('mergeGroupError', () => {
  test('keeps its own aria-invalid and description when the field has none', () => {
    expect(
      mergeGroupError({ 'aria-invalid': true, 'aria-describedby': 'hint' }, {})
    ).toEqual({ 'aria-invalid': true, 'aria-describedby': 'hint' });
  });

  test('takes the aria-invalid and description of the field', () => {
    expect(
      mergeGroupError(
        {},
        { 'aria-invalid': true, 'aria-describedby': 'message' }
      )
    ).toEqual({ 'aria-invalid': true, 'aria-describedby': 'message' });
  });

  test("prefers its own aria-invalid over the field's", () => {
    expect(
      mergeGroupError({ 'aria-invalid': false }, { 'aria-invalid': true })
    ).toHaveProperty('aria-invalid', false);
  });

  test("combines both descriptions, the field's first", () => {
    expect(
      mergeGroupError(
        { 'aria-describedby': 'hint' },
        { 'aria-describedby': 'message' }
      )
    ).toHaveProperty('aria-describedby', 'message hint');
  });

  test('has no description when neither has one', () => {
    expect(mergeGroupError({}, {})).toEqual({
      'aria-invalid': undefined,
      'aria-describedby': undefined,
    });
  });
});
