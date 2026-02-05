// types/order.ts
export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  medicine: {
    name: string;
  };
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