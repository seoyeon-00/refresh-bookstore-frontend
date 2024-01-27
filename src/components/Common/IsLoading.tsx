import { ClipLoader } from "react-spinners";

const IsLoading = ({ children }: { children: string }) => {
  return (
    <div className="z-[9999] fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      <div className="bg-white w-[300px] py-[55px] text-center rounded-md shadow-md">
        <ClipLoader color="#1DC078" size={40} />
        <p className="font-medium text-[12px] mt-3 text-neutral-700">
          {children}
        </p>
      </div>
    </div>
  );
};

export default IsLoading;
