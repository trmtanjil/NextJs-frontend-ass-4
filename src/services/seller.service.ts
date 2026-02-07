 import { OrderItem } from "@/types/order.type";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =====================
   Common Result Type
===================== */
export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

/* =====================
   Generic Fetch
===================== */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ServiceResult<T>> {
  try {
    if (!API_URL) throw new Error("API URL missing");

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: result?.message ?? "Request failed",
      };
    }

    return {
      data: result?.data ?? result,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

/* =====================
   Seller Service
===================== */
export const sellerService = {
  // GET seller orders
  getSellerOrders: async (): Promise<ServiceResult<OrderItem[]>> => {
    return apiFetch<OrderItem[]>("/seller/orders", {
      method: "GET",
    });
  },

  // UPDATE order status
  updateOrderStatus: async (
    orderId: string,
    status: string
  ): Promise<ServiceResult<OrderItem>> => {
    return apiFetch<OrderItem>(`/order/status/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
