/**
 * Merges a component's own props over the props shared with it, such as by a
 * surrounding field. An own prop only takes precedence when it is defined, so
 * passing it as `undefined`, as a component which forwards its props would,
 * keeps the shared value.
 *
 * @param shared the props shared with the component
 * @param own the component's own props
 * @returns the merged props
 */
export function mergeDefinedProps<T extends object>(shared: object, own: T): T {
  const ownValues = new Map(Object.entries(own));
  const fallbacks = Object.fromEntries(
    Object.entries(shared).filter(([key]) => ownValues.get(key) === undefined)
  );

  return { ...own, ...fallbacks };
}
