import { mergeFieldProps } from './mergeFieldProps';

describe('mergeFieldProps', () => {
  test("gives the control's own props precedence", () => {
    const merged = mergeFieldProps(
      { name: 'field', placeholder: 'field' },
      { name: 'own' }
    );

    expect(merged).toMatchObject({ name: 'own', placeholder: 'field' });
  });

  test('combines the descriptions of the field and the control', () => {
    const merged = mergeFieldProps(
      { 'aria-describedby': 'error' },
      { 'aria-describedby': 'hint' }
    );

    expect(merged['aria-describedby']).toBe('error hint');
  });

  test("keeps the field's description when the control has none", () => {
    const merged = mergeFieldProps({ 'aria-describedby': 'error' }, {});
    expect(merged).toHaveProperty('aria-describedby', 'error');
  });

  test('has no description when neither has one', () => {
    const merged = mergeFieldProps({ name: 'field' }, { name: 'own' });
    expect(merged).toHaveProperty('aria-describedby', undefined);
  });

  test('ignores descriptions which are not text', () => {
    const merged = mergeFieldProps({ 'aria-describedby': 1 }, {});
    expect(merged).toHaveProperty('aria-describedby', undefined);
  });
});
