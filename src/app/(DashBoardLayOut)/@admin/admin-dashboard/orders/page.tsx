"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";
import { Eye, Loader2, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DetailsOrderPage from "./detalsOrder";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  medicine?: {
    name: string;
  };
}

interface OrderWithItems {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems?: OrderItem[];
}

export default  function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);


  // মডালের জন্য স্টেট
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("select",selectedOrder)
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

// সিঙ্গেল অর্ডার ফেচ করার ফাংশন
  const handleViewDetails = async (orderId: string) => {
    setIsModalOpen(true);
    setModalLoading(true);
    setSelectedOrder(null);
    
    try {
      const { data, error } = await orderService.getSingleOrder(orderId);
      
      if (error) {
        toast.error(error.message || "Could not fetch details");
      } else if (data) {
        setSelectedOrder(data as OrderWithItems);
      }
    } catch (err) {
      toast.error("An error occurred while fetching order details");
    } finally {
      setModalLoading(false);
    }
  };

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
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-black">#{order.id.slice(-8).toUpperCase()}</span></p>
                <p className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {order.status}
                </span>
                
                {/* ভিউ ডিটেইলস বাটন */}
                <Button className="text-black" variant="outline" size="sm" onClick={() => handleViewDetails(order.id)}>
                  <Eye className="w-4 h-4 mr-2 text-black" /> Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- সিঙ্গেল অর্ডার ডিটেইলস মডাল --- */}
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="max-w-md bg-white rounded-3xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-extrabold text-gray-900">Order Summary</DialogTitle>
    </DialogHeader>

    {modalLoading ? (
      <div className="flex flex-col justify-center items-center p-12 space-y-4">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
        <p className="text-sm text-gray-500 animate-pulse">Fetching details...</p>
      </div>
    ) : selectedOrder ? (
      <DetailsOrderPage order={selectedOrder} /> // এখানে আমাদের নতুন কম্পোনেন্টটি কল করলাম
    ) : (
      <div className="text-center p-10 text-gray-400">No data found</div>
    )}
  </DialogContent>
</Dialog>
    </div>
  );
}