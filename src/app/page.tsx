"use client";

import React from "react";
import { getProduct, getProductByCategoryAll } from "@/api/product";
import Categories from "@/components/Home/Categories";
import { useRecoilState } from "recoil";
import { categoryState } from "@/stores/category";
import ProductContainer from "@/components/Home/ProductContainer";
import ErrorBoundary from "@/components/Common/ErrorBoundary";
import FallbackComponent from "@/components/Common/FallbackComponent";

export default function Home() {
  const [categories, setCategories] = useRecoilState(categoryState);

  const selectCategoryHandler = async (index: number, category: string) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      currentCategory: category,
    }));

    getProductByCategoryAll(index)
      .then((result) => {
        if (index === 0) {
          getProduct({ page: 0, size: 10 })
            .then((result) => {
              setCategories((prevCategories) => ({
                ...prevCategories,
                allPage: result.pagination.totalPages,
              }));
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          const totalPage: number = Math.ceil(result.length / 10);
          setCategories((prevCategories) => ({
            ...prevCategories,
            allPage: totalPage,
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-[5px]">
          <Categories selectCategoryHandler={selectCategoryHandler} />
        </div>
        <p className="w-full m-12 flex flex-col justify-center items-center font-md text-lg text-point">
          &apos;{categories.currentCategory}&apos; 카테고리의 책입니다.
        </p>
        <div className="w-full h-auto">
          <ErrorBoundary fallbackComponent={FallbackComponent}>
            <ProductContainer />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
