"use server";

import MedicinService from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

// ===========================
// Type Definitions
// ===========================

export interface Medicine {
  _id: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T | null;
}

export type CreateMedicinePayload = {
  name: string;
  price: number;
  description?: string;
  categoryId?: string;
};

// ===========================
// Get All Medicines Action
// ===========================
export async function getAllMedicinesAction(
  params?: GetMedicinesParams
): Promise<ApiResponse<Medicine[]>> {
  const { data, error } = await MedicinService.getAllMedicines(params) as {
    data: Medicine[] | null;
    error: string | null;
  };

  if (error) {
    return { success: false, message: error, data: null };
  }

  return { success: true, data };
}

// ===========================
// Create Medicine Action
// ===========================
export async function createMedicineAction(
  payload: CreateMedicinePayload
): Promise<ApiResponse<Medicine>> {
  // ১. সেশন থেকে টোকেন সংগ্রহ
  const sessionResponse = await userService.getSession();
  const token = sessionResponse?.data?.session?.token;

  if (!token) {
    return { success: false, message: "Token not found. Please login again.", data: null };
  }

  // ২. সার্ভিস কল
  const { data, error } = await MedicinService.createMedicine(payload) as {
    data: Medicine | null;
    error: string | null;
  };

  if (error) {
    return { success: false, message: error, data: null };
  }

  // ৩. Page revalidation
  revalidatePath("/seller-dashboard/products");

  return { success: true, data };
}
