import React from 'react';
import { mockCategories } from '../lib/mockData';
import { CategoryCard } from '../components/CategoryCard';
export function CategoriesPage() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCategories.map((category) =>
          <CategoryCard key={category.id} category={category} />
          )}
        </div>
      </div>
    </div>);

}