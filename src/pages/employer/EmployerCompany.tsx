import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { mockCompanies } from '../../lib/mockData';
import { CompanyLogo } from '../../components/CompanyLogo';
export function EmployerCompany() {
  const company = mockCompanies[2]; // Colombo Tech Solutions
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Company profile updated successfully.');
  };
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Company Profile
        </h1>
        <p className="text-gray-600">
          Manage how your company appears to candidates.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Company Logo</h3>
          <div className="flex items-center gap-6">
            <CompanyLogo
              company={company}
              size="lg"
              className="w-24 h-24 text-3xl" />
            
            <div>
              <button
                type="button"
                className="bg-white border border-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 mb-2 text-sm">
                
                <UploadCloud className="w-4 h-4" />
                Upload New Logo
              </button>
              <p className="text-xs text-gray-500">
                Recommended size: 400x400px. Max 2MB.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                defaultValue={company.name}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <input
                type="text"
                defaultValue={company.industry}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option selected>201-500</option>
                <option>500+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (Headquarters)
              </label>
              <input
                type="text"
                defaultValue={company.location}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                defaultValue="https://colombotech.lk"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                rows={4}
                defaultValue="Colombo Tech Solutions is a leading software development company specializing in building scalable web and mobile applications for global clients."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                defaultValue="Sarah Fernando"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="hr@colombotech.lk"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+94 11 234 5678"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                defaultValue="https://linkedin.com/company/colombotech"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
            
            Preview Public Profile
          </button>
          <button
            type="submit"
            className="px-8 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
            
            Save Changes
          </button>
        </div>
      </form>
    </div>);

}