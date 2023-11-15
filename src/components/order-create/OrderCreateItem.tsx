type cartItemProps = {
  isbn: string;
  image_path: string;
  title: string;
  author: string;
  price: number;
  amount: number;
};

const OrderCreateItem = ({
  isbn,
  image_path,
  title,
  author,
  price,
  amount,
}: cartItemProps) => {
  return (
    <div className="bg-white border-[1px] border-light_gray rounded-lg h-[120px] m-2 px-2 py-1 flex justify-between items-center shadow-md">
      <div className="w-[20%] p-1 mx-1 flex items-center border-[1px] border-light_gray">
        <img src={image_path} alt={title} className="w-[100%] h-[100%]" />
      </div>
      <div className="w-[80%] h-[130px] py-4 px-1 flex flex-col flex-1 mx-1 my-2 justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis ">
            {title}
          </h1>
          <div className="mt-1 text-xs text-dark_gray">{author}</div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-neutral-500 text-xs">총 {amount}권</p>
          <p className="text-base font-medium">
            {(price * amount).toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCreateItem;
