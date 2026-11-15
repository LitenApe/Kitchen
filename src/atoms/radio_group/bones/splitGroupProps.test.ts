import { splitGroupProps } from './splitGroupProps';

describe('splitGroupProps', () => {
  test('shares the props which make the radios one form control', () => {
    const onChange = vi.fn();
    const { shared } = splitGroupProps({
      name: 'size',
      onChange,
      required: true,
      disabled: true,
      form: 'order',
      id: 'size',
    });

    expect(shared).toEqual({
      name: 'size',
      onChange,
      required: true,
      disabled: true,
      form: 'order',
    });
  });

  test("keeps every other prop for the group's own element", () => {
    const onClick = vi.fn();
    const { group } = splitGroupProps({
      name: 'size',
      id: 'size',
      className: 'options',
      style: { margin: 0 },
      'data-section': 'sizes',
      'aria-label': 'Size',
      'aria-invalid': true,
      onClick,
    });

    expect(group).toEqual({
      id: 'size',
      className: 'options',
      style: { margin: 0 },
      'data-section': 'sizes',
      'aria-label': 'Size',
      'aria-invalid': true,
      onClick,
    });
  });
});
