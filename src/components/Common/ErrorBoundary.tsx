import React, { Component, ReactNode } from "react";

export type ErrorFallbackProps<ErrorType extends Error = Error> = {
  reset: (...args: unknown[]) => void;
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
};

// Error가 발생하면 fallback UI, 그렇지 않으면 children 컴포넌트 렌더링
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // Error를 캐치하면 hasError 프로퍼티 변경
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Uncaught error", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent({
        reset: () => {
          console.log("reset");
        },
      });
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
