// মনে রাখবে: Client side থেকে এক্সেস করতে .env ফাইলে NEXT_PUBLIC_API_URL থাকতে হবে

import { cookies } from "next/headers";

const API_URL = process.env.API_URL  





export interface GetMedicinesParams {
  search?: string;
  categoryId?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const getCookieHeader = async () => {
  try {
    const cookieStore = await cookies();
    return cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  } catch {
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
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || res.statusText);
    }

    const data = await res.json();
    return { data, error: null };
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

function buildQuery(params?: Record<string, any>) {
  if (!params) return "";

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return query.toString() ? `?${query.toString()}` : "";
}

const MedicinService = {
  // category-wise medicines fetch
  getCetegoryMedicines: async (categoryId?: string) => {
    try {
      const API_URL = process.env.API_URL;

      if (!API_URL) {
        throw new Error("API URL is not defined");
      }

      const url = categoryId
        ? `${API_URL}/medicines?category=${categoryId}`
        : `${API_URL}/medicines`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: [],
          error: result?.message || "Failed to fetch medicines",
        };
      }

      return {
        data: result?.data ?? [],
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        error: "Something went wrong while fetching medicines",
      };
    }
  },


  getMedicineById: async (id: string) => {
    try {
      const API_URL = process.env.API_URL;
      const res = await fetch(`${API_URL}/medicines/${id}`, {
        cache: "no-store", //  update data 
      });
      const result = await res.json();
      return { data: result?.data || result, error: null };
    } catch (error) {
      return { data: null, error: "Failed to load medicine details" };
    }
  },



    getAllMedicines: async (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) => {
    const query = buildQuery(params);

    return apiFetch(`/medicines${query}`, {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },



    createMedicine: async (payload: any) => {
    return apiFetch("/medicines", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },


  
};




export default MedicinService;
