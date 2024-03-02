import { getCategory } from "@/api/category";
import { createProduct, updateProduct } from "@/api/product";
import { productStore } from "@/stores";
import { bookDataType } from "@/types/bookDataType";
import { categoryDataType } from "@/types/categoryDataType";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

type ProductProps = {
  fetchProduct: () => void;
};

const Product = ({ fetchProduct }: ProductProps) => {
  const [popup, setPopup] = useRecoilState(productStore.productPopupState);
  const [categories, setCategories] = useState([]);
  const [account, setAccount] = useState({
    categoryId: popup.update ? popup.item.categoryId : "",
    title: popup.update ? popup.item.title : "",
    author: popup.update ? popup.item.author : "",
    publisher: popup.update ? popup.item.publisher : "",
    publicationDate: popup.update ? popup.item.publicationDate : "",
    isbn: popup.update ? popup.item.isbn : "",
    description: popup.update ? popup.item.description : "",
    price: popup.update ? popup.item.price : 0,
    imagePath: "",
    isBestSeller: popup.update ? popup.item.isBestSeller : false,
    ...(popup.update ? { originalISBN: popup.item.isbn } : {}),
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

  const getDefaultBookData = (): bookDataType => ({
    categoryId: 1,
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

  useEffect(() => {
    getCategory({ page: 1, size: 100 })
      .then((result) => {
        const categoryStateData = result.map((item: categoryDataType) => ({
          name: item.name,
          id: item.id,
        }));

        setCategories(categoryStateData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onChangeAccount = (e: React.ChangeEvent<any>) => {
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
      error = "13자 입력해주세요";
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

  const createProductHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await createProduct(account);

      if (result.status === 400) {
        throw new Error("create request failed");
      }

      toast.success("상품 추가가 완료되었습니다.");
      setPopup((prevPopupState) => ({
        ...prevPopupState,
        isOpen: !prevPopupState.isOpen,
        item: getDefaultBookData(),
      }));
      fetchProduct();
    } catch (error) {
      toast.error("Error 다시 시도해주세요.");
      console.error("Error fetching categories:", error);
    }
  };

  const updateProductHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await updateProduct(account);

      if (result.status === 400) {
        throw new Error("create request failed");
      }

      toast.success("상품 수정이 완료되었습니다.");
      setPopup((prevPopupState) => ({
        ...prevPopupState,
        isOpen: !prevPopupState.isOpen,
        item: getDefaultBookData(),
      }));
      fetchProduct();
    } catch (error) {
      toast.error("Error 다시 시도해주세요.");
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="z-[999999999] postmodal fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      <div className="bg-white relative w-[650px] p-14 text-[13px]">
        <button
          className="text-[18px] font-semibold absolute top-2 right-2 w-[30px] h-[30px] bg-black text-white rounded-full"
          onClick={() => {
            setPopup((prevPopupState) => ({
              ...prevPopupState,
              isOpen: !prevPopupState.isOpen,
              update: false,
              item: getDefaultBookData(),
            }));
          }}
        >
          x
        </button>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">카테고리</span>
          <select
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full appearance-none"
            name="categoryId"
            onChange={onChangeAccount}
            defaultValue=""
          >
            <option value="" selected>
              카테고리 선택
            </option>
            {categories.map((item: any, index) => (
              <option
                value={item.id}
                key={`item-${index}`}
                selected={
                  popup.update ? item.id === popup.item.categoryId : false
                }
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">제목</span>
          <div className="w-[80%] relative">
            <input
              name="title"
              onChange={(e) => {
                onChangeAccount(e);
                validateTitle(e.target.value);
              }}
              className="w-full bg-neutral-100 px-3 py-2 rounded-full"
              placeholder={
                popup.update ? popup.item.title : `도서 제목을 입력해주세요.`
              }
            />
            <div className="absolute right-4 top-[9px] text-xs text-neutral-500">
              {validationError.title}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">작가</span>
          <div className="w-[80%] relative">
            <input
              name="author"
              className="w-full bg-neutral-100 px-3 py-2 rounded-full"
              placeholder={
                popup.update ? popup.item.author : `작가를 입력해주세요.`
              }
              onChange={(e) => {
                onChangeAccount(e);
                validateAuthor(e.target.value);
              }}
            />
            <div className="absolute right-4 top-[9px] text-xs text-neutral-500">
              {validationError.author}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">출판사</span>
          <div className="w-[80%] relative">
            <input
              name="publisher"
              className="w-full bg-neutral-100 px-3 py-2 rounded-full"
              placeholder={
                popup.update ? popup.item.publisher : `출판사를 입력해주세요.`
              }
              onChange={(e) => {
                onChangeAccount(e);
                validatePublisher(e.target.value);
              }}
            />
            <div className="absolute right-4 top-[9px] text-xs text-neutral-500">
              {validationError.publisher}
            </div>
          </div>
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
          <div className="w-[80%] relative">
            <input
              name="isbn"
              className="w-full bg-neutral-100 px-3 py-2 rounded-full"
              placeholder={
                popup.update ? popup.item.isbn : `ISBN을 입력해주세요.`
              }
              onChange={(e) => {
                onChangeAccount(e);
                validateISBN(e.target.value);
              }}
              maxLength={13}
            />
            <div className="absolute right-4 top-[9px] text-xs text-neutral-500">
              {validationError.isbn}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">설명</span>
          <div className="w-[80%] relative">
            <textarea
              name="description"
              className="w-full bg-neutral-100 px-3 py-2 rounded h-[120px]"
              placeholder={
                popup.update
                  ? popup.item.description
                  : `도서 설명을 입력해주세요.`
              }
              onChange={(e) => {
                onChangeAccount(e);
                validateDescription(e.target.value);
              }}
            />
            <div className="absolute right-4 top-[9px] text-xs text-neutral-500">
              {validationError.description}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">가격</span>
          <input
            name="price"
            type="number"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder={popup.update ? String(popup.item.price) : "0"}
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
        <div className="mt-4">
          <button
            disabled={!submitCheck()}
            onClick={popup.update ? updateProductHandler : createProductHandler}
            className={`w-full py-2 font-medium ${
              submitCheck()
                ? "bg-point text-white  hover:-translate-y-1 transition-transform"
                : "bg-neutral-500 text-[#e8e8e8]"
            }`}
          >
            {popup.update ? "상품 수정" : "상품 등록"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
