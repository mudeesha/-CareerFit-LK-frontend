import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockCompanies } from '../lib/mockData';
import { CompanyCard } from '../components/CompanyCard';
export function CompaniesPage() {
  const [search, setSearch] = useState('');
  const filteredCompanies = mockCompanies.filter(
    (c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 pt-10 pb-8 px-6">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Top Hiring Companies
          </h1>
          <p className="text-gray-600 mb-8">
            Discover companies actively hiring across Sri Lanka.
          </p>

          <div className="bg-[#F3F4F6] p-2 rounded-[18px] border border-gray-200 max-w-xl flex">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies or industries..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
              
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCompanies.map((company) =>
          <CompanyCard key={company.id} company={company} />
          )}
        </div>
        {filteredCompanies.length === 0 &&
        <div className="text-center py-20 text-gray-500">
            No companies found matching your search.
          </div>
        }
      </div>
    </div>);

}