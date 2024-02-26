"use client";

import { getProduct, getProductByCategoryAll } from "@/api/product";
import Categories from "@/components/Home/Categories";
import ProductList from "@/components/Home/ProductList";
import { categoryState } from "@/stores/category";
import { useRecoilState } from "recoil";

const Test = () => {
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
      <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-[5px]">
        <Categories selectCategoryHandler={selectCategoryHandler} />
      </div>
      <ProductList categories={categories.categories} />
    </div>
  );
};

export default Test;
