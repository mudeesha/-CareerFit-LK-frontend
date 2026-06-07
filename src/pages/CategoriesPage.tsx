import React, { useEffect, useState } from "react";
import { CategoryCard } from "../components/CategoryCard";
import type { Category } from "../lib/types";
import { getCategories } from "../services/categoryApi";

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCategories();

        setCategories(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 pt-10 pb-8 px-6">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Job Categories
          </h1>

          <p className="text-gray-600">
            Find jobs by industry, skill area, and career path.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 pt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-44 bg-[#F3F4F6] border border-gray-200 rounded-[20px] animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}