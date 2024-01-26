import { useState } from "react";

const useInputValidation = () => {
  const [inputCheck, setInputCheck] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    address: "",
    birth: "",
  });

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

  return {
    inputCheck,
    validateName,
    validatePassword,
    validatePhoneNumber,
    validateAdress,
    validateBirth,
  };
};

export default useInputValidation;
