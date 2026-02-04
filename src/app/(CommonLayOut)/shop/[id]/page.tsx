import React from "react";
import MedicinService from "@/services/medicine.service"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ id: string }>; 
};

export default async function CategoryPage({ params }: PageProps) {
  // ১. ইউআরএল থেকে আসা ক্যাটাগরি আইডি (এটি সলিড স্ট্রিং)
  const { id: urlCategoryId } = await params;

  // ২. সব মেডিসিন ফেচ করা (অথবা ক্যাটাগরি ওয়াইজ)
  const { data: allMedicines, error } = await MedicinService.getCetegoryMedicines(urlCategoryId);

  if (error) {
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  }

  // ৩. ফিল্টার কন্ডিশন: মেডিসিনের ভেতর থাকা categoryId এবং ইউআরএল এর id ম্যাচ করানো
  // অনুযায়ী এখানে 'categoryId' ফিল্ডটি ব্যবহার করা হয়েছে
  const filteredMedicines = allMedicines?.filter(
    (med: any) => med.categoryId === urlCategoryId
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold capitalize text-amber-500">
          Selected Category ID: <span className="text-black">{urlCategoryId}</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Found {filteredMedicines?.length || 0} items matching this category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedicines && filteredMedicines.length > 0 ? (
          filteredMedicines.map((med: any) => (
            <div key={med.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
              <div className="h-40 bg-gray-50 rounded-md mb-4 flex items-center justify-center relative overflow-hidden">
                 {med.image ? (
                   <img src={med.image} alt={med.name} className="object-cover w-full h-full" />
                 ) : (
                   <span className="text-gray-400">No Image</span>
                 )}
                 {/* স্টক স্ট্যাটাস দেখার জন্য ছোট ব্যাজ */}
                 <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                   Stock: {med.stock}
                 </div>
              </div>

              <h3 className="font-bold text-lg truncate">{med.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Price Per Unit</p>
              <p className="text-primary font-bold text-2xl mb-4">${med.price}</p>
              
              <div className="flex gap-2">
                <Link href={`/allmadicin/${med.id}`} className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-xl text-gray-400">Oops! No medicines match this Category ID.</p>
            <Link href="/shop" className="text-primary underline mt-2 inline-block">
              Back to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}