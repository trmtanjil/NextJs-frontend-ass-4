// src/services/order.service.ts

import { OrderItem } from "@/types/order.type";

const API_URL = process.env.API_URL;

export interface ActionResponse<T> {
  success: boolean;
  data?: T | null;     // data থাকতে বা না থাকতে পারে
  error?: string;      // error message optional
}
export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}
export interface CreateOrderPayload {
  address: string;
  items: { medicineId: string; quantity: number }[];
}

export interface Order {
  id: string;
  totalAmount: number;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  orderItems?: OrderItem[];
  user?: { name: string; email: string }; // অ্যাডমিন ভিউর জন্য
}

export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  cookieHeader?: string // কুকি এখন প্যারামিটার হিসেবে আসবে
): Promise<{ data: T | null; error: { message: string } | null }> {
  try {
    if (!API_URL) throw new Error("API_URL is missing");

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    if (cookieHeader) headers.set("Cookie", cookieHeader);

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Request failed");

    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong" } };
  }
}

export const orderService = {
  createOrder: async (payload: CreateOrderPayload, cookie: string) => {
    return apiFetch("/order", {
      method: "POST",
      body: JSON.stringify(payload),
    }, cookie);
  },

  getMyOrders: async (cookie: string) => {
    return apiFetch("/order", { method: "GET" }, cookie); 
     
  },
  
 getAllOrders: async (cookie: string) => {
    // এখানে apiFetch<ApiResponse<Order[]>> নিশ্চিত করছে ডাটা একটি অর্ডার অ্যারে
    return apiFetch<ApiResponse<Order[]>>("/order", { method: "GET" }, cookie);
  },
  
  updateOrderStatus: async (orderId: string, status: OrderStatus, cookie: string) => {
    return apiFetch(`/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }, cookie);
  },
};