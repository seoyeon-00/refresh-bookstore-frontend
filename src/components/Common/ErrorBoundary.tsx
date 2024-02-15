import React, { Component, ReactNode } from "react";

export type ErrorFallbackProps<ErrorType extends Error = Error> = {
  reset: (...args: unknown[]) => void;
  error: ErrorType;
};

export type ErrorFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>
) => JSX.Element;

type Props = {
  fallbackComponent: ErrorFallbackType;
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

// Error가 발생하면 fallback UI, 그렇지 않으면 children 컴포넌트 렌더링
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // Error를 캐치하면 hasError 프로퍼티 변경
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Uncaught error", error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return this.props.fallbackComponent({
        reset: () => {
          console.log("reset");
        },
        error: error as ErrorFallbackProps["error"],
      });
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
