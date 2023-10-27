"use client";
import AlertIcon from "@/components/Common/Icons/AlertIcon";
import CheckIcon from "@/components/Common/Icons/CheckIcon";
import Post from "@/components/Common/Post";
import { postCodePopupStore } from "@/stores";
import autoHyphen from "@/utils/autoHyphen";
import React, { FormEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const RegisterPage = () => {
  const [inputCheck, setInputCheck] = useState({
    name: {
      value: "",
      status: "default",
      isConfirmed: false,
    },
    email: {
      value: "",
      status: "default",
      isConfirmed: false,
    },
    password: {
      value: "",
      status: "default",
      isConfirmed: false,
    },
    passwordConfirm: {
      value: "",
      status: "default",
      isConfirmed: false,
    },
    phoneNumber: {
      value: "",
      status: "default",
      isConfirmed: false,
    },
    address: {
      value: "",
      status: "default",
      isConfirmed: false,
    },
  });
  const [popup, setPopup] = useRecoilState(
    postCodePopupStore.postCodePopupState
  );
  const [address, setAddress] = useState({
    address: "",
    zonecode: "",
  });

  const emailInput = React.useRef<HTMLInputElement>(null);
  const nameInput = React.useRef<HTMLInputElement>(null);
  const passwordInput = React.useRef<HTMLInputElement>(null);
  const passwordConfirmInput = React.useRef<HTMLInputElement>(null);
  const phoneNumberInput = React.useRef<HTMLInputElement>(null);
  const addressZipcodeInput = React.useRef<HTMLInputElement>(null);
  const addressAddressInput = React.useRef<HTMLInputElement>(null);
  const addressDetailInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputCheck.passwordConfirm.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "default" },
      }));
    } else if (inputCheck.password.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "default" },
      }));
    } else if (inputCheck.passwordConfirm.value === inputCheck.password.value) {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "correct" },
      }));
      if (passwordConfirmInput.current) {
        passwordConfirmInput.current.style.borderBottomColor = "#1DC078";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "wrong" },
      }));
      if (passwordConfirmInput.current) {
        passwordConfirmInput.current.style.borderBottomColor = "red";
      }
    }
  }, [inputCheck.password]);

  const checkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCheck((prevState) => ({
      ...prevState,
      name: { ...prevState.name, value: e.target.value },
    }));
    if (e.target.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        name: { ...prevState.name, status: "default" },
      }));
      if (nameInput.current) {
        nameInput.current.style.borderBottomColor = "black";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        name: { ...prevState.name, status: "correct" },
      }));
      if (nameInput.current) {
        nameInput.current.style.borderBottomColor = "#1DC078";
      }
    }
  };

  const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    var emailPattern = /^\S+@\S+\.\S+$/;
    setInputCheck((prevState) => ({
      ...prevState,
      email: { ...prevState.email, value: e.target.value },
    }));

    if (e.target.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        email: { ...prevState.email, status: "default" },
      }));
      if (emailInput.current) {
        emailInput.current.style.borderBottomColor = "black";
      }
    } else if (emailPattern.test(e.target.value)) {
      setInputCheck((prevState) => ({
        ...prevState,
        email: { ...prevState.email, status: "correct" },
      }));
      if (emailInput.current) {
        emailInput.current.style.borderBottomColor = "#1DC078";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        email: { ...prevState.email, status: "wrong" },
      }));
      if (emailInput.current) {
        emailInput.current.style.borderBottomColor = "red";
      }
    }
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    var passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    setInputCheck((prevState) => ({
      ...prevState,
      password: { ...prevState.password, value: e.target.value },
    }));

    if (e.target.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        password: { ...prevState.password, status: "default" },
      }));
      if (passwordInput.current) {
        passwordInput.current.style.borderBottomColor = "black";
      }
    } else if (passwordPattern.test(e.target.value)) {
      setInputCheck((prevState) => ({
        ...prevState,
        password: { ...prevState.password, status: "correct" },
      }));
      if (passwordInput.current) {
        passwordInput.current.style.borderBottomColor = "#1DC078";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        password: { ...prevState.password, status: "wrong" },
      }));
      if (passwordInput.current) {
        passwordInput.current.style.borderBottomColor = "red";
      }
    }
  };

  const checkPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCheck((prevState) => ({
      ...prevState,
      passwordConfirm: { ...prevState.passwordConfirm, value: e.target.value },
    }));
    if (e.target.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "default" },
      }));
      if (passwordConfirmInput.current) {
        passwordConfirmInput.current.style.borderBottomColor = "black";
      }
    } else if (
      passwordInput.current
        ? passwordInput.current.value === e.target.value
        : false
    ) {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "correct" },
      }));
      if (passwordConfirmInput.current) {
        passwordConfirmInput.current.style.borderBottomColor = "#1DC078";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        passwordConfirm: { ...prevState.passwordConfirm, status: "wrong" },
      }));
      if (passwordConfirmInput.current) {
        passwordConfirmInput.current.style.borderBottomColor = "red";
      }
    }
  };

  const checkPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    phoneNumberInput.current
      ? (phoneNumberInput.current.value = autoHyphen(e.target.value))
      : "";
    var phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
    setInputCheck((prevState) => ({
      ...prevState,
      phoneNumber: { ...prevState.phoneNumber, value: e.target.value },
    }));

    if (e.target.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        phoneNumber: { ...prevState.phoneNumber, status: "default" },
      }));
      if (phoneNumberInput.current) {
        phoneNumberInput.current.style.borderBottomColor = "black";
      }
    } else if (phoneNumberPattern.test(e.target.value)) {
      setInputCheck((prevState) => ({
        ...prevState,
        phoneNumber: { ...prevState.phoneNumber, status: "correct" },
      }));
      if (phoneNumberInput.current) {
        phoneNumberInput.current.style.borderBottomColor = "#1DC078";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        phoneNumber: { ...prevState.phoneNumber, status: "wrong" },
      }));
      if (phoneNumberInput.current) {
        phoneNumberInput.current.style.borderBottomColor = "red";
      }
    }
  };

  const checkAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (addressZipcodeInput.current) {
      addressZipcodeInput.current.value
        ? (addressZipcodeInput.current.style.borderBottomColor = "#1DC078")
        : (addressZipcodeInput.current.style.borderBottomColor = "black");
    }
    if (addressAddressInput.current) {
      addressAddressInput.current.value
        ? (addressAddressInput.current.style.borderBottomColor = "#1DC078")
        : (addressAddressInput.current.style.borderBottomColor = "black");
    }
    if (addressDetailInput.current) {
      addressDetailInput.current.value
        ? (addressDetailInput.current.style.borderBottomColor = "#1DC078")
        : (addressDetailInput.current.style.borderBottomColor = "black");
    }

    if (
      addressZipcodeInput.current?.value &&
      addressAddressInput.current?.value &&
      addressDetailInput.current?.value
    ) {
      setInputCheck((prevState) => ({
        ...prevState,
        address: { ...prevState.address, status: "correct" },
      }));
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        address: { ...prevState.address, status: "wrong" },
      }));
    }
  };

  const handlePostClick = () => {
    setPopup(!popup);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      name: nameInput.current ? nameInput.current.value : "no name",
      email: emailInput.current ? emailInput.current.value : "no email",
      password: passwordInput.current
        ? passwordInput.current.value
        : "no password",
      postalCode: addressZipcodeInput.current
        ? addressZipcodeInput.current.value
        : "no postal code",
      address: addressAddressInput.current
        ? addressAddressInput.current.value
        : "no address",
      detailAddress: addressDetailInput.current
        ? addressDetailInput.current.value
        : "no address",
      phone: phoneNumberInput.current
        ? phoneNumberInput.current.value
        : "no phone number",
    };

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center">
      <div className="w-[80%] h-[80px] mt-10 font-black text-3xl text-dark_green flex flex-col justify-center items-end ">
        회원가입
      </div>
      <div className="w-[80%] h-[20px] mb-20 font-light text-2xl text-point flex flex-col justify-center items-end mt-5">
        리프레쉬북과 함께 일상을 Refresh하세요!
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-start items-center m-10"
      >
        <div className="w-[60%] h-[70px] flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.name.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              이름 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              이름
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <input
              className="w-full h-[30px] border-b border-black text-xl outline-none"
              ref={nameInput}
              onChange={(e) => checkName(e)}
              placeholder="이름을 입력해주세요."
            />
          </div>
        </div>
        <div className="w-[60%] h-[70px] flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.email.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              이메일 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              이메일
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <input
              ref={emailInput}
              className={`w-full h-[30px] border-b border-black text-xl outline-none`}
              onChange={(e) => checkEmail(e)}
              placeholder="이메일을 입력해주세요."
            />
            <div className="text-xs text-red">
              {inputCheck.email.status === "wrong" ? (
                <div className="text-xs text-red flex flex-row items-center">
                  <AlertIcon width="15px" color="red" />
                  올바른 형식의 이메일을 입력해주세요.
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="w-[60%] h-[70px] flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.password.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              비밀번호 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              비밀번호
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <input
              type="password"
              ref={passwordInput}
              className={`w-full h-[30px] border-b border-black text-xl outline-none`}
              onChange={(e) => checkPassword(e)}
              placeholder="비밀번호를 입력해주세요."
            />
            <div className="text-xs text-red">
              {inputCheck.password.status === "wrong" ? (
                <div className="text-xs text-red flex flex-row items-center">
                  <AlertIcon width="15px" color="red" />
                  비밀번호는 8~20자의 영문자와 숫자를 포함한 조합으로
                  입력해주세요.
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="w-[60%] h-[70px] flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.passwordConfirm.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              비밀번호 확인 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              비밀번호 확인
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <input
              type="password"
              ref={passwordConfirmInput}
              className={`w-full h-[30px] border-b border-black text-xl outline-none`}
              onChange={(e) => checkPasswordConfirm(e)}
              placeholder="비밀번호를 확인해주세요."
            />
            <div className="text-xs text-red">
              {inputCheck.passwordConfirm.status === "wrong" ? (
                <div className="text-xs text-red flex flex-row items-center">
                  <AlertIcon width="15px" color="red" />
                  비밀번호가 일치하지 않습니다.
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="w-[60%] h-[70px] flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.phoneNumber.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              휴대폰 번호 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              휴대폰 번호
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <input
              ref={phoneNumberInput}
              className={`w-full h-[30px] border-b border-black text-xl outline-none`}
              onChange={(e) => checkPhoneNumber(e)}
              placeholder="휴대폰 번호를 입력해주세요."
            />
            <div className="text-xs text-red flex flex-row items-center">
              {inputCheck.phoneNumber.status === "wrong" ? (
                <div className="text-xs text-red flex flex-row items-center">
                  <AlertIcon width="15px" color="red" />
                  올바른 번호를 입력해주세요.
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="w-[60%] h-auto flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.address.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              주소 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              주소
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <div className="w-full flex flex-row justify-between">
              <input
                ref={addressZipcodeInput}
                className={`w-[45%] h-[30px] border-b my-3 border-black text-xl outline-none`}
                onChange={(e) => checkAddress(e)}
                onClick={handlePostClick}
                value={address.zonecode}
                placeholder="우편번호"
              />
              <input
                type="button"
                className="w-[50%] h-[35px] rounded-md  my-2 bg-white border hover:bg-light_gray border-black text-lg font-bold"
                onClick={handlePostClick}
                value="우편번호 찾기"
              />
            </div>

            <input
              ref={addressAddressInput}
              className={`w-full h-[30px] border-b my-3 border-black text-xl outline-none`}
              onChange={(e) => checkAddress(e)}
              value={address.address}
              onClick={handlePostClick}
              placeholder="주소를 입력해주세요."
            />
            <input
              ref={addressDetailInput}
              className={`w-full h-[30px] border-b my-3 border-black text-xl outline-none`}
              onChange={(e) => checkAddress(e)}
              placeholder="상세주소를 입력해주세요."
            />
          </div>
        </div>
        <div className="w-[60%] h-[100px] flex flex-col justify-around items-start mx-10 my-2">
          {inputCheck.name.status === "correct" &&
          inputCheck.email.status === "correct" &&
          inputCheck.password.status === "correct" &&
          inputCheck.passwordConfirm.status === "correct" &&
          inputCheck.phoneNumber.status === "correct" &&
          inputCheck.address.status === "correct" ? (
            <button
              className="w-full h-[50px] rounded-lg  my-2 bg-point hover:bg-dark_green text-white text-lg font-extrabold"
              type="submit"
            >
              가입하기
            </button>
          ) : (
            <div className="w-full h-[50px] rounded-lg  my-2 bg-gray text-white text-lg font-extrabold flex flex-col justify-center items-center">
              가입하기
            </div>
          )}
        </div>
      </form>
      {popup && <Post address={address} setAddress={setAddress} />}
    </div>
  );
};

export default RegisterPage;
