"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname().split("/").slice(-1)[0];
  console.log(path);
  return (
    <div className="m-8">
      <h1 className="text-large my-1">마이페이지</h1>
      <hr className="text-light_gray" />
      <div className="flex">
        <section className="menu flex flex-col min-w-[150px]">
          <Link
            className={`text-medium text-center p-2 m-2 ${
              path === "order-list" || path === "order-detail"
                ? "font-semibold text-point"
                : ""
            }`}
            href={"/mypage/order-list"}
          >
            주문 내역
          </Link>
          <Link
            className={`text-medium text-center p-2 m-2 ${
              path === "mypage" ? "font-semibold text-point" : ""
            }`}
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
