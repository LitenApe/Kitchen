import { sortNodes } from './utils';

// nodes are sorted by their position in the document
const container = document.createElement('div');

beforeAll(() => {
  document.body.append(container);
});

beforeEach(() => {
  container.replaceChildren();
});

afterAll(() => {
  container.remove();
});

function createElement(id: string, parent: HTMLElement = container) {
  const element = document.createElement('div');
  element.id = id;
  parent.append(element);
  return element;
}

function getIds(elements: HTMLElement[]): string[] {
  return elements.map((element) => element.id);
}

describe('sortNodes', () => {
  test('sorts elements into document order', () => {
    const first = createElement('first');
    const second = createElement('second');
    const third = createElement('third');

    expect(getIds(sortNodes([second, third, first]))).toEqual([
      'first',
      'second',
      'third',
    ]);
  });

  test('places an element before the elements inside it', () => {
    const outer = createElement('outer');
    const inner = createElement('inner', outer);

    expect(getIds(sortNodes([inner, outer]))).toEqual(['outer', 'inner']);
  });

  test('throws for elements which are not in the same document', () => {
    const attached = createElement('attached');
    const detached = document.createElement('div');

    expect(() => sortNodes([attached, detached])).toThrow(
      'Cannot sort the given nodes'
    );
  });
});
