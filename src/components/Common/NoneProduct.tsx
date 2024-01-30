import ErrorIcon from "./Icons/ErrorIcon";

const NoneProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center my-20 w-full">
      <ErrorIcon fill="#bfbfbf" width={100} />
      <p className="text-gray text-medium font-bold m-2">상품이 없습니다.</p>
    </div>
  );
};

export default NoneProduct;
