const API_URL = process.env.NEXT_PUBLIC_API_URL  




interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface GetAllOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";



async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{
  data: T | null;
  error: { message: string; status?: number } | null;
}> {
  try {
    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      // এটি ক্লায়েন্ট সাইড থেকে কুকি পাঠানোর জন্য যথেষ্ট
      credentials: "include", 
      ...options,
      headers,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || res.statusText);
    }

    return { data: result, error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    const statusValue = err instanceof Error && 'status' in err ? (err as Record<string, unknown>).status : undefined;
    const errorStatus = typeof statusValue === 'number' ? statusValue : undefined;
    return {
      data: null,
      error: {
        message: errorMessage,
        status: errorStatus,
      },
    };
  }
}

export interface CreateOrderPayload {
  address: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
}

export interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  medicine?: {
    name: string;
  };
}

export interface OrderResponse {
  data: (Order & { orderItems?: OrderItem[] })[];
}

export const orderService = {
  createOrder: async (orderData: CreateOrderPayload) => {
    return apiFetch<{ message: string }>("/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

getmyorder: async () => {
    return apiFetch<OrderResponse>("/order", { method: "GET" });
  },

getSingleOrder: async (id: string) => {
  return apiFetch<Order>(`/order/${id}`, {
    method: "GET",
  });
}


  
};