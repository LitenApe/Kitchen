import { useState, useSyncExternalStore } from 'react';

// whether a component was rendered on the server never changes, so there is
// nothing to listen to
function subscribe(): () => void {
  return () => {};
}

/**
 * Whether the component was rendered on the server. It stays `true` once the
 * browser has hydrated it, and is `false` for a component which first renders
 * in the browser.
 *
 * @returns whether the component was rendered on the server
 */
export function useWasServerRendered(): boolean {
  // React reads the server's value on the server, and while hydrating
  const isServerValue = useSyncExternalStore(
    subscribe,
    () => false,
    () => true
  );
  // once hydrated, React switches to the browser's value, so the first value
  // is kept
  const [wasServerRendered] = useState(isServerValue);

  return wasServerRendered;
}
