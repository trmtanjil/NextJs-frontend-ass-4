const API_URL = process.env.NEXT_PUBLIC_API_URL  

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
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Something went wrong",
        status: err.status,
      },
    };
  }
}

export const orderService = {
  createOrder: async (orderData: { items: { medicineId: string, quantity: number }[] }) => {
    return apiFetch("/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }
};