"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { createOrderAction } from "@/action/order.action";

export default function CartPage() {
  const { items, clearCart, removeItem } = useCartStore();
  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    setLoading(true);

    // স্টোর অনুযায়ী সঠিক পে-লোড ম্যাপ করা
    const payload = {
      address: "Your default address", 
      items: items.map((item) => ({
        medicineId: item.medicineId,
        quantity: item.quantity,
      })),
    };

    const res = await createOrderAction(payload);
    console.log(res)

    if (res.success) {
      toast.success("Order created successfully!");
      clearCart();
    } else {
      toast.error(res.error || "Failed to create order");
    }
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-20 text-center">
        <ShoppingBag className="mx-auto w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-amber-500">Your Cart</h1>
      
      <div className="grid gap-6 mb-10">
        {items.map((item) => (
          <div key={item.medicineId} className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm text-black">
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

      <div className="p-6 bg-gray-50 rounded-2xl border text-black">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium">Total:</span>
          <span className="text-3xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
        <Button 
          onClick={handleOrder} 
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
}