import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Job } from '../lib/types';
import { CompanyLogo } from './CompanyLogo';
import { MatchScoreBadge } from './MatchScoreBadge';
import { formatCurrency } from '../lib/utils';
interface JobCardProps {
  job: Job;
}
export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-[#F3F4F6] border border-gray-200 rounded-[18px] p-[22px] hover:bg-[#ECEFF3] hover:border-gray-300 transition-all group relative">
      
      <button
        className="absolute top-[22px] right-[22px] text-gray-400 hover:text-purple-600 transition-colors z-10"
        onClick={(e) => {
          e.preventDefault();
          // Toggle save logic here
        }}>
        
        <Bookmark className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-4 mb-4">
        <CompanyLogo company={job.company} size="md" />
        <div className="pr-8">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-purple-700 transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm">{job.company?.name}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
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
            
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            
          </svg>
          {job.location}
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div>{job.workMode}</div>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div>{job.jobType}</div>
      </div>

      <div className="text-sm font-medium text-gray-900 mb-4">
        {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {job.skills.slice(0, 3).map((skill) =>
        <span
          key={skill}
          className="bg-white text-gray-600 text-xs px-2.5 py-1 rounded-md border border-gray-200">
          
            {skill}
          </span>
        )}
        {job.skills.length > 3 &&
        <span className="bg-white text-gray-500 text-xs px-2.5 py-1 rounded-md border border-gray-200">
            +{job.skills.length - 3}
          </span>
        }
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
        <span className="text-xs text-gray-500">{job.postedDate}</span>
        <MatchScoreBadge score={job.matchScore} />
      </div>
    </Link>);

}