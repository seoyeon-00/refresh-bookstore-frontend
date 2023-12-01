import { atom, selector } from "recoil";
import { orderDataType } from "@/types/orderDataType";
import { getOrders } from "@/api/order";

export const orderDataState = atom({
  key: "orderDataState",
  default: {
    page: "0",
    size: "10",
  },
});

export const orderSelector = selector<orderDataType[] | null>({
  key: "orderSelector",
  get: async ({ get }) => {
    const orderData = get(orderDataState);
    const response = await getOrders({
      page: orderData.page,
      size: orderData.size,
    });
    return response.data;
  },
});
