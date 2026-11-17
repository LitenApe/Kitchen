import {
  type DescendantRegistry,
  createDescendantRegistry,
} from './createDescendantRegistry';

// the registry sorts by document order, so its elements have to be attached
const container = document.createElement('div');

beforeAll(() => {
  document.body.append(container);
});

afterAll(() => {
  container.remove();
});

/** Creates elements with the given ids, in that order in the document. */
function createElements(...ids: string[]): HTMLElement[] {
  const elements = ids.map((id) => {
    const element = document.createElement('p');
    element.id = id;
    return element;
  });
  container.replaceChildren(...elements);
  return elements;
}

function getIds(elements: ReadonlyArray<HTMLElement>): string[] {
  return elements.map((element) => element.id);
}

/** Subscribes a listener to the registry until the test has finished. */
function subscribe(registry: DescendantRegistry) {
  const listener = vi.fn();
  onTestFinished(registry.subscribe(listener));
  return listener;
}

/** Waits for the registry to hear about the latest changes to the document. */
function waitForObserver(): Promise<void> {
  // mutation observers report in a microtask, which runs before any timer
  return new Promise((resolve) => setTimeout(resolve));
}

describe('createDescendantRegistry', () => {
  test('starts without elements', () => {
    expect(createDescendantRegistry().getElements()).toHaveLength(0);
  });

  test('keeps the registered elements in document order', () => {
    const [first, second, third] = createElements('first', 'second', 'third');
    const registry = createDescendantRegistry();

    registry.register(third);
    registry.register(first);
    registry.register(second);

    expect(getIds(registry.getElements())).toEqual([
      'first',
      'second',
      'third',
    ]);
  });

  test('registers an element only once', () => {
    const [element] = createElements('element');
    const registry = createDescendantRegistry();
    registry.register(element);
    const elements = registry.getElements();
    const listener = subscribe(registry);

    registry.register(element);

    expect(registry.getElements()).toBe(elements);
    expect(listener).not.toHaveBeenCalled();
  });

  test('unregisters elements', () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    registry.register(first);
    registry.register(second);

    registry.unregister(first);

    expect(getIds(registry.getElements())).toEqual(['second']);
  });

  test('tells its listeners when its elements change, until they unsubscribe', () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    const listener = vi.fn();
    const unsubscribe = registry.subscribe(listener);

    registry.register(first);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    registry.register(second);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  // React moves elements without registering them again
  test('sorts its elements again when they are moved', async () => {
    const [first, second, third] = createElements('first', 'second', 'third');
    const registry = createDescendantRegistry();
    subscribe(registry);
    registry.register(first);
    registry.register(second);
    registry.register(third);

    container.append(first);

    await expect
      .poll(() => getIds(registry.getElements()))
      .toEqual(['second', 'third', 'first']);
  });

  // the elements register before the component which keeps the registry
  // subscribes to it
  test('sorts elements which were registered before it was subscribed to', async () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    registry.register(first);
    registry.register(second);
    subscribe(registry);

    container.append(first);

    await expect
      .poll(() => getIds(registry.getElements()))
      .toEqual(['second', 'first']);
  });

  // the same elements keep the descendants from rendering again
  test('keeps the same elements when the nodes around them change without reordering them', async () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    registry.register(first);
    registry.register(second);
    const elements = registry.getElements();
    const listener = subscribe(registry);

    container.append(document.createElement('p'));
    await waitForObserver();

    expect(registry.getElements()).toBe(elements);
    expect(listener).not.toHaveBeenCalled();
  });

  // an element which React removes is only unregistered in a later render,
  // and it can no longer be sorted once it has left the document
  test('leaves out elements which have left the document', async () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    subscribe(registry);
    registry.register(first);
    registry.register(second);

    first.remove();

    await expect.poll(() => getIds(registry.getElements())).toEqual(['second']);
  });

  test('stops sorting its elements again once nothing is subscribed', async () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    const unsubscribe = registry.subscribe(vi.fn());
    registry.register(first);
    registry.register(second);
    unsubscribe();

    container.append(first);
    await waitForObserver();

    expect(getIds(registry.getElements())).toEqual(['first', 'second']);
  });

  // the elements are registered before the second listener subscribes, so
  // the registry is already watching them when it does
  test('sorts its elements again until every listener has unsubscribed', async () => {
    const [first, second] = createElements('first', 'second');
    const registry = createDescendantRegistry();
    const unsubscribeFirst = registry.subscribe(vi.fn());
    registry.register(first);
    registry.register(second);
    const unsubscribeSecond = registry.subscribe(vi.fn());

    unsubscribeFirst();
    container.append(first);
    await expect
      .poll(() => getIds(registry.getElements()))
      .toEqual(['second', 'first']);

    unsubscribeSecond();
    container.append(second);
    await waitForObserver();
    expect(getIds(registry.getElements())).toEqual(['second', 'first']);
  });
});
