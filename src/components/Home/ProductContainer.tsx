"use client";

import { useEffect, useState } from "react";
import NextIcon from "../Common/Icons/NextIcon";
import PrevIcon from "../Common/Icons/prevIcon";
import NoneItem from "../Common/NoneItem";
import { bookDataType } from "@/types/bookDataType";
import { getProduct, getProductByCategory } from "@/api/product";
import { useRecoilState } from "recoil";
import { categoryState } from "@/stores/category";
import BookCatalogue from "./BookCatalogue";
import { ClipLoader } from "react-spinners";
import ProductList from "./ProductList";

const ProductContainer = () => {
  const [productDataArray, setProductDataArray] = useState<bookDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [error, setError] = useState(null);

  const categoryIndex = categories!.categories.indexOf(
    categories.currentCategory
  );

  useEffect(() => {
    setIsLoading(true);
    getProduct({ page: 0, size: 10 })
      .then((result) => {
        const productDataArray = result.products;
        setProductDataArray(productDataArray);
        setCategories((prevCategories) => ({
          ...prevCategories,
          allPage: result.pagination.totalPages,
        }));
      })
      .catch((error) => {
        setError(error);
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

  useEffect(() => {
    if (categories.allPage !== null) {
      setCurrentPage(0);
    }
  }, [categories.allPage]);

  // 에러가 감지되면 ErrorBoundary fallbackUI 보여준다.
  if (error) {
    throw error;
  }

  return (
    <div>
      <ProductList />
    </div>
    // <div>
    //   <div>
    //     {isLoading && (
    //       <div className="flex justify-center h-[300px] items-center">
    //         <ClipLoader color="#1DC078" size={50} />
    //       </div>
    //     )}
    //   </div>
    //   <div className="w-full h-auto flex flex-row flex-wrap justify-start gap-5 items-start">
    //     {!isLoading &&
    //       (productDataArray.length > 0 ? (
    //         productDataArray.map((book, index) => {
    //           if (
    //             categories.currentCategory === "전체" ||
    //             categories.categories[Number(book.categoryId)] ===
    //               categories.currentCategory
    //           ) {
    //             return (
    //               <div key={`bookItem-${index}`} className="animate-up">
    //                 <BookCatalogue
    //                   key={index}
    //                   book={book}
    //                   category={categories.categories[Number(book.categoryId)]}
    //                 />
    //               </div>
    //             );
    //           }
    //           return null;
    //         })
    //       ) : (
    //         <NoneItem width={100}>상품이 없습니다.</NoneItem>
    //       ))}
    //   </div>
    //   <div className="flex w-[320px] justify-between mx-auto m-[30px]">
    //     <button
    //       onClick={() => {
    //         setCurrentPage(currentPage - 1);
    //       }}
    //       disabled={currentPage === 0}
    //       className="flex justify-center items-center rounded-full w-[40px] h-[40px] border-[1px] border-solid border-gray"
    //     >
    //       <PrevIcon width="8px" color="#777" />
    //     </button>
    //     <div className="flex gap-[2px]">
    //       <span className="font-medium">{currentPage + 1}</span>
    //       <span>/</span>
    //       <span className="text-neutral-400 font-medium">
    //         {categories.allPage}
    //       </span>
    //     </div>
    //     <button
    //       onClick={() => {
    //         setCurrentPage(currentPage + 1);
    //       }}
    //       disabled={currentPage === Number(categories.allPage) - 1}
    //       className="flex justify-center items-center rounded-full w-[40px] h-[40px] border-[1px] border-solid border-gray"
    //     >
    //       <NextIcon width="8px" color="#777" />
    //     </button>
    //   </div>
    // </div>
  );
};

export default ProductContainer;
