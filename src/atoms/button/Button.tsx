import type { ComponentPropsWithRef, JSX, MouseEvent } from 'react';

import { isDisabled } from '../../utils/functions/isDisabled';

type NativeButtonProps = { as?: 'button' } & ComponentPropsWithRef<'button'>;
type LinkButtonProps = {
  as: 'a';
  disabled?: boolean;
} & ComponentPropsWithRef<'a'>;

export type ButtonProps = NativeButtonProps | LinkButtonProps;

/** Keeps a disabled link, which stays focusable, from navigating. */
function preventNavigation(event: MouseEvent) {
  event.preventDefault();
}

/**
 * A disabled button is only marked with `aria-disabled` and ignores clicks,
 * instead of using the `disabled` attribute, so it stays in the tab order. A
 * disabled link does not navigate either.
 */
function Button(props: ButtonProps): JSX.Element {
  const buttonDisabled = isDisabled(props);

  if (props.as === 'a') {
    const { as: _as, disabled: _disabled, onClick, ...linkProps } = props;
    return (
      <a
        aria-disabled={buttonDisabled}
        {...linkProps}
        onClick={buttonDisabled ? preventNavigation : onClick}
      />
    );
  }

  const { as: _as, disabled: _disabled, onClick, ...buttonProps } = props;
  return (
    <button
      // keeps the button from submitting a surrounding form by accident
      type="button"
      aria-disabled={buttonDisabled}
      {...buttonProps}
      onClick={buttonDisabled ? undefined : onClick}
    />
  );
}

export default Button;
