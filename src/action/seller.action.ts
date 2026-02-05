"use server";

import { sellerService } from "@/services/seller.service";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@/types/order.type";

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  try {
    const res = await sellerService.updateOrderStatus(orderId, status);
    if (res.success) {
      revalidatePath("/seller-dashboard/orders");
      return { success: true };
    }
    return { success: false, error: res.message };
  } catch (error) {
    return { success: false, error: "Server Error" };
  }
}