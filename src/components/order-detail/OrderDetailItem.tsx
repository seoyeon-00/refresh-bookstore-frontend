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
    <div className="bg-white border-[1px] border-light_gray rounded-lg h-[150px] px-3 py-2 flex justify-between items-center shadow-md">
      <div className="w-[90px] h-[120px] p-1 mx-1 flex items-center border-[1px] border-light_gray">
        <img src={image_path} alt={title} className="w-[100%] h-[100%]" />
      </div>
      <div className="relative h-[130px] flex flex-col flex-1 mx-3 my-2 pt-4 justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis ">
            {title}
          </h1>
          <div className="text-[12px] text-dark_gray">{author}</div>
        </div>
        <div className="absolute bottom-0 right-0 flex items-end bg-point">
          <div className="text-white text-[13px] font-medium px-3 pb-1.5">
            수량 {amount}
          </div>
          <div className="text-base font-medium text-point bg-[#eef8f0] px-4 py-1">
            {(price * amount).toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;
