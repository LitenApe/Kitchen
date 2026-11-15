import type { ComponentPropsWithRef, JSX } from 'react';

export type ButtonProps = ComponentPropsWithRef<'button'>;

/**
 * A `button` which defaults to `type="button"`, so it does not submit a
 * surrounding form by accident. The default also applies when `type` is
 * passed as `undefined`, as a component which forwards its props would.
 */
function Button({ type = 'button', ...props }: ButtonProps): JSX.Element {
  return <button {...props} type={type} />;
}

export default Button;
