"use client";

import RefreshAnimation from "@/components/Home/RefreshAnimation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { loginUser } from "@/api/auth";
import AlertIcon from "@/components/Common/Icons/AlertIcon";
import IsLoading from "@/components/Common/IsLoading";

const LoginPage = () => {
  const emailInput = React.useRef<HTMLInputElement>(null);
  const passwordInput = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email: emailInput.current!.value,
      password: passwordInput.current!.value,
    };

    const status = await loginUser(data);
    if (status === 200) {
      setIsLoading(false);
      router.push("/"); // 메인 화면으로 이동
    }
  };

  return (
    <div className="w-full h-[80vh] flex flex-col justify-start items-center">
      {isLoading && <IsLoading />}
      <div className="w-[80%] h-[80px] mt-5 font-black text-3xl text-dark_green flex flex-col justify-center items-end ">
        로그인
      </div>
      <div className="w-[80%] h-[20px] mb-8 font-light text-2xl text-point flex flex-col justify-center items-end ">
        로그인 해주세요.
      </div>
      <div className="w-full flex flex-row justify-between relative">
        <div className="w-[80%] h-[400px] bg-light_green blur-xl opacity-50 rounded-2xl relative overflow-hidden">
          <RefreshAnimation />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-start absolute whitespace-pre-wrap  text-lg italic text-dark_green">{`당신의 내일을 Refresh하는 서점,\n리프레쉬북스입니다.`}</div>
        <div className="w-[50%] h-[350px] bg-white absolute right-[8%] rounded-2xl border border-light_gray shadow-lg top-[20%] flex flex-col justify-start items-center px-5">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-start items-start m-10 px-5 "
          >
            <div className=" w-full flex flex-row justify-around items-start my-3">
              <label className="w-[20%] h-full flex flex-col justify-center items-start font-semibold text-lg mx-3 ">
                이메일
              </label>
              <input
                ref={emailInput}
                className="w-[65%] h-[40px] border-b border-point  outline-none"
              />
            </div>
            <div className=" w-full h-[50px] flex flex-row justify-around items-center  mb-8">
              <label className="w-[20%] h-full flex flex-col justify-center items-start font-semibold text-lg mx-3">
                비밀번호
              </label>
              <input
                ref={passwordInput}
                className="w-[65%] h-[40px] border-b border-point  outline-none"
                type="password"
              />
            </div>
            <button
              className="w-full h-[50px] rounded-lg  my-2 bg-point hover:bg-dark_green text-white text-lg font-extrabold"
              type="submit"
            >
              로그인
            </button>
            <Link className="w-full" href="/register">
              <button className="w-full h-[50px] rounded-lg  my-2 bg-white border hover:bg-light_gray border-point text-point text-lg font-extrabold">
                회원가입
              </button>
            </Link>
          </form>
          <div className="flex items-center mt-2">
            <span className="mr-1">
              <AlertIcon width="18px" color="#adadad" />
            </span>
            <span className="text-sm text-[#666] font-medium">
              비밀번호를 잃어버리셨나요?{" "}
              <span className="font-semibold text-[#333] cursor-pointer">
                <Link href="/login/find-password">비밀번호 찾기</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
