import { apiClient } from "./apiClient";
import { bookDataType } from "@/types/bookDataType";

type getProductType = {
  page: number;
  size: number;
};

export const getProduct = async ({ page, size }: getProductType) => {
  try {
    const response = await fetch(`/api/products?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const productData = await response.json();
      return productData;
    } else {
    }
  } catch (error) {
    console.error("");
  }
};
