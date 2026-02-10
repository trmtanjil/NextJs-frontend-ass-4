"use client";

import { useState } from "react";
import { Medicine } from "@/types/medicine.type";
import { updateMedicineAction } from "@/action/medicine.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function MedicineEditModal({
  medicine,
  onClose,
}: {
  medicine: Medicine;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: medicine.name,
    price: medicine.price,
    stock: medicine.stock,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await updateMedicineAction(medicine.id, formData);
    
    if (res.success) {
      toast.success("Medicine updated successfully!");
      onClose(); // মডাল বন্ধ হবে
    } else {
      toast.error(res.message || "Failed to update");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Medicine</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Medicine Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2 mt-1"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price ($)</label>
              <input
                type="number"
                required
                className="w-full border rounded-lg p-2 mt-1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Stock Quantity</label>
              <input
                type="number"
                required
                className="w-full border rounded-lg p-2 mt-1"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}