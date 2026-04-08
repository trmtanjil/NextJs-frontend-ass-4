"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function MedicineFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL থেকে প্রাথমিক মানগুলো নেওয়া
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("price") || "");

  // useEffect ব্যবহার করে অটোমেটিক ফিল্টারিং লজিক
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (searchTerm) params.set("search", searchTerm);
      if (category) params.set("category", category);
      if (maxPrice) params.set("price", maxPrice);

      // URL আপডেট করা (এটি সার্ভার কম্পোনেন্টকে ট্রিগার করবে ডাটা নতুন করে ফিল্টার করতে)
      router.push(`/allproduct?${params.toString()}`, { scroll: false });
    }, 400); // ৪০০ মিলিসেকেন্ড ডিবউন্স (Debounce) টাইম যাতে প্রতি কি-স্ট্রোকে এপিআই কল না হয়

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, category, maxPrice, router]);

  const handleReset = () => {
    setSearchTerm("");
    setCategory("");
    setMaxPrice("");
    router.push("/allproduct");
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
      {/* Search Input */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-700 ml-1">Search Medicine</label>
        <div className="relative">
          <Search className="absolute left-4 top-3 text-green-600" size={20} />
          <input
            type="text"
            placeholder="Type name..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
        <select
          className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <div className="flex justify-between items-center ml-1">
          <label className="text-sm font-bold text-gray-700">Max Price</label>
          <span className="text-sm font-bold text-green-600">${maxPrice || '0'}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="10"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Reset Button */}
      <div className="flex items-center h-full">
        <button
          onClick={handleReset}
          className="w-full py-3 border-2 border-dashed border-gray-200 text-gray-400 font-bold rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all uppercase text-xs tracking-widest"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}