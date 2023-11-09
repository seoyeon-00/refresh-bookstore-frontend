"use client";

import { useSearchParams } from "next/navigation";

import CalendarIcon from "@/components/Common/Icons/CalendarIcon";
import ListolIcon from "@/components/Common/Icons/ListolIcon";
import TruckIcon from "@/components/Common/Icons/TruckIcon";
import OrderDetailItem from "../../../components/order-detail/OrderDetailItem";
import books from "../../../../public/mock-data/products.json";

const OrderDetail = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const mockData = books.slice(0, 2);
  console.log(mockData);

  return (
    <section className="border-l border-light_gray min-h-[70vh] p-[2.5rem] flex-1">
      <h1 className="w-fit text-medium font-[600] mb-3">주문/배송 상세정보</h1>
      <div className="w-full h-[2px] bg-neutral-100"></div>
      <div className="bg-[#f9f9f9] my-4 px-5 py-4">
        <div className="flex items-center mb-1">
          <div className="w-[20%] font-semibold text-[15px] flex flex-row items-center">
            <div>
              <CalendarIcon color="#1DC078" width="24px" isFull={false} />
            </div>
            <div className="ml-2 font-medium">주문 날짜</div>
          </div>
          <p className="text-[15px] font-normal">2023.07.20</p>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-[20%] font-semibold text-[15px] flex flex-row items-center">
            <div>
              <ListolIcon color="#1DC078" width="24px" isFull={false} />
            </div>
            <div className="ml-2 font-medium">주문 번호</div>
          </div>
          <p className="text-[15px] font-normal">{orderId}</p>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-[20%] font-semibold text-[15px] flex flex-row items-center">
            <div>
              <TruckIcon color="#1DC078" width="24px" isFull={false} />
            </div>
            <div className="ml-2 font-medium">배송 상태</div>
          </div>
          <p className="text-[15px] font-normal">배송중</p>
        </div>
      </div>
      <div className="flex mt-10 justify-between">
        <h2 className="font-semibold text-regular">주문 상품</h2>
        <div className="font-medium text-sm text-[#888]">
          총 <span className="text-point font-medium">{mockData.length}권</span>
          의 책을 주문하셨습니다
        </div>
      </div>
      <div className="mt-[10px] bg-[#f9f9f9] p-5">
        {mockData.map((item, index) => (
          <div key={`order-${index}`} className="mb-3">
            <OrderDetailItem
              key={item.isbn}
              isbn={item.isbn}
              image_path={item.image_path}
              title={item.title}
              author={item.author}
              price={item.price}
              amount={1}
            />
          </div>
        ))}
      </div>
      <div className="m-4 mb-0 text-base flex flex-col items-end">
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
      <div className="flex items-center mt-10 justify-between">
        <h2 className="font-semibold text-regular">받는 분 정보</h2>
        <div className="flex gap-1">
          <button className="text-sm font-medium rounded bg-point px-3 py-2 text-white text-regular hover:bg-[#a3f4ad]">
            주문정보 수정
          </button>
          <button className="text-sm font-medium rounded bg-neutral-400 px-3 py-2 text-white hover:bg-dark_gray">
            주문 취소
          </button>
        </div>
      </div>
      <div className="text-sm border-[1px] border-light_gray rounded mt-2 p-4">
        <div className="flex items-center mb-1">
          <h2 className="font-medium text-sm min-w-[110px] mx-2">이름</h2>
          <p className="font-light">엘리스</p>
        </div>
        <div className="flex items-center mb-1">
          <h2 className="font-medium text-sm min-w-[110px] mx-2">연락처</h2>
          <p className="font-light">010-1234-1234</p>
        </div>
        <div className="flex items-center mb-1">
          <h2 className="font-medium text-sm min-w-[110px] mx-2">주소</h2>
          <p className="font-light">
            (13529) 경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)
          </p>
        </div>
        <div className="flex items-center">
          <h2 className="font-medium text-sm min-w-[110px] mx-2">
            배송 요청 사항
          </h2>
          <p className="font-light">요청사항 없음.</p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
