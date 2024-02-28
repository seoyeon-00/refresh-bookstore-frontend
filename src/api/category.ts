import { apiClient } from "./apiClient";
import { categoryDataType } from "@/types/categoryDataType";

type getCategoryType = {
  page: number;
  size: number;
};

export const getCategory = async ({ page, size }: getCategoryType) => {
  try {
    const response = await fetch(
      `https://port-0-refresh-bookstore-20zynm2mlk1daxmm.sel4.cloudtype.app/api/categories?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (response.ok) {
      const categoryData = await response.json();
      return categoryData;
    } else {
      // 서버 응답이 OK가 아닌 경우 에러 처리
      throw Error("Failed to fetch categories");
    }
  } catch (error: any) {
    throw error;
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
