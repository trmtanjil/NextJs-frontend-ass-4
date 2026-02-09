"use server";

import { cookies } from "next/headers";
import { orderService, CreateOrderPayload, OrderStatus, Order } from "@/services/order.service";
 
export interface ActionResponse<T> {
  success: boolean;
  data?: T | null;     // data থাকতে বা না থাকতে পারে
  error?: string;      // error message optional
}

// কুকি সংগ্রহের কমন ফাংশন
async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
}

export async function createOrderAction(payload: CreateOrderPayload) {
  const cookie = await getAuthCookie();
  const { data, error } = await orderService.createOrder(payload, cookie);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

 
export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  const cookie = await getAuthCookie();
  const { data, error } = await orderService.updateOrderStatus(orderId, status, cookie);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

 export async function getAllOrdersAction(): Promise<ActionResponse<Order[]>> {
  try {
    const cookie = await getAuthCookie();
    
    // সার্ভিস কল
    const { data, error } = await orderService.getAllOrders(cookie);

    if (error) {
      return { success: false, error: error.message };
    }

    // ডাটা স্ট্রাকচার অনুযায়ী ডাটা এক্সট্রাক্ট করা
    // data?.data কারণ আপনার ApiResponse এ data প্রপার্টি আছে
    const orders = data?.data || [];

    return { 
      success: true, 
      data: orders 
    };
  } catch (err) {
    return { success: false, error: "Failed to fetch orders" };
  }
}