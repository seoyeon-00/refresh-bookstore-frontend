import RefreshAnimation from "@/components/Home/RefreshAnimation";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-start items-center">
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
          <form className="w-full h-full flex flex-col justify-start items-start m-10 px-5 ">
            <div className=" w-full flex flex-row justify-around items-start my-3">
              <label className="w-[20%] h-full flex flex-col justify-center items-start font-semibold text-lg mx-3 ">
                이메일
              </label>
              <input className="w-[65%] h-[40px] border-b border-point  outline-none" />
            </div>
            <div className=" w-full h-[50px] flex flex-row justify-around items-center  mb-8">
              <label className="w-[20%] h-full flex flex-col justify-center items-start font-semibold text-lg mx-3">
                비밀번호
              </label>
              <input
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
