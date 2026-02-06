"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createMedicineAction, CreateMedicinePayload, ApiResponse, Medicine } from "@/action/medicine.actions";
import { Button } from "@/components/ui/button";

// ===========================
// Form Data Type
// ===========================
interface MedicineFormData extends CreateMedicinePayload {
  stock: number;
  image?: string;
}

export default function SellerAdd() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MedicineFormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<MedicineFormData> = async (data) => {
    // ডাটা ফরম্যাট ঠিক করা (প্রয়োজনে নাম্বার কনভার্ট করা)
    const payload: CreateMedicinePayload & { stock: number; image?: string } = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    const res: ApiResponse<Medicine> = await createMedicineAction(payload);

    if (res.success) {
      toast.success("Medicine added successfully!");
      reset();
      router.push("/seller-dashboard/products"); // অ্যাড হওয়ার পর লিস্টে নিয়ে যাবে
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl border shadow-sm text-black">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Medicine</h1>
        <p className="text-gray-500 text-sm">Fill in the details to list a new product in the shop.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Medicine Name</label>
          <input 
            {...register("name", { required: "Name is required" })}
            placeholder="e.g. Napa Extra"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Price ($)</label>
            <input 
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="0.00"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Stock Quantity</label>
            <input 
              type="number"
              {...register("stock", { required: "Stock is required" })}
              placeholder="100"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Category ID */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Category ID</label>
          <input 
            {...register("categoryId", { required: "Category ID is required" })}
            placeholder="Enter Category ID"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Image URL</label>
          <input 
            {...register("image")}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea 
            {...register("description")}
            rows={4}
            placeholder="Write details about the medicine..."
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? "Adding..." : "List Medicine"}
        </Button>
      </form>
    </div>
  );
}
