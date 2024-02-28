"use client";

import { paginationProduct } from "@/types/bookDataType";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { categoryState } from "@/stores/category";
import ProductList from "./ProductList";
import PaginationSlash from "../Common/PaginationSlash";

type ProductListProps = {
  initialProduct: paginationProduct;
  category: [{ id: number; name: string }];
};

const ProductContainer2 = ({ initialProduct, category }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(
    initialProduct.pagination.currentPage
  );
  const [productData, setProductData] = useState(initialProduct);
  const [totalPage, setTotalPage] = useState(productData.pagination.totalPages);
  const [categories, setCategories] = useRecoilState(categoryState);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 다른 카테고리 선택 시, 페이지 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [categories.currentCategory]);

  // 카테고리 변경 시, 전체 페이지 업데이트
  useEffect(() => {
    setTotalPage(categories.allPage);
  }, [categories.allPage]);

  return (
    <div>
      <ProductList
        initialProduct={initialProduct}
        category={category}
        curPage={currentPage}
      />
      <PaginationSlash
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductContainer2;
