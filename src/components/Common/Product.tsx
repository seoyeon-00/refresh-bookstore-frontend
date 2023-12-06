import { createProduct } from "@/api/product";
import { productStore } from "@/stores";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

const Product = () => {
  const [popup, setPopup] = useRecoilState(productStore.productPopupState);
  const [account, setAccount] = useState({
    categoryId: 0,
    title: "",
    author: "",
    publisher: "",
    publicationDate: "",
    isbn: "",
    description: "",
    price: 0,
    imagePath: "",
    isBestSeller: false,
  });

  const [validationError, setValidationError] = useState({
    categoryId: "",
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    publicationDate: "",
    description: "",
  });

  const onChangeAccount = (e: any) => {
    const { name, value, type, checked } = e.target;
    const processedValue =
      type === "checkbox"
        ? checked
        : name === "categoryId" || name === "price"
        ? parseInt(value, 10)
        : value;

    setAccount({
      ...account,
      [name]: processedValue,
    });
  };

  const validateTitle = (value: string) => {
    let error = "";
    if (value.length == 1) {
      error = "2글자 이상 입력하세요.";
      setValidationError((prevState) => ({ ...prevState, title: error }));
    } else {
      setValidationError((prevState) => ({ ...prevState, title: "" }));
    }
  };

  const validateAuthor = (value: string) => {
    let error = "";
    if (value.length == 1) {
      error = "2글자 이상 입력하세요.";
      setValidationError((prevState) => ({ ...prevState, author: error }));
    } else {
      setValidationError((prevState) => ({ ...prevState, author: "" }));
    }
  };

  const validatePublisher = (value: string) => {
    let error = "";
    if (value.length == 1) {
      error = "2글자 이상 입력하세요.";
      setValidationError((prevState) => ({ ...prevState, publisher: error }));
    } else {
      setValidationError((prevState) => ({ ...prevState, publisher: "" }));
    }
  };

  const validateISBN = (value: string) => {
    let error = "";
    if (value.length >= 1 && value.length < 13) {
      error = "13글자를 입력해주세요";
      setValidationError((prevState) => ({ ...prevState, isbn: error }));
    } else {
      setValidationError((prevState) => ({ ...prevState, isbn: "" }));
    }
  };

  const validateDescription = (value: string) => {
    let error = "";
    if (value.length >= 1 && value.length <= 5) {
      error = "5글자 이상 입력하세요.";
      setValidationError((prevState) => ({ ...prevState, description: error }));
    } else {
      setValidationError((prevState) => ({ ...prevState, description: "" }));
    }
  };

  const submitCheck = () => {
    for (const key in account) {
      if (
        (key === "categoryId" ||
          key === "title" ||
          key === "author" ||
          key === "publisher" ||
          key === "isbn" ||
          key === "description" ||
          key === "publicationDate") &&
        (account[key] === "" || validationError[key] !== "")
      ) {
        return false;
      }
    }
    return true;
  };

  const createProductHandler = async () => {
    try {
      const result = await createProduct(account);

      if (result.status === 400) {
        throw new Error("create request failed");
      }

      toast.success("상품 추가가 완료되었습니다.");
      setPopup(!popup);
    } catch (error) {
      toast.error("Error 다시 시도해주세요.");
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="z-[999999999] postmodal fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      <div className="bg-white relative w-[650px] p-14 text-[13px]">
        <button
          className="absolute top-2 right-2 w-[30px] h-[30px] bg-black text-white rounded-full"
          onClick={() => {
            setPopup(!popup);
          }}
        >
          x
        </button>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">카테고리</span>
          <input
            type="number"
            name="categoryId"
            onChange={onChangeAccount}
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="카테고리 번호를 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">제목</span>
          <input
            name="title"
            onChange={(e) => {
              onChangeAccount(e);
              validateTitle(e.target.value);
            }}
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="도서 제목을 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">작가</span>
          <input
            name="author"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="작가를 입력해주세요."
            onChange={(e) => {
              onChangeAccount(e);
              validateAuthor(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">출판사</span>
          <input
            name="publisher"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="출판사를 입력해주세요."
            onChange={(e) => {
              onChangeAccount(e);
              validatePublisher(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">출판날짜</span>
          <input
            name="publicationDate"
            type="date"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="출판날짜를 입력해주세요."
            onChange={onChangeAccount}
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">isbn</span>
          <input
            name="isbn"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="ISBN을 입력해주세요."
            onChange={(e) => {
              onChangeAccount(e);
              validateISBN(e.target.value);
            }}
            maxLength={13}
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">설명</span>
          <textarea
            name="description"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded h-[120px]"
            placeholder="도서 설명을 입력해주세요."
            onChange={(e) => {
              onChangeAccount(e);
              validateDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">가격</span>
          <input
            name="price"
            type="number"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="0"
            onChange={onChangeAccount}
          />
        </div>
        <div>
          <span className="w-[20%] inline-block mb-4">베스트 셀러</span>
          <input
            id="isBestSeller"
            name="isBestSeller"
            onChange={onChangeAccount}
            type="checkbox"
            checked={account.isBestSeller}
          />
          <label htmlFor="isBestSeller"> BEST</label>
        </div>
        <div>
          {validationError.author}
          {validationError.description}
          {validationError.isbn}
          {validationError.publisher}
          {validationError.title}
        </div>
        <div className="mt-4">
          <button
            disabled={!submitCheck()}
            onClick={createProductHandler}
            className={`w-full py-2 font-medium ${
              submitCheck()
                ? "bg-point text-white  hover:-translate-y-1 transition-transform"
                : "bg-neutral-500 text-[#e8e8e8]"
            }`}
          >
            상품 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
