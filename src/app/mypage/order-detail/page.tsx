"use client";

import { useSearchParams } from "next/navigation";
import OrderDetailItem from "../../../components/order-detail/OrderDetailItem";
import books from "../../../../public/mock-data/products.json";

const OrderDetail = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const mockData = books.slice(0, 2);
  console.log(mockData);
  return (
    <section className="border-l border-light_gray min-h-[70vh] p-4 flex-1">
      <h1 className="w-fit text-medium font-[600] border-dark_gray border-b-2 mb-2">
        주문/배송 상세
      </h1>
      <div className="flex items-center">
        <h2 className="p-2 font-semibold text-regular">주문 날짜</h2>
        <p className="p-2 text-medium font-light">2023.07.20</p>
      </div>
      <div className="flex items-center">
        <h2 className="p-2 font-semibold text-regular">주문 번호</h2>
        <p className="p-2 text-medium font-light">{orderId}</p>
      </div>
      <div className="flex items-center">
        <h2 className="p-2 font-semibold text-regular">배송 상태</h2>
        <p className="p-2 text-medium font-light">배송중</p>
      </div>
      <div className="flex items-center">
        <h2 className="p-2 font-semibold text-regular">주문 상품</h2>
        <hr className="text-light_gray flex-1 self-center mx-2" />
      </div>
      {mockData.map((item) => (
        <OrderDetailItem
          key={item.isbn}
          isbn={item.isbn}
          image_path={item.image_path}
          title={item.title}
          author={item.author}
          price={item.price}
          amount={1}
        />
      ))}
      <div className="m-4 mb-0 text-medium flex flex-col items-end">
        <div className="w-[30%] flex justify-between m-1">
          <p>상품 가격</p>
          <p>59,000원</p>
        </div>
        <div className="w-[30%] flex justify-between m-1">
          <p>배송비</p>
          <p>0원</p>
        </div>
        <div className="w-[30%] flex justify-between m-1">
          <p>총 결제 금액</p>
          <p>59,000원</p>
        </div>
      </div>
      <div className="flex items-center">
        <h2 className="p-2 font-semibold text-regular">받는 분 정보</h2>
        <hr className="text-light_gray flex-1 self-center mx-2" />
      </div>
      <div className="border-[1px] border-light_gray rounded m-2">
        <div className="flex items-center">
          <h2 className="p-2 font-semibold text-regular min-w-[110px] mx-2">
            이름
          </h2>
          <p className="p-2 font-light">엘리스</p>
        </div>
        <div className="flex items-center">
          <h2 className="p-2 font-semibold text-regular min-w-[110px] mx-2">
            연락처
          </h2>
          <p className="p-2 font-light">010-1234-1234</p>
        </div>
        <div className="flex items-center">
          <h2 className="p-2 font-semibold text-regular min-w-[110px] mx-2">
            주소
          </h2>
          <p className="p-2 font-light">
            (13529) 경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)
          </p>
        </div>
        <div className="flex items-center">
          <h2 className="p-2 font-semibold text-regular min-w-[110px] mx-2">
            배송 요청 사항
          </h2>
          <p className="p-2 font-light">요청사항 없음.</p>
        </div>
      </div>
      <div className="flex justify-end mx-1">
        <button className="rounded border-dark_gray border-[1px] px-2 py-1 m-1 text-dark_gray text-regular hover:bg-dark_gray hover:bg-opacity-10">
          주문정보 수정
        </button>
        <button className="rounded border-dark_gray border-[1px] px-2 py-1 m-1 text-dark_gray text-regular hover:bg-dark_gray hover:bg-opacity-10">
          주문 취소
        </button>
      </div>
    </section>
  );
};

export default OrderDetail;
