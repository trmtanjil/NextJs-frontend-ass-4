import { getAllMedicinesAction } from "@/action/medicine.actions";
import { Pill, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/medicine.type";

export default async function LetestProduct() {
  // ডাটা ফেচ করা
  const response = await getAllMedicinesAction();
  const medicines: Medicine[] = response.data || [];

  // ফ্রন্টেন্ড থেকে স্লাইস করে প্রথম ৪টি লেটেস্ট প্রোডাক্ট নেওয়া
  const latestMedicines = medicines.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        
        {/* হেডার সেকশন */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Latest <span className="text-amber-500">Arrivals</span>
            </h2>
            <p className="text-gray-500 mt-2">Discover our recently added medical supplies.</p>
          </div>
          <Link 
            href="/allproduct" 
            className="hidden sm:flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all underline-offset-4 hover:underline"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        {/* ৪টি কার্ডের গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestMedicines.length > 0 ? (
            latestMedicines.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* ইমেজ সেকশন - সরাসরি সার্ভার থেকে আসা URL */}
                <div className="h-44 w-full bg-slate-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative border border-gray-50">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Pill className="w-12 h-12 text-amber-200 opacity-50" />
                  )}

                  {/* স্টক স্ট্যাটাস ব্যাজ */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm ${
                      item.stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {item.stock > 0 ? `Stock: ${item.stock}` : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* প্রোডাক্ট ইনফো */}
                <div className="space-y-1 flex-grow">
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                    {item.category?.name || "Medicine"}
                  </p>
                  <h3 className="font-bold text-gray-800 truncate text-lg" title={item.name}>
                    {item.name}
                  </h3>
                  <div className="pt-2">
                    <span className="text-xl font-black text-gray-900">${item.price}</span>
                  </div>
                </div>

                {/* ডিটেইলস বাটন */}
                <div className="mt-5">
                  <Link href={`/allmadicin/${item.id}`} className="w-full">
                    <Button 
                      variant="outline" 
                      className="w-full border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl font-bold transition-all"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            /* যদি কোনো ডাটা না থাকে */
            <div className="col-span-full text-center py-10 text-gray-400">
              No latest products available right now.
            </div>
          )}
        </div>

        {/* মোবাইল ডিভাইসের জন্য নিচের বাটন */}
        <div className="mt-8 sm:hidden">
          <Link href="/allproduct">
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 rounded-xl font-bold">
              View All Medicines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}