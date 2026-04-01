"use client";

import { useState } from "react";
 import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";
import { deleteMedicineAction } from "@/action/medicine.actions";

export default function DeleteConfirmationModal({
  medicineId,
  medicineName,
  onClose,
}: {
  medicineId: string;
  medicineName: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteMedicineAction(medicineId);
    console.log(res)
if (res.success) {
    // সফল হলে সবুজ টোস্ট দেখাবে
    toast.success(res.message || "Deleted successfully!"); 
    onClose();
  } else {
    // এরর হলে লাল টোস্ট দেখাবে (যেমন: অর্ডার করা থাকলে)
    toast.error(res.message || "Failed to delete"); 
  }
  setLoading(false);
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="text-red-600 w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Are you sure?</h2>
        <p className="text-gray-500 text-sm mt-2">
          Do you really want to delete <span className="font-bold text-gray-700">{medicineName}</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
          >
            No, Keep it
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}