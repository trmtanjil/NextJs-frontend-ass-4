import { getAllMedicinesAction } from "@/action/medicine.actions";
import { Pill } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/medicine.type";
import MedicineFilter from "../MedicineFilter/MedicineFilter";
 
export default async function AllProduct({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; price?: string }>;
}) {
  const query = await searchParams;
  
  // ১. সব ডাটা ফেচ করা
  const response = await getAllMedicinesAction();
  let medicines: Medicine[] = response.data || [];

  // ইউনিক ক্যাটাগরি লিস্ট তৈরি করা (ফিল্টার ড্রপডাউনের জন্য)
  const categories = Array.from(
    new Set(medicines.map((m) => m.category?.name).filter(Boolean))
  ) as string[];

  // ২. ফিল্টারিং লজিক (Client থেকে আসা Query অনুযায়ী)
  if (query.search) {
    medicines = medicines.filter((m) =>
      m.name.toLowerCase().includes(query.search!.toLowerCase())
    );
  }

  if (query.category) {
    medicines = medicines.filter((m) => m.category?.name === query.category);
  }

  if (query.price) {
    medicines = medicines.filter((m) => m.price <= Number(query.price));
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50/50 min-h-screen">
      {/* হেডার */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Available <span className="text-green-600">Medicines</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Explore our wide range of authentic healthcare products.
        </p>
      </div>

      {/* ফিল্টার সেকশন */}
      <MedicineFilter categories={categories} />

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {medicines.length > 0 ? (
          medicines.map((med: Medicine) => (
            <div key={med.id} className="border-none rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all bg-white group flex flex-col relative">
              
              {/* স্টোক ব্যাজ */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${med.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {med.stock > 0 ? `In Stock: ${med.stock}` : 'Out of Stock'}
                </span>
              </div>

              {/* ইমেজ */}
              <div className="h-44 bg-gray-50 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden group-hover:bg-green-50/30 transition-colors">
                 {med.image ? (
                   <img 
                    src={med.image} 
                    alt={med.name} 
                    className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-500" 
                   />
                 ) : (
                   <Pill size={48} className="text-gray-200" />
                 )}
              </div>

              {/* ইনফরমেশন */}
              <div className="flex-grow space-y-2">
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
                  {med.category?.name || "General"}
                </p>
                <h3 className="font-bold text-xl text-gray-800 leading-tight truncate" title={med.name}>
                  {med.name}
                </h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-2xl font-black text-gray-900">${med.price}</span>
                   <span className="text-xs text-gray-400">/ per unit</span>
                </div>
              </div>
              
              {/* অ্যাকশন বাটন */}
              <div className="mt-6">
                <Link href={`/allmadicin/${med.id}`}>
                  <Button className="w-full bg-gray-900 hover:bg-green-600 text-white rounded-2xl py-6 font-bold transition-all shadow-lg hover:shadow-green-200">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
             <div className="max-w-xs mx-auto">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Pill className="text-gray-300" size={40} />
               </div>
               <h3 className="text-2xl font-bold text-gray-800">No results found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}