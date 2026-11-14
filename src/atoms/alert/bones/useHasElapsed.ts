import { useEffect, useState } from 'react';

/**
 * Whether `delay` milliseconds have passed since the component mounted. It
 * starts out `false`, and stays `true` once the time is up.
 *
 * @param delay the time to wait in milliseconds
 * @returns whether the time has passed
 */
export function useHasElapsed(delay: number): boolean {
  const [hasElapsed, setHasElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasElapsed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return hasElapsed;
}
