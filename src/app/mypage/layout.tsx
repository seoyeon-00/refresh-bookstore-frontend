"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { loginStore } from "@/stores";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname().split("/").slice(-1)[0];
  const userData = useContext(AuthContext);
  const [login, setlogin] = useRecoilState(loginStore.loginState);

  const logOutHandler = () => {
    setlogin({
      isLogin: false,
    });
    localStorage.removeItem("token");
    toast.success("로그아웃 완료!");
  };

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
          <Link
            className={"text-center py-1 m-2 text-[17px] font-medium "}
            href={"/"}
            onClick={logOutHandler}
          >
            로그아웃
          </Link>
          {userData?.user?.isAdmin ? (
            <Link
              className={` text-center py-1 m-2 text-[17px] font-medium 
          ${path === "admin-page" ? "font-semibold text-point" : ""}`}
              href={"/mypage/admin-page"}
            >
              관리자
            </Link>
          ) : null}
        </section>
        {children}
      </div>
    </div>
  );
};

export default MyPageLayout;
