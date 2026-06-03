import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Category } from '../lib/types';
interface CategoryCardProps {
  category: Category;
}
export function CategoryCard({ category }: CategoryCardProps) {
  // @ts-ignore
  const Icon = Icons[category.iconName] || Icons.Briefcase;
  return (
    <Link
      to={`/jobs?category=${encodeURIComponent(category.name)}`}
      className="bg-[#F3F4F6] border border-gray-200 rounded-[16px] p-5 flex items-center gap-4 hover:bg-[#ECEFF3] hover:border-purple-300 transition-all group">
      
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{category.jobCount} jobs</p>
      </div>
    </Link>);

}