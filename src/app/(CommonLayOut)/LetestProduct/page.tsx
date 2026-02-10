import { getAllMedicinesAction } from "@/action/medicine.actions";
import { Pill, ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function LetestProduct() {
  // ডাটা ফেচ করা
  const response = await getAllMedicinesAction();
  const medicines = response.data || [];

  // ফ্রন্টেন্ড থেকে স্লাইস করে প্রথম ৪টি প্রোডাক্ট নেওয়া
  const latestMedicines = medicines.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* হেডার সেকশন */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Latest <span className="text-amber-500">Products</span>
            </h2>
            <p className="text-gray-500 mt-2">Check out our most recently added medicines.</p>
          </div>
          <Link 
            href="/allproduct" 
            className="hidden sm:flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        {/* রেসপন্সিভ কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestMedicines.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* ইমেজ বা আইকন প্লেসহোল্ডার */}
              <div className="h-40 w-full bg-amber-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative">
                <Pill className="w-12 h-12 text-amber-200 group-hover:rotate-12 transition-transform" />
                {item.stock < 5 && item.stock > 0 && (
                  <span className="absolute top-2 left-2 bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded">
                    Low Stock
                  </span>
                )}
              </div>

              {/* প্রোডাক্ট ইনফো */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                  {item.category?.name || "General"}
                </p>
                <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-black text-gray-900">${item.price}</span>
                  <button 
                    className="p-2 bg-gray-900 text-white rounded-lg hover:bg-amber-500 transition-colors shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* মোবাইল ডিভাইসের জন্য 'View All' বাটন নিচে */}
        <div className="mt-8 sm:hidden">
          <Link 
            href="/allmadicin" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700"
          >
            See More Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}