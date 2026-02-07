import React from "react";
import MedicinService from "@/services/medicine.service"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/medicine.type";

type PageProps = {
  params: Promise<{ id: string }>; 
};

export default async function CategoryPage({ params }: PageProps) {
  // ১. URL থেকে আইডি নেওয়া (Next.js 15 স্টাইল)
  const { id: urlCategoryId } = await params;
  
  // ২. সার্ভিস কল করা (Fix: Params হিসেবে অবজেক্ট পাঠানো হয়েছে)
  const { data: allMedicines, error } = await MedicinService.getAll({
    categoryId: urlCategoryId, // এটি এখন GetMedicinesParams টাইপ অনুযায়ী সঠিক
  });

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 bg-red-50 rounded-xl m-6">
        <p className="font-bold">Error Loading Medicines</p>
       </div>
    );
  }

  // ৩. ফিল্টার কন্ডিশন (Fix: টাইপ এরর এড়াতে as any ব্যবহার করা হয়েছে)
  // কারণ ব্যাকএন্ডে ডাটা categoryId অথবা category.id যেকোনো নামে থাকতে পারে
  const filteredMedicines = (allMedicines || []).filter(
    (med: Medicine) => 
      med.categoryId === urlCategoryId || 
      med.category?.id === urlCategoryId
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold capitalize text-amber-500">
          Selected Category ID: <span className="text-black">{urlCategoryId}</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Found <span className="font-bold text-black">{filteredMedicines.length}</span> items matching this category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((med: Medicine) => (
            <div key={med.id} className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all bg-white group">
              <div className="h-48 bg-gray-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-gray-100">
                 {med.image ? (
                   <img 
                    src={med.image} 
                    alt={med.name} 
                    className="object-contain w-full h-full p-2 group-hover:scale-110 transition-transform duration-300" 
                   />
                 ) : (
                   <span className="text-gray-400 text-sm">No Image Available</span>
                 )}
                 
                 <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                   Stock: {med.stock}
                 </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-lg text-gray-800 truncate">{med.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Price Per Unit</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-primary font-black text-2xl">${med.price}</p>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Link href={`/allmadicin/${med.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-bold">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="max-w-xs mx-auto">
              <p className="text-xl font-semibold text-gray-600">No medicines found!</p>
              <p className="text-gray-400 text-sm mt-2">We couldn`t find any products in this specific category.</p>
              <Link href="/shop">
                <Button className="mt-6 bg-primary hover:bg-primary/90">
                  Return to Shop
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}