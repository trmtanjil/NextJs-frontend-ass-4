"use server";

import { userService, GetUsersParams } from "@/services/user.service";

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
