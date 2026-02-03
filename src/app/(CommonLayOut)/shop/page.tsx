import categoryService from "@/services/category.service";
import MedicinService from "@/services/medicine.service";
import { CategoryCard } from "./CategoryCard";
import type { Medicine } from "@/types/medicine.type";
import { MedicineCard } from "./MedicineCard";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;

  const [catRes, medRes] = await Promise.all([
    categoryService.getAllCategories(),
    MedicinService.getAllMedicines(selectedCategory),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Categories Section */}
      <section className="w-full ">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex bg-amber-700 gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {catRes.data?.map((cat) => (
            <CategoryCard key={cat.id} id={cat.id} name={cat.name} />
          ))}
        </div>
      </section>

      {/* Medicines Grid Section */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory ? "Filtered Medicines" : "All Medicines"}
        </h2>

        {/* FIXED: Grid container with proper width and responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {medRes.data?.map((med: Medicine) => (
            <MedicineCard key={med.id} medicine={med} />
          ))}
        </div>

        {/* Empty state */}
        {medRes.data?.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No medicines found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}