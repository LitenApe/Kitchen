import { Component, type ErrorInfo, type JSX } from 'react';

import type { ErrorBoundaryFallbackProps, ErrorBoundaryProps } from '.';

/** A fallback written as a class, which takes no props. */
class ClassFallback extends Component {
  render() {
    return null;
  }
}

describe('ErrorBoundaryProps', () => {
  test('keeps the error and its info optional for the fallback', () => {
    expectTypeOf<ErrorBoundaryFallbackProps>().toEqualTypeOf<{
      error?: unknown;
      info?: ErrorInfo;
    }>();
  });

  test('takes a fallback which leaves out the error and its info', () => {
    expectTypeOf<() => JSX.Element>().toExtend<
      ErrorBoundaryProps['fallback']
    >();
    expectTypeOf(ClassFallback).toExtend<ErrorBoundaryProps['fallback']>();
  });

  test('takes a fallback which uses the error and its info', () => {
    expectTypeOf<(props: ErrorBoundaryFallbackProps) => JSX.Element>().toExtend<
      ErrorBoundaryProps['fallback']
    >();
  });
});
