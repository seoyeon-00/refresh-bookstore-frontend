import { bookDataType } from "@/types/bookDataType";
import { apiClient } from "./apiClient";

type getProductType = {
  page: number;
  size: number;
  category?: number;
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
    console.error(error);
  }
};

export const getProductByCategory = async ({
  page,
  size,
  category,
}: getProductType) => {
  try {
    const response = await fetch(
      `/api/products/category?page=${page}&size=${size}&category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const productByCategoryData = await response.json();
      return productByCategoryData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductByCategoryAll = async (category: number) => {
  try {
    const response = await fetch(`/api/products/category/total/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const productByCategoryAllData = await response.json();
      return productByCategoryAllData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductByISBN = async ({ isbn }: { isbn: string }) => {
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    throw new Error("accessToken is null");
  }
  const item = JSON.parse(accessToken);

  try {
    const response = await fetch(`/api/products/isbn/${isbn}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${item.value}`,
      },
    });

    if (response.ok) {
      const productByISBNData = await response.json();
      return productByISBNData;
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (data: bookDataType) => {
  const response = await apiClient().post(`/api/products`, data);
  return response;
};

export const updateProduct = async (data: bookDataType) => {
  const updateData = {
    categoryId: data.categoryId,
    title: data.title,
    author: data.author,
    publisher: data.publisher,
    publicationDate: data.publicationDate,
    isbn: data.isbn,
    description: data.description,
    price: data.price,
    imagePath: data.imagePath,
    isBestSeller: data.isBestSeller,
  };
  const response = await apiClient().put(
    `/api/products/isbn/${data.originalISBN}`,
    updateData
  );
  return response;
};

export const deleteProduct = async (isbn: string) => {
  const response = await apiClient().delete(`/api/products/isbn/${isbn}`);
  return response;
};
