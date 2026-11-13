import { Component, createElement, JSX, ReactNode } from 'react';
import { isDefined } from '../../utils/functions/isDefined';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback: () => JSX.Element;
  readonly logger?: (error: unknown, info: unknown) => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    if (isDefined(this.props.logger)) {
      this.props.logger(error, info);
    }
  }

  render(): JSX.Element | ReactNode {
    const { children, fallback } = this.props;

    if (this.state.hasError) {
      return createElement(fallback);
    }

    return children;
  }
}

export default ErrorBoundary;
