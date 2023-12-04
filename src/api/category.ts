import { apiClient } from "./apiClient";
import { categoryDataType } from "@/types/categoryDataType";

type getCategoryType = {
  page: number;
  size: number;
};

export const getCategory = async ({ page, size }: getCategoryType) => {
  try {
    const response = await fetch(`/api/categories?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const categoryData = await response.json();
      return categoryData;
    } else {
    }
  } catch (error) {
    console.error("");
  }
};

export const createCategory = async (data: categoryDataType) => {
  const response = await apiClient().post(`/api/categories`, data);
  return response;
};

export const updateCategory = async (data: categoryDataType) => {
  const response = await apiClient().put(`/api/categories/${data.id}`, data);
  return response;
};

export const deleteCategory = async (id: number) => {
  const response = await apiClient().delete(`/api/categories/${id}`);
  return response;
};
