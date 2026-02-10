import { getAllMedicinesAction } from "@/action/medicine.actions";
import { ShoppingCart, Pill, DollarSign, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AllProduct() {
  // সার্ভার অ্যাকশন থেকে ডাটা ফেচ করা
  const response = await getAllMedicinesAction();
  const medicines = response.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Our Medicines
          </h1>
          <p className="text-gray-500 mt-1">Explore our wide range of quality medicines.</p>
        </div>
        
        {/* ফিল্টার বা সার্চ অপশন পরে এখানে যোগ করতে পারবেন */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-400">
            Total: {medicines.length} Items
          </span>
        </div>
      </div>

      {/* প্রোডাক্ট গ্রিড */}
      {medicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {medicines.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* ইমেজ সেকশন (যদি ইমেজ না থাকে তবে একটি প্লেসহোল্ডার দেখাবে) */}
              <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
                <Pill className="w-16 h-16 text-amber-200 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 right-3">
                   <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full shadow-sm ${
                     item.stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                   }`}>
                     {item.stock > 0 ? "In Stock" : "Out of Stock"}
                   </span>
                </div>
              </div>

              {/* ডিটেইলস সেকশন */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    {item.category?.name || "General"}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mt-1">
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">Price</span>
                    <span className="text-xl font-black text-gray-900">${item.price}</span>
                  </div>
                  
                  <div className="flex flex-col ml-auto">
                    <span className="text-xs text-gray-400 font-medium">Stock</span>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Package size={14} className="text-amber-500" />
                      <span className="text-sm font-bold">{item.stock}</span>
                    </div>
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                   <Link 
                     href={`/allmadicin/${item.id}`} 
                     className="flex items-center justify-center py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                   >
                     Details
                   </Link>
                   <button 
                     disabled={item.stock === 0}
                     className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                   >
                     <ShoppingCart size={16} />
                     Buy
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <Pill className="mx-auto text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-600">No Medicines Found!</h2>
          <p className="text-gray-400">Please check back later or refresh the page.</p>
        </div>
      )}
    </div>
  );
}