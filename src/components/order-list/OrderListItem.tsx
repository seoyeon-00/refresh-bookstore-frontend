import Link from "next/link";

const OrderListItem = () => {
  return (
    <div className="border-[1px] border-light_gray rounded-lg h-[150px] mb-4 flex justify-between items-center shadow-md">
      <div className="h-[-webkit-fill-available] p-4 my-2 mr-2 flex flex-col justify-center items-center text-dark_gray border-light_gray border-r">
        <Link
          href={"/mypage/order-detail?orderId=RJ558046"}
          className="underline hover:underline hover:decoration-[#16a263] hover:text-[#16a263]"
        >
          RJ558046
        </Link>
        <p>2023.07.19</p>
      </div>
      <div className="flex flex-1 p-2">
        <div className="w-[100px] h-auto p-1 flex items-center border-[1px] border-light_gray">
          <img
            src="/product-images/9791158392239.png"
            alt="모던 자바스크립트 Deep Dive"
          />
        </div>
        <p className="flex-1 text-medium mx-2 flex items-center">
          모던 자바스크립트 Deep Dive 외 1건
        </p>
      </div>
      <div className="h-[-webkit-fill-available] w-[150px] flex flex-col justify-center items-center p-4 my-2 border-light_gray border-l">
        <p className="text-small">총 1 권</p>
        <p className="text-medium">45,000원</p>
        <Link
          href={"/mypage/order-detail?orderId=RJ558046"}
          className="px-2 py-1 rounded text-[#16a263] text-small border hover:bg-[#16a263] hover:bg-opacity-10"
        >
          주문 상세
        </Link>
      </div>
    </div>
  );
};

export default OrderListItem;
