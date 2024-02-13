import { ComponentProps, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import FallbackComponent from "./FallbackComponent";

interface AsyncBoundaryProps {
  children: React.ReactNode;
  suspenseFallback?: ComponentProps<typeof Suspense>["fallback"];
}

const AsyncBoundary = ({
  children,
  suspenseFallback = <div>Loading...</div>,
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary fallbackComponent={FallbackComponent}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
