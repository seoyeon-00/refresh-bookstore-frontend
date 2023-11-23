import { apiClient } from "./apiClient";

type orderType = {
  id?: number;
  userName: string;
  email: string | undefined;
  deliveryFee: number;
  shippingStatus: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  userPhone: string;
  orderRequest: string;
  orderNumber: string;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
  orderItems: {
    id?: number;
    isbn: string;
    amount: number;
    orderId?: number;
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
  const response = await apiClient().get(
    `/api/orders/orderNumber/${orderNumber}`
  );
  return response.data;
};

export const updateOrder = async (data: orderType) => {
  const response = await apiClient().put(`/api/orders/${data.id}`, data);
  return response;
};
