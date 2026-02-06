import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

/* =====================
   Types
===================== */

export interface Category {
  id: string;
  name: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ServiceResult<T> {
  data: T | null;
  error: ApiError | null;
}

export interface CreateCategoryPayload {
  name: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

/* =====================
   Cookie Helper
===================== */


const getCookieHeader = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies(); // ✅ await added

    // Next.js compatible way
    const allCookies = cookieStore.getAll();

    return allCookies
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  } catch {
    return null;
  }
};

/* =====================
   Generic API Fetch
===================== */

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ServiceResult<T>> {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined");
    }

    // ✅ MUST await
    const cookieHeader = await getCookieHeader();

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    // ✅ Type-safe guard
    if (typeof cookieHeader === "string" && cookieHeader.length > 0) {
      headers.set("Cookie", cookieHeader);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers,
    });

    const result: unknown = await res.json();

    if (!res.ok) {
      const message =
        typeof result === "object" &&
        result !== null &&
        "message" in result
          ? String((result as { message?: string }).message)
          : res.statusText;

      return {
        data: null,
        error: { message, status: res.status },
      };
    }

    return {
      data: (result as { data?: T })?.data ?? (result as T),
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: {
        message:
          err instanceof Error ? err.message : "Something went wrong",
      },
    };
  }
}

/* =====================
   Category Service
===================== */

const categoryService = {
  // Public GET (SSR safe)
  getAllCategories: async (): Promise<ServiceResult<Category[]>> => {
    try {
      if (!API_URL) {
        throw new Error("API_URL is missing");
      }

      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      const result: { data?: Category[]; message?: string } =
        await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result.message ?? "Failed to load categories" },
        };
      }

      return {
        data: result.data ?? [],
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        error: {
          message:
            err instanceof Error
              ? err.message
              : "Something went wrong while fetching categories",
        },
      };
    }
  },

  // Authenticated GET
  getAllCategoriess: async (
    options?: ServiceOptions
  ): Promise<ServiceResult<Category[]>> => {
    return apiFetch<Category[]>("/categories", {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  // Create Category
  createCategory: async (
    payload: CreateCategoryPayload
  ): Promise<ServiceResult<Category>> => {
    return apiFetch<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export default categoryService;
