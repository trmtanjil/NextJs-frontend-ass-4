// types/order.ts
export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  _id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
}

export interface IOrder {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[]; // backend theke jodi orderItems ashe tobe sheta map kore nite hobe
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: IOrder[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}