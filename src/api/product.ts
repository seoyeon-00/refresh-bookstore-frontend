import { apiClient } from "./apiClient";

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