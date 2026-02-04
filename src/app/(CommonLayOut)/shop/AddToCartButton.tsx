"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner"; // Sonner ইমপোর্ট করো
import { Medicine } from "@/types/medicine.type";

export default function AddToCartButton({ medicine }: { medicine: Medicine }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({
      medicineId: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: 1
    });
    // ক্লিক করার পর ইউজারকে এই মেসেজটি দেখাবে
    toast.success(`${medicine.name} added to cart!`);
  };

  return (
    <Button onClick={handleAdd} className="w-full md:w-max px-10 py-6 text-lg gap-3">
      <ShoppingCart className="w-5 h-5" /> Add to Cart
    </Button>
  );
 }