"use server";

import MedicinService from "@/services/medicine.service";
import { userService } from "@/services/user.service";

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

export async function getAllMedicinesAction(params?: GetMedicinesParams) {
  const { data, error } = await MedicinService.getAllMedicines(params, {
    cache: "no-store",
  });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

 

export async function createMedicineAction(payload: any) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { success: false, error: "Unauthorized" };

  const { data, error } = await  MedicinService.createMedicine(payload);
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

 

 