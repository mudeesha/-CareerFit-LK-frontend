import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Job } from '../lib/types';
import { CompanyLogo } from './CompanyLogo';
import { MatchScoreBadge } from './MatchScoreBadge';
import { formatCurrency } from '../lib/utils';
interface JobListRowProps {
  job: Job;
}
export function JobListRow({ job }: JobListRowProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-[#F3F4F6] border border-gray-200 rounded-[18px] p-[22px] mb-4 hover:bg-[#ECEFF3] hover:border-gray-300 transition-all group relative">
      
      <button
        className="absolute top-[22px] right-[22px] text-gray-400 hover:text-purple-600 transition-colors z-10"
        onClick={(e) => {
          e.preventDefault();
          // Toggle save logic here
        }}>
        
        <Bookmark className="w-5 h-5" />
      </button>

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <CompanyLogo company={job.company} size="lg" className="shrink-0" />

        <div className="flex-1 min-w-0 pr-8 md:pr-0">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-purple-700 transition-colors truncate">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-3">
            <span className="font-medium text-gray-700">
              {job.company?.name}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                
              </svg>
              {job.location}
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
            <span className="hidden sm:inline">{job.workMode}</span>
            <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
            <span className="hidden sm:inline">{job.jobType}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-medium text-gray-900">
              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
            </div>
            <div className="hidden md:flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill) =>
              <span
                key={skill}
                className="bg-white text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">
                
                  {skill}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-2 shrink-0 md:w-32">
          <MatchScoreBadge score={job.matchScore} />
          <span className="text-xs text-gray-500">{job.postedDate}</span>
        </div>
      </div>
    </Link>);

}