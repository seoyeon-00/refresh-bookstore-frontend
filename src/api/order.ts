import { apiClient } from "./apiClient";

type orderType = {
  id?: number | null;
  userName: string;
  email: string | null;
  deliveryFee: number | null;
  shippingStatus: string | null;
  postalCode: string | null;
  address: string | null;
  detailAddress: string | null;
  userPhone: string | null;
  orderRequest: string | null;
  orderNumber: string | null;
  totalPrice: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  orderItems:
    | {
        id?: number;
        isbn: string;
        amount: number;
        orderId?: number;
      }[]
    | null;
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
