type cartItemProps = {
  isbn: string;
  image_path: string;
  title: string;
  author: string;
  price: number;
  amount: number;
};

const OrderDetailItem = ({
  isbn,
  image_path,
  title,
  author,
  price,
  amount,
}: cartItemProps) => {
  return (
    <div className="border-[1px] border-light_gray rounded-lg h-[150px] m-2 px-2 py-1 flex justify-between items-center shadow-md">
      <div className="w-[100px] h-[130px] p-1 mx-1 flex items-center border-[1px] border-light_gray">
        <img src={image_path} alt={title} className="w-[100%] h-[100%]" />
      </div>
      <div className="h-[130px] flex flex-col flex-1 mx-1 my-2 justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-medium font-normal whitespace-nowrap overflow-hidden text-ellipsis ">
            {title}
          </h1>
          <div className="text-regular text-dark_gray">{author}</div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-dark_gray text-small">총 {amount}권</p>
          <p className="text-medium">{(price * amount).toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;
