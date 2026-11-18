import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from 'react';

/**
 * The props which `ErrorBoundary` gives its fallback. Both are optional, so a
 * fallback can leave them out.
 */
export type ErrorBoundaryFallbackProps = {
  /** What was thrown. */
  error?: unknown;
  /**
   * React's information about the error, such as the component stack. It
   * arrives just after the error, so the fallback first renders without it.
   */
  info?: ErrorInfo;
};

export type ErrorBoundaryProps = {
  /** The content to render while nothing has failed. */
  children?: ReactNode;
  /**
   * A component, rather than an element, to render instead of the children
   * once an error is caught. It is given the error and React's error info.
   */
  fallback: ComponentType<ErrorBoundaryFallbackProps>;
  /** Called with the error and React's error info when an error is caught. */
  logger?: (error: unknown, info: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: unknown;
  info?: ErrorInfo;
};

/**
 * Error boundaries have to be class components, as React has no hook for
 * catching errors thrown while rendering.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  // anything can be thrown, even undefined, so the error itself does not
  // tell whether one was caught
  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // React only gives the info to this method, which runs once the fallback
  // has rendered with the error
  componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.logger?.(error, info);
    this.setState({ info });
  }

  render(): ReactNode {
    const { children, fallback: Fallback } = this.props;
    const { hasError, error, info } = this.state;

    return hasError ? <Fallback error={error} info={info} /> : children;
  }
}

export default ErrorBoundary;
