"use server";

import medicineService from "@/services/medicine.service";
import { revalidatePath } from "next/cache";
import { Medicine } from "@/types/medicine.type";
import { userService } from "@/services/user.service";

/*  
   Params Types
  */
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
  data?: T | null;
}

/* 
   Get All Medicines
 */
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

/*  
   Create Medicine
  */
export async function createMedicineAction(
  payload: Partial<Medicine>
): Promise<ActionResponse<Medicine>> {
  const { data, error } = await medicineService.create(payload);

  if (error) {
    return { success: false, message: error, data: null };
  }

  revalidatePath("/seller-dashboard/products");
  return { success: true, data };
}



export async function updateMedicineAction(
  id: string,
  payload: Partial<Medicine>
) {
  const { data, error } = await medicineService.update(id, payload);

  if (error) {
    return { success: false, message: error };
  }

  revalidatePath("/seller-dashboard/products");
  return { success: true, data };
}

export async function deleteMedicineAction(id: string): Promise<ActionResponse<Medicine>> {
  const { data, error } = await medicineService.delete(id);

  if (error) {
    return { success: false, message: error };
  }

  // ডিলিট হওয়ার পর পেজ রিভ্যালিডেট করবে যাতে টেবিল আপডেট হয়
  revalidatePath("/seller-dashboard/products");
  return { success: true, message: "Medicine deleted successfully" };
}