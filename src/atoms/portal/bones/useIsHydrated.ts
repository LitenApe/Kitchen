import { useSyncExternalStore } from 'react';

// once the page has hydrated, it stays hydrated, so there is nothing to
// listen to
function subscribe(): () => void {
  return () => {};
}

/**
 * Whether the component renders in the browser, outside of hydration. It is
 * `false` on the server, and while the browser hydrates what the server
 * rendered, so that the browser's first render matches the server's HTML. It
 * is `true` once the page has hydrated, and for a component which first
 * renders in the browser.
 *
 * @returns whether the page has hydrated
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
