// components/seller/SellerOrderTable.tsx
"use client";

import { updateOrderStatusAction } from "@/action/seller.action";
import { IOrder, OrderStatus } from "@/types/order.type";
  import { toast } from "sonner";

export default function SellerOrderTable({ orders = [] }: { orders: IOrder[] }) {
  
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const res = await updateOrderStatusAction(id, newStatus as OrderStatus);
    console.log(res)
    if (res.success) {
      toast.success("Status updated successfully");
    } else {
      toast.error(res.error || "Update failed");
    }
  };

  return (
    <table className="min-w-full border-collapse text-black">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Order ID</th>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="text-center">
            <td className="p-2 border">{order.id.slice(-6)}</td>
            <td className="p-2 border">${order.totalAmount}</td>
            <td className="p-2 border">
              <span className="px-2 py-1 bg-blue-100 rounded text-xs">
                {order.status}
              </span>
            </td>
            <td className="p-2 border">
              <select 
                defaultValue={order.status}
                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                className="border p-1 rounded text-sm"
              >
                <option value="PROCESSING">PROCESSING</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}