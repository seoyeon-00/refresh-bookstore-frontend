import ErrorIcon from "./Icons/ErrorIcon";

type ItemProps = {
  width: number;
  children: string;
};

const NoneItem = ({ width, children }: ItemProps) => {
  return (
    <div className="flex flex-col justify-center items-center my-[100px] w-full">
      <ErrorIcon fill="#bfbfbf" width={width} />
      <p className="text-gray text-medium font-bold mt-5">{children}</p>
    </div>
  );
};

export default NoneItem;
