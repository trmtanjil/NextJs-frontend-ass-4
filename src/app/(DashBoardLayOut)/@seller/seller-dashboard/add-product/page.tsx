"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createMedicineAction } from "@/action/medicine.actions";

/*  
   Form Data Type (CLIENT)
 */
interface MedicineFormData {
  name: string;
  price: number;
  stock: number;
  expiryDate: string; // 👈 REQUIRED
  categoryId: string;
  description?: string;
  image?: string;
}

export default function SellerAdd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicineFormData>();

  const router = useRouter();

  /*  
     Submit Handler
  */
  const onSubmit: SubmitHandler<MedicineFormData> = async (data) => {
    const payload = {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
      expiryDate: new Date(data.expiryDate).toISOString(), // ✅ FIX
      categoryId: data.categoryId,
      description: data.description,
      image: data.image,
    };
    console.log(payload)

    const res = await createMedicineAction(payload);
console.log(res)
    if (res.success) {
      toast.success("Medicine added successfully!");
      reset();
      router.push("/seller-dashboard/products");
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl border shadow-sm text-black">
      <h1 className="text-2xl font-bold mb-6">Add New Medicine</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Medicine Name */}
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Medicine Name"
            className="w-full p-3 border rounded-xl"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            placeholder="Price"
            className="w-full p-3 border rounded-xl"
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <input
            type="number"
            {...register("stock", { required: "Stock is required" })}
            placeholder="Stock"
            className="w-full p-3 border rounded-xl"
          />
          {errors.stock && (
            <p className="text-red-500 text-xs">{errors.stock.message}</p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <input
            type="date"
            {...register("expiryDate", {
              required: "Expiry date is required",
            })}
            className="w-full p-3 border rounded-xl"
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-xs">
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        {/* Category ID */}
        <div>
          <input
            {...register("categoryId", { required: "Category is required" })}
            placeholder="Category ID"
            className="w-full p-3 border rounded-xl"
          />
          {errors.categoryId && (
            <p className="text-red-500 text-xs">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Image */}
        <input
          {...register("image")}
          placeholder="Image URL (optional)"
          className="w-full p-3 border rounded-xl"
        />

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description (optional)"
          rows={4}
          className="w-full p-3 border rounded-xl"
        />

        <Button disabled={isSubmitting} className="w-full py-6 text-lg">
          {isSubmitting ? "Adding..." : "Add Medicine"}
        </Button>
      </form>
    </div>
  );
}
