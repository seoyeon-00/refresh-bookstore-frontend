import { ErrorIcon } from "react-hot-toast";
import { ErrorFallbackProps } from "./ErrorBoundary";

const FallbackComponent = (props: ErrorFallbackProps) => {
  return (
    <div className="w-full flex flex-col justify-center bg-[#f9fff9] items-center border-[2px] border-solid border-point py-[40px] rounded-xl">
      <div className="flex">
        <div>
          <ErrorIcon />
        </div>{" "}
        <div className="font-semibold ml-2">ERROR</div>
      </div>
      <h2 className="align-middle font-semibold text-base">
        잘못된 접근 방식입니다.
      </h2>
      <button
        className="bg-point text-[#fff] p-3 rounded-md mt-[20px] font-medium"
        onClick={() => props.reset()}
      >
        다시 시도
      </button>
    </div>
  );
};

export default FallbackComponent;
