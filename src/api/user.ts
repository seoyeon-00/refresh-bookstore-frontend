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

export const updateUser = async (data: updateType) => {
  const response = await apiClient().put(`/api/user`, data);
  return response;
};

export const getAllUser = async () => {
  const response = await apiClient().get(`/api/user/admin`);
  return response;
};
