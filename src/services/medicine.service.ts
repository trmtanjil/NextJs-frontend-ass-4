// src/services/medicine.service.ts
import { cookies } from "next/headers";
import { Medicine } from "@/types/medicine.type";
import { GetMedicinesParams } from "@/action/medicine.actions";

const API_URL = process.env.API_URL;

/* 
   Common Result Type
 */
export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

/*  
   Generic Fetch
  */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ServiceResult<T>> {
  try {
    if (!API_URL) throw new Error("API_URL is missing");

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");
      console.log("coodie store ",cookieStore)

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Cookie", cookieHeader); // 🔥 THIS IS KEY

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const result = await res.json();

    if (!res.ok) {
      return { data: null, error: result?.message ?? "Request failed" };
    }

    return { data: result.data ?? result, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

/* 
   Query Builder
  */
function buildQuery(params?: GetMedicinesParams) {
  if (!params) return "";

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

/*  
   Medicine Service
  */
 
 const medicineService = {
  getAll: async (params?: GetMedicinesParams) => {
    const query = buildQuery(params);
    const endpoint = query ? `/medicines?${query}` : "/medicines";
    return apiFetch<Medicine[]>(endpoint);
  },


    getById: async (id: string): Promise<ServiceResult<Medicine>> => {
    return apiFetch<Medicine>(`/medicines/${id}`);
  },

create: async (
  payload: Partial<Medicine>
): Promise<ServiceResult<Medicine>> => {
  return apiFetch<Medicine>("/seller/medicines", {
    method: "POST",
    body: JSON.stringify(payload),
  });
},

};

export default medicineService;


 