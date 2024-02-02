import { bookDataType } from "@/types/bookDataType";

type ProductItemProps = {
  item: bookDataType;
  amount: number;
};

const ProductDetailItem = ({ item, amount }: ProductItemProps) => {
  return (
    <div className="bg-white mb-3 flex py-3 px-3 rounded-md">
      <div className="w-[75px]">
        <img src={`${item.imagePath}`} className="w-fit h-fit" />
      </div>
      <div className="w-[90%] flex flex-col justify-center px-3">
        <div className="font-medium text-sm">{item.title}</div>
        <div className="text-xs text-neutral-500 mt-1">{item.author}</div>
        <div className="mt-2 text-xs text-neutral-500">
          수량 <span className="font-medium text-neutral-800">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailItem;
