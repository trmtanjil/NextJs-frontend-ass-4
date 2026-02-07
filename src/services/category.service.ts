import { Category, ServiceResult } from "@/types/category.type";
import { cookies } from "next/headers";
 
const API_URL = process.env.API_URL;

/* =====================
   Cookie helper
===================== */
const getCookieHeader = async (): Promise<string> => {
  const store =await cookies();
  return store
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
};

/* =====================
   Generic fetch
===================== */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ServiceResult<T>> {
  try {
    if (!API_URL) throw new Error("API_URL missing");

    const cookieHeader = await getCookieHeader();

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        ...(options.headers || {}),
      },
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: result?.message ?? "Request failed",
      };
    }

    return {
      data: result.data ?? result,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

/* =====================
   Category service
===================== */
const categoryService = {
  getAll: async (): Promise<ServiceResult<Category[]>> => {
    return apiFetch<Category[]>("/categories", {
      method: "GET",
      cache: "no-store",
    });
  },

  create: async (name: string): Promise<ServiceResult<Category>> => {
    return apiFetch<Category>("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },
};

export default categoryService;
