"use server";

import medicineService from "@/services/medicine.service";
import { revalidatePath } from "next/cache";
import { Medicine } from "@/types/medicine.type";
import { userService } from "@/services/user.service";

/* =====================
   Params Types
===================== */
export interface GetMedicinesParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ActionResponse<T> {
  success: boolean;
  message?: string;
  data: T | null;
}

/* =====================
   Get All Medicines
===================== */
export async function getAllMedicinesAction(
  params?: GetMedicinesParams
): Promise<ActionResponse<Medicine[]>> {
  const { data, error } = await medicineService.getAll(params);

  if (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }

  return {
    success: true,
    data: data ?? [],
  };
}

/* =====================
   Create Medicine
===================== */
export async function createMedicineAction(
  payload: Partial<Medicine>
): Promise<ActionResponse<Medicine>> {
  // ✅ Auth only here
  const session = await userService.getSession();
  const token = session?.data?.session?.token;

  if (!token) {
    return {
      success: false,
      message: "Please login again",
      data: null,
    };
  }

  const { data, error } = await medicineService.create(payload, token);

  if (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }

  revalidatePath("/seller-dashboard/products");

  return {
    success: true,
    data,
  };
}
