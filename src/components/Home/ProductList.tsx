"use client";

import { bookDataType, paginationProduct } from "@/types/bookDataType";
import BookCatalogue from "./BookCatalogue";
import { useRecoilState } from "recoil";
import { categoryState } from "@/stores/category";
import { useEffect, useRef, useState } from "react";
import { getProduct, getProductByCategory } from "@/api/product";
import { ClipLoader } from "react-spinners";

type ProductListProps = {
  initialProduct: paginationProduct;
  category: [{ id: number; name: string }];
  curPage: number;
};

const ProductList = ({
  initialProduct,
  category,
  curPage,
}: ProductListProps) => {
  const [categories, setCategories] = useRecoilState(categoryState);
  const [productDataArray, setProductDataArray] = useState<bookDataType[]>(
    initialProduct.products
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMounted = useRef(false);
  const categoryIndex = categories!.categories.indexOf(
    categories.currentCategory
  );

  useEffect(() => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      allPage: initialProduct.pagination.totalPages,
    }));
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setIsLoading(true);
    } else {
      isMounted.current = true;
    }

    const fetchProductByCategory = async () => {
      try {
        const result =
          categoryIndex === 0
            ? await getProduct({ page: curPage, size: 10 })
            : await getProductByCategory({
                page: curPage,
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
  }, [curPage, categoryIndex]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center h-[300px] items-center">
          <ClipLoader color="#1DC078" size={50} />
        </div>
      ) : (
        <div>
          <div>
            <p className="w-full m-12 flex flex-col justify-center items-center font-md text-lg text-point">
              &apos;{categories.currentCategory}&apos; 카테고리의 책입니다.
            </p>
          </div>
          <div className="w-full h-auto flex flex-row flex-wrap justify-start gap-5 items-start">
            {productDataArray &&
              productDataArray.map((book, index) => (
                <div key={`bookItem-${index}`} className="animate-up">
                  <BookCatalogue
                    key={index}
                    book={book}
                    category={category[Number(book.categoryId) - 1].name}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
