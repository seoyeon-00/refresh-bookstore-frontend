"use client";

import React, { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { postCodePopupStore } from "@/stores";
import { useRecoilState } from "recoil";
import Post from "@/components/Common/Post";
import autoHyphen from "@/utils/autoHyphen";
import autoHyphenBirth from "@/utils/autoHyphenBirth";
import { updateUser } from "@/api/user";
import { toast } from "react-hot-toast";
import useInputValidation from "@/hooks/useInputValidation";

const MyPage = () => {
  const userData = useContext(AuthContext);
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );
  const [address, setAddress] = useState({
    address: "",
    zonecode: "",
  });

  const {
    inputCheck,
    validateName,
    validatePassword,
    validatePhoneNumber,
    validateAdress,
    validateBirth,
  } = useInputValidation();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [addressZipcode, setAddressZipcode] = useState<string>("");
  const [addressAddress, setAddressAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [birth, setBirth] = useState<string>("");

  useEffect(() => {
    setAddressZipcode(address.zonecode);
    setAddressAddress(address.address);
  }, [address]);

  const handlePostClick = () => {
    setPopup(!popup);
  };

  const data = {
    name: name === "" ? userData?.user?.name : name,
    email: userData?.user?.email,
    phone: !phoneNumber ? userData?.user?.phone : phoneNumber,
    password: password === "" ? userData?.user?.password : password,
    postalCode: !addressZipcode ? userData?.user?.postalCode : addressZipcode,
    address: !addressAddress ? userData?.user?.address : addressAddress,
    detailAddress: !addressDetail
      ? userData?.user?.detailAddress
      : addressDetail,
    birth: !birth ? userData?.user?.birth : birth,
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const result = await updateUser(data);
    if (result.status === 200) {
      toast.success("수정이 완료되었습니다.");
    }
  };

  return (
    <section className="w-[100%] border-l relative border-light_gray min-h-[70vh] p-10">
      <div className="font-semibold text-xl">회원정보수정</div>
      <div className="mt-7">
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">이름</label>
          <div className="w-[87%] relative">
            <input
              value={name}
              className="w-full px-3 py-2 bg-neutral-100 text-black"
              placeholder={userData?.user?.name}
              onChange={(e) => {
                const newName = e.target.value;
                setName(newName);
                validateName(newName);
              }}
            />
            <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500">
              {inputCheck.name !== "" ? <div>{inputCheck.name}</div> : null}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">비밀번호</label>
          <div className="w-[87%] relative">
            <input
              type="password"
              value={password}
              className="w-full px-3 py-2 bg-neutral-100 text-black"
              placeholder={"*********"}
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
                validatePassword(newPassword);
              }}
            />
            <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500">
              {inputCheck.password !== "" ? (
                <div>{inputCheck.password}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">전화번호</label>
          <div className="w-[87%] relative">
            <input
              value={phoneNumber}
              className="w-full px-3 py-2 bg-neutral-100 text-black"
              placeholder={userData?.user?.phone}
              onChange={(e) => {
                const newPhoneNumber = e.target.value;
                setPhoneNumber(autoHyphen(newPhoneNumber));
                validatePhoneNumber(newPhoneNumber);
              }}
            />
            <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500">
              {inputCheck.phoneNumber !== "" ? (
                <div>{inputCheck.phoneNumber}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mb-3">
          <label className="w-[13%] font-semibold">주소</label>
          <div className="w-[87%]  py-2 text-black">
            <div className="w-full flex flex-row justify-between gap-3 mb-3">
              <input
                value={address.zonecode}
                className={`w-[60%] px-3 py-2 bg-neutral-100 text-black`}
                placeholder={userData?.user?.postalCode}
                onClick={handlePostClick}
                onChange={(e) => setAddressZipcode(e.target.value)}
              />
              <button
                onClick={handlePostClick}
                className="w-[40%] rounded-md px-3 py-2 bg-white border hover:bg-point hover:text-white text-point border-point text-[14px] font-bold"
              >
                우편번호 찾기
              </button>
            </div>

            <input
              className={`w-full px-3 py-2 bg-neutral-100 text-black mb-3`}
              placeholder={userData?.user?.address}
              value={address.address}
              onClick={handlePostClick}
              onChange={(e) => {
                setAddressAddress(e.target.value);
              }}
            />
            <div className="w-[100%] relative">
              <input
                value={addressDetail}
                className={`w-full px-3 py-2 bg-neutral-100 text-black mb-3`}
                placeholder={userData?.user?.detailAddress}
                onChange={(e) => {
                  const newAdressDetail = e.target.value;
                  setAddressDetail(newAdressDetail);
                  validateAdress(newAdressDetail);
                }}
              />
              <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500">
                {inputCheck.address !== "" ? (
                  <div>{inputCheck.address}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mb-3">
        <label className="w-[13%] font-semibold">생일</label>
        <div className="w-[87%] relative">
          <input
            value={birth}
            className="w-full px-3 py-2 bg-neutral-100 text-black"
            placeholder={userData?.user?.birth}
            onChange={(e) => {
              const newBirth = e.target.value;
              setBirth(autoHyphenBirth(newBirth));
              validateBirth(newBirth);
            }}
          />
          <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500">
            {inputCheck.birth !== "" ? <div>{inputCheck.birth}</div> : null}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-[2.5rem]">
        <button
          onClick={submitHandler}
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
