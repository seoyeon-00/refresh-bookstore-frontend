"use client";
import BookCatalogue from "@/components/Home/BookCatalogue";
import RefreshAnimation from "@/components/Home/RefreshAnimation";
import books from "../../public/mock-data/products.json";
import React, { useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState(["전체", "모바일 앱 개발"]);
  const [currentCategory, setCurrentCategory] = useState("전체");
  const categoryHandler = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="h-7 mb-2 px-4 text-md font-light text-white bg-point rounded-full flex flex-col hover:bg-dark_green justify-center items-center drop-shadow-lg cursor-pointer"
              onClick={() => categoryHandler(category)}
            >{`#${category}`}</div>
          ))}
        </div>
        <p className="w-full m-12 flex flex-col justify-center items-center font-md text-lg text-point">
          &apos;{currentCategory}&apos; 카테고리의 책입니다.
        </p>
        <div className="w-full h-auto flex flex-row flex-wrap justify-start gap-5 items-start">
          {books.map((book, index) => {
            if (
              currentCategory === "전체" ||
              book.category === currentCategory
            ) {
              return <BookCatalogue key={index} book={book} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
