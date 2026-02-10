"use client";

import { useState } from "react";
import { Medicine } from "@/types/medicine.type";
import MedicineEditModal from "./editmedicin";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
 
export default function MedicineTable({ medicines }: { medicines: Medicine[] }) {
  // এডিট করার জন্য স্টেট
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
const [deletingMedicine, setDeletingMedicine] = useState<Medicine | null>(null);

  return (
    <div className="overflow-x-auto border rounded-lg relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Stock</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {medicines.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{item.name}</td>
              <td className="px-6 py-4 text-gray-500">{item.category?.name || "—"}</td>
              <td className="px-6 py-4">${item.price}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.stock > 0 ? `${item.stock} In Stock` : "Out of Stock"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {/* এডিট বাটনে ক্লিক করলে স্টেট সেট হবে */}
                <button 
                  onClick={() => setSelectedMedicine(item)}
                  className="text-blue-600 mr-3 font-semibold hover:underline"
                >
                  Edit
                </button>
            <button 
                  onClick={() => setDeletingMedicine(item)} // এখানে ক্লিক করলে ডিলিট মডাল ওপেন হবে
                  className="text-red-600 font-semibold hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* যদি কোনো মেডিসিন সিলেক্ট করা থাকে তবে মডাল দেখাবে */}
      {selectedMedicine && (
        <MedicineEditModal 
          medicine={selectedMedicine} 
          onClose={() => setSelectedMedicine(null)} 
        />
      )}

      {deletingMedicine && (
        <DeleteConfirmationModal 
          medicineId={deletingMedicine.id} 
          medicineName={deletingMedicine.name} 
          onClose={() => setDeletingMedicine(null)} 
        />
      )}
    </div>
  );
}