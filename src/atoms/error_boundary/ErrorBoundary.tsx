import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from 'react';

export type ErrorBoundaryProps = {
  children?: ReactNode;
  /** Rendered instead of the children after an error. */
  fallback: ComponentType;
  /** Called with the error and React's error info when an error is caught. */
  logger?: (error: unknown, info: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Error boundaries have to be class components, as React has no hook for
 * catching errors thrown while rendering.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.logger?.(error, info);
  }

  render(): ReactNode {
    const { children, fallback: Fallback } = this.props;
    return this.state.hasError ? <Fallback /> : children;
  }
}

export default ErrorBoundary;
