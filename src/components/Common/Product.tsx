import { productStore } from "@/stores";
import { useState } from "react";
import { useRecoilState } from "recoil";

const Product = () => {
  const [popup, setPopup] = useRecoilState(productStore.productPopupState);

  const [category, setCategory] = useState<number | null>(null);
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  console.log(uploadImgUrl);

  const imageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };

  return (
    <div className="z-[999999999] postmodal fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      <div className="bg-white relative w-[650px] p-14 text-sm">
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
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="카테고리 번호를 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">제목</span>
          <input
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="도서 제목을 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">작가</span>
          <input
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="작가를 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">출판사</span>
          <input
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="출판사를 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">출판날짜</span>
          <input
            type="date"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="출판날짜를 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">isbn</span>
          <input
            type="date"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="ISBN을 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">설명</span>
          <textarea
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded h-[120px]"
            placeholder="도서 설명을 입력해주세요."
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="w-[20%] inline-block">가격</span>
          <input
            type="number"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            placeholder="가격을 입력해주세요."
          />
        </div>
        <div>
          <span className="w-[20%] inline-block mb-4">이미지</span>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            className="w-[80%] bg-neutral-100 px-3 py-2 rounded-full"
            onChange={imageUpload}
          />
          {uploadImgUrl ? (
            <img className="w-[100px]" src={uploadImgUrl} />
          ) : null}

          <button>테스트 저장</button>
        </div>
        <div>
          <span className="w-[20%] inline-block mb-4">베스트셀러</span>
          <label>
            <input type="checkbox" />
            베스트
          </label>
        </div>
      </div>
    </div>
  );
};

export default Product;
