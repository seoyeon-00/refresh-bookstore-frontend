"use client";

import { findPassword } from "@/api/user";
import IsLoading from "@/components/Common/IsLoading";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const FindPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isDataCheck = email !== "" && date !== "";
  const data = {
    email: email,
    birth: date,
  };

  const FindPasswordHandler = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const fetchData = await findPassword(data);
      if (fetchData.ok) {
        setIsLoading(false);
        toast.success(`이메일 전송 완료! 변경된 비밀번호를 확인해주세요.`);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="pt-[50px]">
      {isLoading && <IsLoading>Loading...</IsLoading>}
      <p className="font-semibold text-2xl">비밀번호 찾기</p>
      <p className="text-xs text-neutral-500 mt-1">
        해당 이메일로 임시 비밀번호가 발송됩니다.
      </p>
      <div className="mt-[40px]">
        <div className=" w-full h-[50px] flex flex-row justify-around items-center mb-2">
          <label className="w-[20%] h-full flex flex-col justify-center items-start font-semibold text-sm mx-3">
            아이디
          </label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="아이디를 입력해주세요."
            className="w-[80%] h-[40px] bg-neutral-100 rounded-full px-4 text-sm"
          />
        </div>
        <div className=" w-full h-[50px] flex flex-row justify-around items-center mb-2">
          <label className="w-[20%] h-full flex flex-col justify-center items-start font-semibold text-sm mx-3">
            생년월일
          </label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-[80%] h-[40px] bg-neutral-100 rounded-full px-4 text-sm"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={FindPasswordHandler}
            className={`text-white px-5 py-2 rounded-full text-sm ${
              !isDataCheck ? "bg-neutral-600" : "bg-point"
            }`}
            disabled={!isDataCheck}
          >
            임시 비밀번호 발급
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
