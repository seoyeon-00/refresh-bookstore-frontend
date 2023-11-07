"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname().split("/").slice(-1)[0];
  console.log(path);
  return (
    <div className="m-8">
      <h1 className="text-large my-1 font-bold pt-2 pb-5">마이페이지</h1>
      <hr className="text-light_gray" />
      <div className="flex">
        <section className="menu flex flex-col min-w-[150px] pt-[20px]">
          <Link
            className={` text-center py-1 m-2 text-[17px] font-medium 
            ${
              path === "order-list" || path === "order-detail"
                ? "font-semibold text-point"
                : ""
            }`}
            href={"/mypage/order-list"}
          >
            주문 내역
          </Link>
          <Link
            className={`text-center py-1 m-2 text-[17px] font-medium 
            ${path === "mypage" ? "font-semibold text-point" : ""}`}
            href={"/mypage"}
          >
            회원정보수정
          </Link>
        </section>
        {children}
      </div>
    </div>
  );
};

export default MyPageLayout;
