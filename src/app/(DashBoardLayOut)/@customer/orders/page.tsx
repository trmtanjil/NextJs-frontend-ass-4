"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";
import { Loader2, Package } from "lucide-react";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await orderService.getmyorder();
      if (error) {
        toast.error(error.message);
      } else if (data) {
         setOrders(data.data);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-20">
        <Package className="mx-auto w-16 h-16 text-gray-300" />
        <h2 className="text-xl font-semibold mt-4">No orders found!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Order History</h1>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono font-medium">#{order.id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3">
              {order.orderItems?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <p className="text-gray-700">{item.medicine?.name} <span className="text-gray-400">x {item.quantity}</span></p>
                  <p className="font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}