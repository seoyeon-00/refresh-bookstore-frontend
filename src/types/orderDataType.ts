export type orderDataType = {
  id: number;
  userName: string;
  email: string;
  userPhone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  orderRequest: string;
  deliveryFee: number;
  orderNumber: string;
  shippingStatus: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  orderItems: {
    id: number;
    amount: number;
    isbn: string;
    orderId: number;
  }[];
};
