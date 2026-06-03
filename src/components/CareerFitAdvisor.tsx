import React from 'react';
import { MatchResult } from '../lib/types';
import { cn } from '../lib/utils';
interface CareerFitAdvisorProps {
  matchResult: MatchResult;
  onViewDetails: () => void;
  onImproveCV: () => void;
  onApply: () => void;
  isApplied?: boolean;
}
export function CareerFitAdvisor({
  matchResult,
  onViewDetails,
  onImproveCV,
  onApply,
  isApplied
}: CareerFitAdvisorProps) {
  const scoreColor =
  matchResult.overallScore >= 80 ?
  '#16A34A' :
  matchResult.overallScore >= 60 ?
  '#EA580C' :
  '#DC2626';
  const badgeClass =
  matchResult.overallScore >= 80 ?
  'bg-green-100 text-green-700' :
  matchResult.overallScore >= 60 ?
  'bg-orange-100 text-orange-700' :
  'bg-red-100 text-red-700';
  return (
    <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">CareerFit Advisor</h2>
        <p className="text-sm text-gray-500">AI-powered CV match analysis</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36">
            
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3" />
            
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={scoreColor}
              strokeWidth="3"
              strokeDasharray={`${matchResult.overallScore}, 100`} />
            
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">
              {matchResult.overallScore}%
            </span>
          </div>
        </div>
        <div
          className={cn(
            'px-3 py-1 rounded-full text-sm font-bold mb-2',
            badgeClass
          )}>
          
          {matchResult.label}
        </div>
        <div className="text-sm font-medium text-gray-700">
          {matchResult.readiness}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {[
        {
          label: 'Skills Match',
          value: matchResult.breakdown.skills
        },
        {
          label: 'Experience Fit',
          value: matchResult.breakdown.experience
        },
        {
          label: 'Location Fit',
          value: matchResult.breakdown.location
        },
        {
          label: 'Salary Fit',
          value: matchResult.breakdown.salary
        }].
        map((item) =>
        <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
              className="h-full bg-purple-600 rounded-full"
              style={{
                width: `${item.value}%`
              }} />
            
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-200 mb-6 space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">
            Matched Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {matchResult.matchedSkills.map((skill) =>
            <span
              key={skill}
              className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-1 rounded">
              
                {skill}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">
            Missing Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {matchResult.missingSkills.map((skill) =>
            <span
              key={skill}
              className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-2 py-1 rounded">
              
                {skill}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={isApplied ? undefined : onApply}
          disabled={isApplied}
          className={cn(
            'w-full font-medium py-3 rounded-xl transition-colors',
            isApplied ?
            'bg-green-100 text-green-700 cursor-not-allowed' :
            'bg-purple-600 hover:bg-purple-700 text-white'
          )}>
          
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
        <button
          onClick={onImproveCV}
          className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
          
          Improve My CV
        </button>
        <button
          onClick={onViewDetails}
          className="w-full text-purple-600 font-medium py-2 hover:text-purple-700 transition-colors text-sm">
          
          View Full Analysis
        </button>
      </div>
    </div>);

}