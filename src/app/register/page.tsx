"use client";
import AlertIcon from "@/components/Common/Icons/AlertIcon";
import CheckIcon from "@/components/Common/Icons/CheckIcon";
import Post from "@/components/Common/Post";
import { postCodePopupStore } from "@/stores";
import autoHyphen from "@/utils/autoHyphen";
import autoHyphenBirth from "@/utils/autoHyphenBirth";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

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
    birth: {
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

  const [authEmail, setAuthEmail] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);

  const emailInput = React.useRef<HTMLInputElement>(null);
  const emailCheckInput = React.useRef<HTMLInputElement>(null);
  const nameInput = React.useRef<HTMLInputElement>(null);
  const passwordInput = React.useRef<HTMLInputElement>(null);
  const passwordConfirmInput = React.useRef<HTMLInputElement>(null);
  const phoneNumberInput = React.useRef<HTMLInputElement>(null);
  const addressZipcodeInput = React.useRef<HTMLInputElement>(null);
  const addressAddressInput = React.useRef<HTMLInputElement>(null);
  const addressDetailInput = React.useRef<HTMLInputElement>(null);
  const birthInput = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

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

    if (emailCheck) {
      setInputCheck((prevState) => ({
        ...prevState,
        email: { ...prevState.email, status: "correct" },
      }));
      if (emailInput.current) {
        emailInput.current.style.borderBottomColor = "#1DC078";
      }
    }
  }, [inputCheck.password, emailCheck]);

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
        email: { ...prevState.email, status: "default" },
      }));
      if (emailInput.current) {
        emailInput.current.style.borderBottomColor = "black";
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
    var passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,20}$/;
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

  const checkBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    birthInput.current
      ? (birthInput.current.value = autoHyphenBirth(e.target.value))
      : "";

    const checkValidate = (value: string) => {
      var result = true;
      try {
        const date = value.split("-");
        var y = parseInt(date[0], 10),
          m = parseInt(date[1], 10),
          d = parseInt(date[2], 10);

        var dateRegex =
          /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
        result = dateRegex.test(d + "-" + m + "-" + y);
      } catch (error) {
        result = false;
      }
      return result;
    };

    setInputCheck((prevState) => ({
      ...prevState,
      birth: { ...prevState.birth, value: e.target.value },
    }));

    if (e.target.value === "") {
      setInputCheck((prevState) => ({
        ...prevState,
        birth: { ...prevState.birth, status: "default" },
      }));
      if (birthInput.current) {
        birthInput.current.style.borderBottomColor = "black";
      }
    } else if (checkValidate(e.target.value)) {
      setInputCheck((prevState) => ({
        ...prevState,
        birth: { ...prevState.birth, status: "correct" },
      }));
      if (birthInput.current) {
        birthInput.current.style.borderBottomColor = "#1DC078";
      }
    } else {
      setInputCheck((prevState) => ({
        ...prevState,
        birth: { ...prevState.birth, status: "wrong" },
      }));
      if (birthInput.current) {
        birthInput.current.style.borderBottomColor = "red";
      }
    }
  };

  const handlePostClick = () => {
    setPopup(!popup);
  };

  // 이메일 중복 확인
  const emailDoubleCheck = async (): Promise<boolean> => {
    const data = {
      email: emailInput.current ? emailInput.current.value : "no email",
    };
    try {
      const response = await fetch("/api/user/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Email double check request failed");
      }

      const result = await response.json();
      console.log(result);
      return true;
    } catch (err) {
      toast.error("중복된 이메일입니다.");
      return false;
    }
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
      birth: birthInput.current ? birthInput.current.value : "no birth",
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
      router.push("/login");
      toast.error("회원가입이 완료되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  // 이메일 인증메일 전송
  const authEmailHander = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const isEmailDuplicate: boolean = await emailDoubleCheck();
    if (!isEmailDuplicate) {
      return;
    }

    if (emailInput.current && emailInput.current.value === "") {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    const data = {
      email: emailInput.current ? emailInput.current.value : "no email",
    };

    try {
      const response = await fetch("/api/certify/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await response.json();
      toast.success("전송 완료! 인증을 진행해주세요.");
      setAuthEmail(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 이메일 인증 확인
  const authEmailCheckHander = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (emailCheckInput.current && emailCheckInput.current.value === "") {
      toast.error("인증번호를 입력해주세요.");
      return;
    }
    const data = {
      key: emailCheckInput.current
        ? emailCheckInput.current.value
        : "no email certification number",
    };

    try {
      const response = await fetch("/api/certify/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await response.json();

      if (response.ok) {
        toast.success("인증 완료!");
        setAuthEmail(false);
        setEmailCheck(true);
      } else {
        toast.error("인증 실패. 다시 입력해주세요.");
      }
    } catch (error) {
      console.error(error);
      toast.error("인증 실패. 다시 인증해주세요.");
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
              type="text"
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
            <div className="flex flex-row justify-between gap-2">
              <div className="w-[70%]">
                <input
                  ref={emailInput}
                  className={`w-full h-[30px] border-b border-black text-xl outline-none`}
                  onChange={(e) => checkEmail(e)}
                  placeholder="이메일을 입력해주세요."
                  type="email"
                />
              </div>
              <div className="bg-point px-4 w-[30%] bold text-center cursor-pointer">
                <button
                  onClick={(event) => authEmailHander(event)}
                  className="text-white font-bold text-sm"
                  type="button"
                >
                  이메일 인증
                </button>
              </div>
            </div>
            <div className="mt-3">
              {authEmail ? (
                <div className="flex flex-row justify-between gap-2">
                  <div className="w-[70%]">
                    <input
                      ref={emailCheckInput}
                      className={`w-full h-[30px] border-b border-black text-xl outline-none`}
                      placeholder="인증번호를 입력해주세요."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(event) => authEmailCheckHander(event)}
                    className="w-[30%] bg-point text-white font-bold text-sm cursor-pointer"
                  >
                    인증하기
                  </button>
                </div>
              ) : null}
            </div>
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
        <div className="w-[60%] h-[70px] flex flex-row justify-around items-start mx-10 my-2">
          {inputCheck.birth.status === "correct" ? (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center text-point font-bold text-xl">
              생년월일 <CheckIcon color="#1DC078" width="20px" />
            </label>
          ) : (
            <label className="w-[25%] h-[30px] flex flex-row justify-start items-center font-semibold text-xl">
              생년월일
            </label>
          )}

          <div className="w-[65%] flex flex-col justify-start">
            <input
              className="w-full h-[30px] border-b border-black text-xl outline-none"
              ref={birthInput}
              onChange={(e) => checkBirth(e)}
              placeholder="생년월일을 입력해주세요."
            />
            <div className="text-xs text-red">
              {inputCheck.birth.status === "wrong" ? (
                <div className="text-xs text-red flex flex-row items-center">
                  <AlertIcon width="15px" color="red" />
                  정확한 생년월일을 입력해주세요.
                </div>
              ) : (
                ""
              )}
            </div>
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
