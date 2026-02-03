import categoryService from '@/services/category.service';
import { CategoryCard } from '../shop/CategoryCard';

export default async function Page() {
  const { data: categories, error } = await categoryService.getAllCategories();

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
        <p className="text-muted-foreground">Find the medicines you need by their categories.</p>
      </div>

      {/* গ্রিড লেআউট: মোবাইলে ২টা, ট্যাবে ৩টা, ডেস্কটপে ৪টা কার্ড */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <CategoryCard 
            key={category.id} 
            id={category.id} 
            name={category.name} 
          />
        ))}
      </div>

      {categories?.length === 0 && (
        <p className="text-center text-muted-foreground">No categories found.</p>
      )}
    </section>
  );
}