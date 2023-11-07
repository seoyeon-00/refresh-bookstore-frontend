"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { postCodePopupStore } from "@/stores";
import { useRecoilState } from "recoil";
import Post from "@/components/Common/Post";

const MyPage = () => {
  const userData = useContext(AuthContext);
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );
  const [address, setAddress] = useState({
    address: "",
    zonecode: "",
  });

  useEffect(() => {
    console.log(userData?.user);
  }, []);

  const handlePostClick = () => {
    setPopup(!popup);
  };

  return (
    <section className="w-[100%] border-l relative border-light_gray min-h-[70vh] p-10">
      <div className="font-semibold text-xl">회원정보수정</div>
      <div className="mt-7">
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">이름</label>
          <input
            className="w-[87%] px-3 py-2 bg-neutral-100 text-black"
            placeholder={userData?.user?.name}
          />
        </div>
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">비밀번호</label>
          <input
            className="w-[87%] px-3 py-2 bg-neutral-100 text-black"
            placeholder={"*********"}
          />
        </div>
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">전화번호</label>
          <input
            className="w-[87%] px-3 py-2 bg-neutral-100 text-black"
            placeholder={userData?.user?.phone}
          />
        </div>
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">주소</label>
          <div className="w-[87%]  py-2 text-black">
            <div className="w-full flex flex-row justify-between gap-3 mb-3">
              <input
                className={`w-[60%] px-3 py-2 bg-neutral-100 text-black`}
                placeholder={userData?.user?.postalCode}
                onClick={handlePostClick}
                value={address.zonecode}
              />
              <input
                type="button"
                onClick={handlePostClick}
                className="w-[40%] rounded-md px-3 py-2 bg-white border hover:bg-point hover:text-white text-point border-point text-[14px] font-bold"
                value="우편번호 찾기"
              />
            </div>

            <input
              className={`w-full px-3 py-2 bg-neutral-100 text-black mb-3`}
              placeholder={userData?.user?.address}
              value={address.address}
              onClick={handlePostClick}
            />
            <input
              className={`w-full px-3 py-2 bg-neutral-100 text-black mb-3`}
              placeholder={userData?.user?.detailAddress}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mb-3">
        <label className="w-[13%] font-semibold">생일</label>
        <input
          className="w-[87%] px-3 py-2 bg-neutral-100 text-black"
          placeholder={userData?.user?.birth}
        />
      </div>

      <div className="absolute bottom-0 right-[2.5rem]">
        <button
          onClick={() => {}}
          className="bg-point px-5 py-2 text-white font-semibold text-[14px]"
        >
          수정하기
        </button>
      </div>
      {popup && <Post address={address} setAddress={setAddress} />}
    </section>
  );
};

export default MyPage;
