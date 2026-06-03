import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../lib/types';
import { CompanyLogo } from './CompanyLogo';
interface CompanyCardProps {
  company: Company;
}
export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-[#F3F4F6] border border-gray-200 rounded-[16px] p-[22px] flex flex-col h-full hover:bg-[#ECEFF3] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <CompanyLogo company={company} size="lg" />
        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {company.openJobs} open jobs
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 text-lg mb-1">
        {company.name}
      </h3>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>{company.industry}</span>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <span>{company.location}</span>
      </div>

      <Link
        to={`/jobs?company=${encodeURIComponent(company.name)}`}
        className="mt-auto w-full bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-lg text-center hover:bg-gray-50 hover:text-purple-600 transition-colors text-sm">
        
        View Jobs
      </Link>
    </div>);

}