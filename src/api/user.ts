import { apiClient } from "./apiClient";

type updateType = {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  postalCode: string | undefined;
  address: string | undefined;
  detailAddress: string | undefined;
  birth: string | undefined;
  phone?: string | undefined;
};

type updateRoleType = {
  id: number;
  role: string;
};

export const updateUser = async (data: updateType) => {
  const response = await apiClient().put(`/api/user`, data);
  return response;
};

export const getAllUser = async () => {
  const response = await apiClient().get(`/api/user/admin`);
  return response;
};

export const updateUserRole = async (data: updateRoleType) => {
  const response = await apiClient().put(
    `/api/user/admin/role/${data.id}`,
    data
  );
  return response;
};

export const deleteUser = async (id: number) => {
  const response = await apiClient().delete(`/api/user/admin/${id}`);
  return response;
};
