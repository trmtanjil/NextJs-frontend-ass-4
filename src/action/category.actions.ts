"use server";

import categoryService from "@/services/category.service";

export async function getAllCategoriesAction() {
  return await categoryService.getAll();
}

export async function createCategoryAction(name: string) {
  if (!name?.trim()) {
    return {
      data: null,
      error: "Category name is required",
    };
  }

  return await categoryService.create(name.trim());
}
