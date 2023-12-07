import { deleteProduct } from "@/api/product";
import { productStore } from "@/stores";
import { bookDataType } from "@/types/bookDataType";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

type ProductItemProps = {
  item: bookDataType;
  fetchProduct: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ item, fetchProduct }) => {
  const [popup, setPopup] = useRecoilState(productStore.productPopupState);

  const updateProductModal = () => {
    setPopup((prevPopupState) => ({
      isOpen: !prevPopupState.isOpen,
      update: true,
      item: item,
    }));
  };

  const deleteProductHandler = async (event: FormEvent) => {
    event.preventDefault;

    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        const result = await deleteProduct(item.isbn);
        if (result.status === 204) {
          toast.success("삭제가 완료되었습니다.");
          fetchProduct();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };

  return (
    <div className="flex px-2 py-8 border-b-[1px] border-slate-200">
      <div className="w-[15%]">
        <img
          src={`${item.imagePath}`}
          className="w-[110px] h-auto object-fit-cover"
        />
      </div>
      <div className="w-[70%] px-6 py-4">
        <div className="text-[10px] font-medium">
          {item.isBestSeller ? (
            <div className="mb-1 border-[1px] border-[#2b5469] inline-block px-1 text-[#2b5469]">
              BEST
            </div>
          ) : null}
        </div>
        <div className="text-[15px] font-medium">{item.title}</div>
        <div className="text-xs text-neutral-500">{item.author}</div>
        <div className="text-[12px] text-neutral-500 mt-4">
          {item.publisher}
        </div>
        <div>
          <span className="font-medium">{item.price}</span>원
        </div>
      </div>
      <div className="w-[15%] flex flex-col text-[12px] items-center justify-center gap-1">
        <button
          onClick={updateProductModal}
          className="border-[1px] border-point px-3 py-1 rounded text-point"
        >
          상품 수정
        </button>
        <button
          onClick={deleteProductHandler}
          className="bg-[#666] text-white px-3 py-1 rounded"
        >
          상품 삭제
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
