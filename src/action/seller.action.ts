"use server";

import { sellerService } from "@/services/seller.service";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@/types/order.type";

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus
) {
  const { data, error } = await sellerService.updateOrderStatus(orderId, status);

  if (error) {
    return { success: false, error };
  }

  revalidatePath("/seller-dashboard/orders");

  return { success: true, data };
}
