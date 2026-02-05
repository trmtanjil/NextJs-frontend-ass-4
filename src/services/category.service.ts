import { cookies } from "next/headers";
const API_URL = process.env.API_URL;

export interface Category {
  id: string;
  name: string;
}

export interface ServiceResult<T> {
  data: T | null;
  error: { message: string } | null;
}
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
// মনে রাখবে: Client side থেকে এক্সেস করতে .env ফাইলে NEXT_PUBLIC_API_URL থাকতে হবে


export interface CreateCategoryPayload {
  name: string;
}


const getCookieHeader = async () => {
  try {
    const cookieStore = await cookies();
    const cookieArray = cookieStore.getAll().map((c) => `${c.name}=${c.value}`);
    return cookieArray.join("; ");
  } catch (e) {
    return null;
  }
};

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{
  data: T | null;
  error: { message: string; status?: number } | null;
}> {
  try {
    const cookieHeader = await getCookieHeader();

    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
      headers: headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || res.statusText);
    }

    const data = await res.json();
    return { data: data ?? [], error: null };
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





const categoryService = {
  getAllCategories: async (): Promise<ServiceResult<Category[]>> => {
    try {
      // ১. API_URL চেক করা
      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is missing in .env file");
      }

      const url = `${API_URL}/categories`;

      // ২. Fetch কল করা
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // সবসময় লেটেস্ট ডাটা পাওয়ার জন্য
      });

      // ৩. রেসপন্স চেক করা
      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result?.message || "Failed to load categories" },
        };
      }

      // তোমার ব্যাকএন্ড যদি { data: [...] } ফরমেটে পাঠায়
      return {
        data: result.data || result, 
        error: null,
      };

    } catch (err) {
      console.error("Category Fetch Error:", err);
      return {
        data: null,
        error: { message:   "Something went wrong while fetching categories" },
      };
    }
  },




    getAllCategoriess: async (options?: ServiceOptions) => {
    return apiFetch<Category[]>("/categories", {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },


    createCategory: async (payload: CreateCategoryPayload) => {
    return apiFetch<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export default categoryService;