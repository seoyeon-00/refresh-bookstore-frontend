import Link from "next/link";

import { orderDataType } from "@/types/orderDataType";
import { getProductByISBN } from "@/api/product";
import { useEffect, useState } from "react";
import { bookDataType } from "@/types/bookDataType";

const OrderListItem = ({ item }: { item: orderDataType }) => {
  const [product, setProduct] = useState<bookDataType | null>(null);

  // 주문 날짜 설정 (YYYY.MM.DD)
  const createDate = () => {
    const removeDate = item.createdAt
      .slice(0, item.createdAt.indexOf("T"))
      .replaceAll("-", ".");
    return removeDate;
  };

  // 썸네일 이미지 주문 목록에서 첫번째 상품 자동 선택
  const thumbNailISBN = item.orderItems.map((item) => item.isbn)[0];
  const imageUrl = `/product-images/${thumbNailISBN}.jpg`;

  useEffect(() => {
    getProductByISBN({ isbn: thumbNailISBN })
      .then((result) => {
        const productInformation = result;
        setProduct(productInformation);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const otherThanProduct =
    item.orderItems.length > 1 ? ` 외 ${item.orderItems.length - 1}권` : "";

  const titleCut = product
    ? product.title.length >= 20
      ? product.title.slice(0, 25) + "..." + otherThanProduct
      : product.title
    : "상품 정보를 가져오고 있습니다.";

  const orderListLink = `/mypage/order-detail?orderId=${item.orderNumber}`;

  return (
    <div className="bg-[#f9f9f9] overflow-hidden rounded-lg h-[150px] mb-4 flex justify-between items-center">
      <div className="text-sm h-[-webkit-fill-available] p-5 my-2 mr-2 flex flex-col justify-center items-center text-dark_gray border-light_gray border-r">
        <Link
          href={orderListLink}
          className="text-black font-semibold underline hover:underline hover:decoration-[#16a263] hover:text-[#16a263]"
        >
          {item.orderNumber}
        </Link>
        <p className="text-xs">{createDate()}</p>
      </div>
      <div className="flex flex-1 p-2">
        <div className="w-[100px] h-auto p-1 flex items-center">
          <img src={imageUrl} alt="모던 자바스크립트 Deep Dive" />
        </div>
        <p className="flex-1 ium ml-4 flex items-center text-base">
          {titleCut}
        </p>
      </div>
      <div className="bg-point h-[-webkit-fill-available] w-[150px] flex flex-col justify-center items-center border-light_gray border-l">
        <p className="text-white font-medium text-small">
          총 {item.orderItems.length}권
        </p>
        <p className="text-white font-semibold text-lg">{item.totalPrice}원</p>
        <Link
          href={orderListLink}
          className="mt-2 px-2 py-1 rounded text-[#fff] text-xs border hover:bg-[#16a263] hover:bg-opacity-10"
        >
          주문 상세
        </Link>
      </div>
    </div>
  );
};

export default OrderListItem;
