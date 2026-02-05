import categoryService from '@/services/category.service';
import { CategoryCard } from './CategoryCard';

export default async function CategoryList() {
  const { data: categories, error } = await categoryService.getAllCategories();

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 bg-red-50 rounded-2xl max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Unable to Load Categories</h3>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  return (
    <section className="py-16 container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
          <span className="mx-4 text-amber-600 font-medium">Categories</span>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Category</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of medicines organized by categories for easy navigation
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {categories?.map((category) => (
          <CategoryCard
            key={category.id} 
            id={category.id} 
            name={category.name} 
          />
        ))}
      </div>

      {/* Empty State */}
      {categories?.length === 0 && (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-6">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Categories Available</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Categories will appear here once they are added to the system.
          </p>
        </div>
      )}

      {/* Optional Decorative Elements */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>All categories are regularly updated</span>
          </div>
          <span className="hidden md:block">•</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Easy to navigate and find medicines</span>
          </div>
          <span className="hidden md:block">•</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <span>Verified and authentic categories</span>
          </div>
        </div>
      </div>
    </section>
  );
}