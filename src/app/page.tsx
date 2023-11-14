"use client";
import BookCatalogue from "@/components/Home/BookCatalogue";
import RefreshAnimation from "@/components/Home/RefreshAnimation";
import React, { useEffect, useState } from "react";
import { getProduct } from "@/api/product";
import { getCategory } from "@/api/category";
import { bookDataType } from "@/types/bookDataType";

export default function Home() {
  const [productDataArray, setProductDataArray] = useState<bookDataType[]>([]);
  const [categories, setCategories] = useState(["전체"]);
  const [currentCategory, setCurrentCategory] = useState("전체");
  const categoryHandler = (category: string) => {
    setCurrentCategory(category);
  };

  useEffect(() => {
    getProduct({ page: 1, size: 20 })
      .then((result) => {
        const productDataArray = result;
        //console.log(productDataArray);
        setProductDataArray(productDataArray);
      })
      .catch((error) => {
        console.error(error);
      });

    getCategory({ page: 1, size: 20 })
      .then((result) => {
        const categoryDataArray = result;
        const categoryStateData = categoryDataArray.map(
          (item: any) => item.name
        );

        if (!categoryStateData.includes("전체")) {
          categoryStateData.unshift("전체");
        }

        setCategories(categoryStateData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-[5px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="h-7 mb-1 px-3 text-sm font-medium text-white bg-point rounded-full flex flex-col hover:bg-dark_green justify-center items-center drop-shadow-lg cursor-pointer"
              onClick={() => categoryHandler(category)}
            >{`#${category}`}</div>
          ))}
        </div>
        <p className="w-full m-12 flex flex-col justify-center items-center font-md text-lg text-point">
          &apos;{currentCategory}&apos; 카테고리의 책입니다.
        </p>
        <div className="w-full h-auto flex flex-row flex-wrap justify-start gap-5 items-start">
          {productDataArray.map((book, index) => {
            if (
              currentCategory === "전체" ||
              book.categoryId === currentCategory
            ) {
              return (
                <BookCatalogue
                  key={index}
                  book={book}
                  category={categories[Number(book.categoryId)]}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
