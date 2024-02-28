"use client";

import { getCategory } from "@/api/category";
import { getProduct, getProductByCategoryAll } from "@/api/product";
import { categoryState } from "@/stores/category";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        throw Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
