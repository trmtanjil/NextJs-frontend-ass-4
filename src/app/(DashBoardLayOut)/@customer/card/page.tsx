"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react"; // লোডার যোগ করলাম
import { toast } from "sonner";
 import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { orderService } from "@/services/order.service";

export default function CartPage() {
  const { items, clearCart, removeItem } = useCartStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // অর্ডার দেওয়ার মেইন ফাংশন
const handleOrder = async () => {
  setLoading(true);
  
  const payload = {
    address: "Not provided", // TODO: Replace with real address or collect from user
    items: items.map(item => ({
      medicineId: item.medicineId,
      quantity: Number(item.quantity)
    }))
  };

  // সার্ভিস কল
  const { data, error } = await orderService.createOrder(payload);

  if (error) {
    // ব্যাকএন্ড থেকে আসা এরর মেসেজ দেখাবে (যেমন: "Unauthorized" বা "order create failed")
    toast.error(error.message);
  } else {
    toast.success("Order placed successfully!");
    clearCart();
    router.push("/shop");
  }
  setLoading(false);
};

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-20 text-center">
        <ShoppingBag className="mx-auto w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
        <Link href="/shop"><Button className="mt-4">Go to Shop</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-amber-500">Your Cart</h1>
      
      {/* ... আইটেম লিস্ট রেন্ডারিং (আগের মতোই থাকবে) ... */}
      <div className="grid gap-6 mb-10">
        {items.map((item) => (
           <div key={item.medicineId} className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm">
             <div className="flex-grow">
               <h3 className="font-bold">{item.name}</h3>
               <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
             </div>
             <Button variant="destructive" size="icon" onClick={() => removeItem(item.medicineId)}>
               <Trash2 className="w-4 h-4" />
             </Button>
           </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 rounded-2xl border">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium">Total Amount:</span>
          <span className="text-3xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={clearCart} disabled={loading} className="flex-1">
            Clear Cart
          </Button>
          
          {/* এই বাটনে ক্লিক করলেই এপিআই কল হবে */}
          <Button 
            onClick={handleOrder} 
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            
            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
            {loading ? "Ordering..." : "Confirm Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}