"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, User, ShoppingBasket } from "lucide-react";
import { getAllOrdersAction } from "@/action/order.action";
import { Order } from "@/services/order.service";
 
export interface ActionResponse<T> {
  success: boolean;
  data?: T | null;     // data থাকতে বা না থাকতে পারে
  error?: string;      // error message optional
}
export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const res: ActionResponse<Order[]> = await getAllOrdersAction();

      if (res.success && res.data) {
        setOrders(res.data);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Something went wrong");
      }

      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-amber-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-8 text-amber-600 flex items-center gap-2">
        <ShoppingBasket /> All Orders
      </h1>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600 text-sm uppercase">
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-xs text-gray-500">
                  #{order.id.slice(-6).toUpperCase()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.user?.name || "Guest User"}</p>
                      <p className="text-[10px] text-gray-400">{order.user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 font-bold text-amber-600">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    order.status === "DELIVERED" 
                      ? "bg-green-100 text-green-700" 
                      : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-10 text-center text-gray-400">No orders found.</div>
        )}
      </div>
    </div>
  );
}
