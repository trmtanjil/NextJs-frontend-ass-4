import { getAllMedicinesAction } from "@/action/medicine.actions";
import { Pill } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/medicine.type";

export default async function AllProduct() {
  // সার্ভার অ্যাকশন থেকে ডাটা ফেচ করা
  const response = await getAllMedicinesAction();
  const medicines: Medicine[] = response.data || [];

  return (
    <div className="container mx-auto p-6">
      {/* হেডার সেকশন */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold capitalize text-amber-500">
          Available <span className="text-black">Medicines</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Found <span className="font-bold text-black">{medicines.length}</span> items in our store.
        </p>
      </div>

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicines.length > 0 ? (
          medicines.map((med: Medicine) => (
            <div key={med.id} className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all bg-white group flex flex-col">
              
              {/* ইমেজ সেকশন - সরাসরি সার্ভার থেকে আসা URL ব্যবহার */}
              <div className="h-48 bg-gray-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-gray-100">
                 {med.image ? (
                   <img 
                    src={med.image} 
                    alt={med.name} 
                    className="object-contain w-full h-full p-2 group-hover:scale-110 transition-transform duration-300" 
                   />
                 ) : (
                   <div className="flex flex-col items-center text-gray-400">
                     <Pill size={40} className="mb-2 opacity-20" />
                     <span className="text-xs">No Image</span>
                   </div>
                 )}
                 
                 <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                   Stock: {med.stock}
                 </div>
              </div>

              {/* ইনফরমেশন সেকশন */}
              <div className="space-y-1 flex-grow">
                <h3 className="font-bold text-lg text-gray-800 truncate" title={med.name}>
                  {med.name}
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                   {med.category?.name || "General"}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-amber-600 font-black text-2xl">${med.price}</p>
                </div>
              </div>
              
              {/* শুধুমাত্র ভিউ ডিটেইলস বাটন */}
              <div className="mt-4">
                <Link href={`/allmadicin/${med.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl font-bold transition-colors">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="max-w-xs mx-auto">
              <Pill className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-xl font-semibold text-gray-600">No medicines found!</p>
              <p className="text-gray-400 text-sm mt-2">We couldnt find any products in the store right now.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}