import { mergeDefinedProps } from './mergeDefinedProps';

describe('utility function mergeDefinedProps', () => {
  test('gives the own props precedence over the shared ones', () => {
    const merged = mergeDefinedProps(
      { name: 'shared', placeholder: 'shared' },
      { name: 'own' }
    );

    expect(merged).toEqual({ name: 'own', placeholder: 'shared' });
  });

  test('keeps a shared prop which the own props pass as undefined', () => {
    const merged = mergeDefinedProps({ id: 'shared' }, { id: undefined });
    expect(merged).toEqual({ id: 'shared' });
  });

  test('lets falsy own props other than undefined take precedence', () => {
    const merged = mergeDefinedProps(
      { required: true, placeholder: 'shared', tabIndex: 1 },
      { required: false, placeholder: '', tabIndex: 0 }
    );

    expect(merged).toEqual({ required: false, placeholder: '', tabIndex: 0 });
  });

  test('keeps own props which nothing is shared for', () => {
    const merged = mergeDefinedProps({}, { name: 'own' });
    expect(merged).toEqual({ name: 'own' });
  });

  test('leaves the given props unchanged', () => {
    const shared = { id: 'shared' };
    const own = { id: undefined };

    mergeDefinedProps(shared, own);

    expect(shared).toEqual({ id: 'shared' });
    expect(own).toStrictEqual({ id: undefined });
  });
});
