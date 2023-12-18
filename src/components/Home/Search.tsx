"use client";
import { getSeatchProduct } from "@/api/product";
import { productStore } from "@/stores";
import { bookDataType } from "@/types/bookDataType";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ProductItem from "../admin-page/ProductItem";
import SearchIcon from "../Common/Icons/SearchIcon";
import { ClipLoader } from "react-spinners";

const Search = () => {
  const [popup, setPopup] = useRecoilState(productStore.searchPopupState);
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<bookDataType[] | []>([]);

  const searchHandler = async () => {
    setIsLoading(true);
    try {
      const res = await getSeatchProduct(keyword);
      setSearchData(res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="z-[999999999] postmodal fixed bg-point overflow-hidden bg-opacity-40 top-0 left-0 h-[100%] w-[100%] flex justify-center backdrop-blur-md  backdrop-filter items-center">
      <p
        className="fixed top-0 right-0 m-4 text-large cursor-pointer text-white"
        onClick={() => setPopup(!popup)}
      >
        ╳
      </p>
      <div className="w-[80%] h-[500px] overflow-y-scroll bg-white p-10 rounded-md">
        <div className="relative">
          <input
            value={keyword}
            className="w-[100%] border-[1px] text-sm px-5 py-3 rounded-full border-point"
            placeholder="검색어를 입력해주세요"
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
          <button
            className="absolute right-[15px] top-[8px]"
            onClick={searchHandler}
          >
            {" "}
            <SearchIcon color="#16a263" width="30px" />
          </button>
        </div>

        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <ClipLoader color="#1DC078" size={30} />
            </div>
          ) : (
            <div>
              {searchData.length > 0 ? (
                <div className="text-center py-[30px]">
                  &ldquo;
                  <span className="text-point font-semibold">{keyword}</span>
                  &rdquo;에 대한 검색결과 입니다.
                </div>
              ) : null}
              {searchData.map((item, index) => (
                <div key={`item-${index}`}>
                  <ProductItem item={item} search={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
