"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, clearCart,  } = useCartStore();
  

  // মোট দাম হিসেব করা
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-20 text-center">
        <ShoppingBag className="mx-auto w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
        <p className="text-gray-500 mb-6">Looks like you haveng added anything yet.</p>
        <Link href="/shop">
          <Button>Go to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length})</h1>

      <div className="grid gap-6">
        {items.map((item) => (
          <div key={item.medicineId} className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm">
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-primary font-semibold">${item.price} x {item.quantity}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* দামের টোটাল */}
              <div className="text-right mr-4">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <Button variant="destructive" size="icon" onClick={() => {/* এখানে রিমুভ লজিক দিতে পারো */}}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* সামারি এবং অর্ডার বাটন */}
      <div className="mt-10 p-6 bg-gray-50 rounded-2xl border">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium">Total Amount:</span>
          <span className="text-3xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={clearCart} className="flex-1">
            Clear Cart
          </Button>
          
          {/* এই বাটনটি তোমার অর্ডার এপিআই এর সাথে কানেক্ট হবে */}
          <Link href="/checkout" className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}