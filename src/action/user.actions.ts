"use server";

import { userService, GetUsersParams } from "@/services/user.service";
import { revalidatePath } from "next/cache";
 
export async function getSessionAction() {
  const { data, error } = await userService.getSession();

  if (error) return { data: null, error };
  return { data, error: null };
}

export async function getAllUsersAction(params?: GetUsersParams) {
  const { data, error } = await userService.getAllUsers(params);

  if (error) return { data: null, error: (error as { message: string }).message || error };
  return { data, error: null };
}

export async function getUserByIdAction(userId: string) {
  const { data, error } = await userService.getUserById(userId);

  if (error) return { data: null, error: (error as { message: string }).message || error };
  return { data, error: null };
}


export async function adminUpdateUserStatusAction(
  userId: string,
  payload: { status: string },
) {
  // userService কল করার সময় সরাসরি payload অবজেক্টটি পাস করো
  const { data, error } = await userService.adminUpdateUserStatus(
    userId,
    payload
  );
 

  if (error) {
    return { 
      success: false, 
      error: typeof error === 'string' ? error : error.message || "Failed to update status" 
    };
  }

  // ডাটা আপডেট হওয়ার পর টেবিলটি রিফ্রেশ করার জন্য পাথটি রিভ্যালিডেট করো
  revalidatePath("/admin-dashboard/users"); // তোমার ইউজার লিস্ট পেজের সঠিক পাথটি দাও

  return { success: true, data };
}
