import { getProductByISBN } from "@/api/product";
import { orderDataType } from "@/types/orderDataType";
import { useEffect, useState } from "react";
import { bookDataType } from "@/types/bookDataType";
import ProductDetailItem from "./ProductDetailItem";
import DownIcon from "../Common/Icons/DownIcon";
import UpIcon from "../Common/Icons/UpIcon";

type OrderItemProps = {
  item: orderDataType;
  index: number;
};

type productInfo = {
  amount: number;
  data: bookDataType;
};

const OrderItem = ({ item, index }: OrderItemProps) => {
  const [isContent, setIsContent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<productInfo[] | []>([]);
  const addContent = () => {
    setIsContent(!isContent);
  };

  // 주문 날짜 설정 (YYYY.MM.DD)
  const createDate = () => {
    const removeDate = item.createdAt
      .slice(0, item.createdAt.indexOf("T"))
      .replaceAll("-", ".");
    return removeDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDataArray = await Promise.all(
          item.orderItems.map(async (orderItem) => {
            const result = await getProductByISBN({ isbn: orderItem.isbn });
            return {
              amount: orderItem.amount,
              data: result,
            };
          })
        );

        setProduct(productDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [item.orderItems]);

  return (
    <div className="bg-neutral-100 p-4 text-[13px] items-center mb-2">
      <div className="flex justify-between text-center">
        <div className="w-[5%]">
          <input type="checkbox" />
        </div>
        <div className="w-[25%]">{item.orderNumber}</div>
        <div className="w-[15%]">{item.shippingStatus}</div>
        <div className="w-[15%]">{createDate()}</div>
        <div className="w-[35%]">{item.userName}님의 주문</div>
        <div className="w-[5%]">
          <button onClick={addContent}>
            {isContent ? (
              <UpIcon color={"#d3d3d3"} width={"18"} />
            ) : (
              <DownIcon color={"#39c461"} width={"18"} />
            )}
          </button>
        </div>
      </div>

      {isContent ? (
        <div className="mt-6">
          <div>
            <h4 className="font-semibold mb-1">주문 정보</h4>
            <div className="bg-white p-3">
              <div className="flex mb-1">
                <div className="w-[12%]">주문자 </div>
                <div>{item.userName}</div>
              </div>
              <div className="flex mb-1">
                <div className="w-[12%]">배송지 </div>
                <div>
                  ({item.postalCode}) {item.address} {item.detailAddress}
                </div>
              </div>
              <div className="flex mb-1">
                <div className="w-[12%]">연락처 </div>
                <div>{item.userPhone}</div>
              </div>
              <div className="flex">
                <div className="w-[12%]">배송 요청</div>
                <div>{item.orderRequest}</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-1">주문 상품</h4>
            {product.map((item, index) => (
              <div key={`product-${index}`}>
                <ProductDetailItem item={item.data} amount={item.amount} />
              </div>
            ))}
          </div>
          <div className="flex gap-1 text-white justify-end text-xs mt-6">
            <button className="bg-point px-3 py-2">배송상태 변경</button>
            <button className="bg-[#636363] px-3 py-2">주문 취소</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderItem;
