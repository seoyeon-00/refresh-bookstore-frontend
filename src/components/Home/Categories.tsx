"use client";

import { getCategory } from "@/api/category";
import { categoryState } from "@/stores/category";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type CategoriesProps = {
  selectCategoryHandler: (index: number, category: string) => void;
};

const Categories = ({ selectCategoryHandler }: CategoriesProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getCategory({ page: 0, size: 20 })
      .then((result) => {
        const categoryDataArray = result;
        const categoryStateData = categoryDataArray.map(
          (item: any) => item.name
        );
        if (!categoryStateData.includes("전체")) {
          categoryStateData.unshift("전체");
        }

        setCategories((prevCategories) => ({
          ...prevCategories,
          currentCategory: "전체",
          categories: categoryStateData,
        }));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return error;
  }

  return (
    <>
      {categories &&
        categories.categories.map((category: string, index: number) => (
          <div
            key={index}
            className="h-7 mb-1 px-3 text-sm font-medium text-white bg-point rounded-full flex flex-col hover:bg-dark_green justify-center items-center drop-shadow-lg cursor-pointer"
            onClick={() => {
              selectCategoryHandler(index, category);
            }}
          >{`#${category}`}</div>
        ))}
    </>
  );
};

export default Categories;
