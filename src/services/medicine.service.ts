import { cookies } from "next/headers";
import { GetMedicinesParams } from "@/action/medicine.actions";
import { IMedicine } from "@/types/medicine.type";

const API_URL = process.env.API_URL;

/* =====================
   Common Types
===================== */

interface ApiError {
  message: string;
  status?: number;
}

interface ServiceResult<T> {
  data: T | null;
  error: ApiError | null;
}

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

    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ??
      cookieStore.get("token")?.value ??
      null;

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const result: unknown = await res.json();

    if (!res.ok) {
      const message =
        typeof result === "object" &&
        result !== null &&
        "message" in result
          ? String((result as { message?: string }).message)
          : "You are not authorized";

      return {
        data: null,
        error: { message, status: res.status },
      };
    }

    return {
      data: (result as { data?: T })?.data ?? (result as T),
      error: null,
    };
  } catch (err: unknown) {
    return {
      data: null,
      error: {
        message:
          err instanceof Error ? err.message : "Network error",
      },
    };
  }
}

/* =====================
   Helper: Query Builder
===================== */

function buildQuery(params?: GetMedicinesParams): string {
  if (!params) return "";

  const query = new URLSearchParams();

  (Object.entries(params) as [keyof GetMedicinesParams, string | number | undefined][])
    .forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(String(key), String(value));
      }
    });

  return query.toString();
}

/* =====================
   Medicine Service
===================== */

const MedicinService = {
  // ✅ Get All Medicines (Always returns array)
  getAllMedicines: async (
    params?: GetMedicinesParams
  ): Promise<ServiceResult<IMedicine[]>> => {
    const query = buildQuery(params);
    const endpoint = query ? `/medicines?${query}` : "/medicines";

    const { data, error } = await apiFetch<IMedicine[] | IMedicine>(endpoint);

    if (!data) {
      return { data: [], error };
    }

    return {
      data: Array.isArray(data) ? data : [data],
      error,
    };
  },

  // ✅ Get Single Medicine
  getMedicineById: async (
    id: string
  ): Promise<ServiceResult<IMedicine>> => {
    return apiFetch<IMedicine>(`/medicines/${id}`);
  },

  // ✅ Create Medicine
  createMedicine: async (
    payload: Partial<IMedicine>
  ): Promise<ServiceResult<IMedicine>> => {
    return apiFetch<IMedicine>("/seller/medicines", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export default MedicinService;
