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

const MyPage = () => {
  const userData = useContext(AuthContext);
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );
  const [address, setAddress] = useState({
    address: "",
    zonecode: "",
  });

  const [inputCheck, setInputCheck] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    address: "",
    birth: "",
  });

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [addressZipcode, setAddressZipcode] = useState<string>("");
  const [addressAddress, setAddressAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [birth, setBirth] = useState<string>("");

  useEffect(() => {
    console.log(userData?.user);
    setAddressZipcode(address.zonecode);
    setAddressAddress(address.address);
  }, [address]);

  const handlePostClick = () => {
    setPopup(!popup);
  };

  const validateName = (value: string) => {
    let error = "";
    if (value.length == 1) {
      error = "2글자 이상 입력하세요.";
      setInputCheck((prevState) => ({ ...prevState, name: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, name: "" }));
    }
  };

  const validatePassword = (value: string) => {
    var passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,20}$/;
    let error = "";
    if (!passwordPattern.test(value) && value.length > 0) {
      error = "8~20자의 특수문자, 영문자, 숫자를 포함한 조합";
      setInputCheck((prevState) => ({ ...prevState, password: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, password: "" }));
    }
  };

  const validatePhoneNumber = (value: string) => {
    var phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
    let error = "";
    if (
      !phoneNumberPattern.test(value) &&
      value.length > 0 &&
      value.length <= 12
    ) {
      error = "올바른 번호를 입력해주세요.";
      setInputCheck((prevState) => ({ ...prevState, phoneNumber: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, phoneNumber: "" }));
    }
  };

  const validateAdress = (value: string) => {
    let error = "";
    if (value.length === 1) {
      error = "올바른 번호를 입력해주세요.";
      setInputCheck((prevState) => ({ ...prevState, address: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, address: "" }));
    }
  };

  const validateBirth = (value: string) => {
    const date = value.split("-");
    var y = parseInt(date[0], 10),
      m = parseInt(date[1], 10),
      d = parseInt(date[2], 10);

    var dateRegex =
      /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    let error = "";
    if (
      !dateRegex.test(d + "-" + m + "-" + y) &&
      value.length > 0 &&
      value.length <= 9
    ) {
      error = "올바른 날짜를 입력해주세요.";
      setInputCheck((prevState) => ({ ...prevState, birth: error }));
    } else {
      setInputCheck((prevState) => ({ ...prevState, birth: "" }));
    }
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
