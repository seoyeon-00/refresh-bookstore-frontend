"use client";
import BookCatalogue from "@/components/Home/BookCatalogue";
import RefreshAnimation from "@/components/Home/RefreshAnimation";
import React, { useEffect, useState } from "react";
import {
  getProduct,
  getProductByCategory,
  getProductByCategoryAll,
} from "@/api/product";
import { getCategory } from "@/api/category";
import { bookDataType } from "@/types/bookDataType";
import ClipLoader from "react-spinners/ClipLoader";
import NextIcon from "@/components/Common/Icons/NextIcon";
import PrevIcon from "@/components/Common/Icons/prevIcon";
import NoneItem from "@/components/Common/NoneItem";

export default function Home() {
  const [productDataArray, setProductDataArray] = useState<bookDataType[]>([]);
  const [categories, setCategories] = useState(["전체"]);
  const [currentCategory, setCurrentCategory] = useState("전체");
  const [categoryLength, setCategoryLength] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const categoryHandler = (category: string) => {
    setCurrentCategory(category);
  };

  const categoryIndex = categories.indexOf(currentCategory);

  useEffect(() => {
    setIsLoading(true);

    getProduct({ page: 0, size: 10 })
      .then((result) => {
        const productDataArray = result.products;
        setProductDataArray(productDataArray);
        setCategoryLength(result.pagination.totalPages);

        return getCategory({ page: 0, size: 20 });
      })
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchProductByCategory = async () => {
      try {
        const result =
          categoryIndex === 0
            ? await getProduct({ page: currentPage, size: 10 })
            : await getProductByCategory({
                page: currentPage,
                size: 10,
                category: categoryIndex,
              });

        if (categoryIndex === 0) {
          const productDataArray = result.products;
          setProductDataArray(productDataArray);
        } else {
          const productDataArray = result;
          setProductDataArray(productDataArray);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductByCategory();
  }, [currentPage, categoryIndex]);

  const selectCategoryHandler = (index: number) => {
    setIsLoading(true);

    const getProductDataByCategory = async () => {
      try {
        const result =
          index === 0
            ? await getProduct({ page: 0, size: 10 })
            : await getProductByCategory({
                page: 0,
                size: 10,
                category: index,
              });

        if (index === 0) {
          const productDataArray = result.products;
          setProductDataArray(productDataArray);
          setCategoryLength(result.pagination.totalPages);
        } else {
          const productDataArray = result;
          setProductDataArray(productDataArray);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProductByCategoryAll(index)
      .then((result) => {
        const productCategoryAllDataArray = result;
        const totalPage: number = Math.ceil(
          productCategoryAllDataArray.length / 10
        );
        setCategoryLength(totalPage);
      })
      .catch((error) => {
        console.error(error);
      });

    getProductDataByCategory();
  };

  useEffect(() => {
    if (categoryLength !== null) {
      setCurrentPage(0);
    }
  }, [categoryLength]);

  return (
    <div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full p-4 border-b border-light_green flex flex-row justify-start flex-wrap my-5 gap-[5px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="h-7 mb-1 px-3 text-sm font-medium text-white bg-point rounded-full flex flex-col hover:bg-dark_green justify-center items-center drop-shadow-lg cursor-pointer"
              onClick={() => {
                categoryHandler(category);
                selectCategoryHandler(index);
              }}
            >{`#${category}`}</div>
          ))}
        </div>
        <p className="w-full m-12 flex flex-col justify-center items-center font-md text-lg text-point">
          &apos;{currentCategory}&apos; 카테고리의 책입니다.
        </p>
        <div className="w-full h-auto">
          {/* 로딩 중일 때 로딩 UI 표시 */}
          <div>
            {isLoading && (
              <div className="flex justify-center h-[300px] items-center">
                <ClipLoader color="#1DC078" size={50} />
              </div>
            )}
          </div>
          <div className="w-full h-auto flex flex-row flex-wrap justify-start gap-5 items-start">
            {!isLoading &&
              (productDataArray.length > 0 ? (
                productDataArray.map((book, index) => {
                  if (
                    currentCategory === "전체" ||
                    categories[Number(book.categoryId)] === currentCategory
                  ) {
                    return (
                      <div key={`bookItem-${index}`}>
                        <BookCatalogue
                          key={index}
                          book={book}
                          category={categories[Number(book.categoryId)]}
                        />
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <NoneItem width={100}>상품이 없습니다.</NoneItem>
              ))}
          </div>
          <div className="flex w-[320px] justify-between mx-auto m-[30px]">
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage === 0}
              className="flex justify-center items-center rounded-full w-[40px] h-[40px] border-[1px] border-solid border-gray"
            >
              <PrevIcon width="8px" color="#777" />
            </button>
            <div className="flex gap-[2px]">
              <span className="font-medium">{currentPage + 1}</span>
              <span>/</span>
              <span className="text-neutral-400 font-medium">
                {categoryLength}
              </span>
            </div>
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === Number(categoryLength) - 1}
              className="flex justify-center items-center rounded-full w-[40px] h-[40px] border-[1px] border-solid border-gray"
            >
              <NextIcon width="8px" color="#777" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
