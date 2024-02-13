import { ErrorFallbackProps } from "./ErrorBoundary";

const FallbackComponent = (props: ErrorFallbackProps) => {
  return (
    <div>
      <h2>잘못된 접근 방식</h2>
      <button onClick={() => props.reset()}>다시 시도</button>
    </div>
  );
};

export default FallbackComponent;
