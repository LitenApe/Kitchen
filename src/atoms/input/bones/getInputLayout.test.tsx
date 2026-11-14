import { InputLayout, getInputLayout } from './getInputLayout';

describe('getInputLayout', () => {
  test('is plain without an affix', () => {
    expect(getInputLayout({})).toBe(InputLayout.Plain);
  });

  test('is prefixed with a prefix', () => {
    expect(getInputLayout({ prefix: '€' })).toBe(InputLayout.Prefixed);
    expect(getInputLayout({ prefix: <span /> })).toBe(InputLayout.Prefixed);
  });

  test('is postfixed with a postfix', () => {
    expect(getInputLayout({ postfix: 'kg' })).toBe(InputLayout.Postfixed);
    expect(getInputLayout({ postfix: <span /> })).toBe(InputLayout.Postfixed);
  });

  test('counts an empty affix as an affix', () => {
    expect(getInputLayout({ prefix: '' })).toBe(InputLayout.Prefixed);
  });
});
