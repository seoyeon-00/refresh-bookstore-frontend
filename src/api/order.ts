import { apiClient } from "./apiClient";

type orderType = {
  userName: string;
  email: string | undefined;
  deliveryFee: number;
  shippingStatus: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  userPhone: string;
  orderRequest: string;
  totalPrice: number;
  orderItems: {
    isbn: string;
    amount: number;
  }[];
};

export const orderCreate = async (data: orderType) => {
  const response = await apiClient().post(`/api/orders`, data);
  return response;
};

export const getOrderByUser = async (user: number) => {
  const response = await apiClient().get(`/api/orders/user/${user}`);
  return response;
};

export const getOrderByNumber = async (orderNumber: string | null) => {
  console.log(orderNumber);
  const response = await apiClient().get(
    `/api/orders/orderNumber/${orderNumber}`
  );
  return response.data;
};
