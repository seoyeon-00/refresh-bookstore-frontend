"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyPage = () => {
  const userData = useContext(AuthContext);

  useEffect(() => {
    console.log(userData?.user);
  }, []);

  return (
    <section className="w-[100%] border-l border-light_gray min-h-[70vh] p-10">
      <div className="font-semibold text-xl">회원정보수정</div>
      <div className="mt-7">
        <div className="flex flex-row items-center">
          <label className="w-[10%] font-semibold">이름</label>
          <input
            className="w-[80%] px-3 py-2 bg-neutral-300 text-black"
            placeholder={userData?.user?.name}
          />
        </div>
      </div>
    </section>
  );
};

export default MyPage;
