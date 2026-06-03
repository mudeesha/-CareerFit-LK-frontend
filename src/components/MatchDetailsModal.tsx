import React from 'react';
import { X } from 'lucide-react';
import { MatchResult } from '../lib/types';
import { cn } from '../lib/utils';
interface MatchDetailsModalProps {
  candidateName: string;
  jobTitle: string;
  matchResult: MatchResult;
  isOpen: boolean;
  onClose: () => void;
}
export function MatchDetailsModal({
  candidateName,
  jobTitle,
  matchResult,
  isOpen,
  onClose
}: MatchDetailsModalProps) {
  if (!isOpen) return null;
  const scoreColor =
  matchResult.overallScore >= 80 ?
  '#16A34A' :
  matchResult.overallScore >= 60 ?
  '#EA580C' :
  '#DC2626';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Match Analysis</h2>
            <p className="text-sm text-gray-500">
              {candidateName} for {jobTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600">
            
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 mb-6 flex items-center gap-8">
            <div className="relative w-24 h-24 shrink-0">
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
                <span className="text-2xl font-bold text-gray-900">
                  {matchResult.overallScore}%
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
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
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{
                      width: `${item.value}%`
                    }} />
                  
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-[20px] p-6">
              <h4 className="font-bold text-gray-900 mb-3">Matched Skills</h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchedSkills.map((skill) =>
                <span
                  key={skill}
                  className="bg-green-50 text-green-700 border border-green-200 text-xs px-2.5 py-1 rounded-md">
                  
                    {skill}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-[20px] p-6">
              <h4 className="font-bold text-gray-900 mb-3">Missing Skills</h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill) =>
                <span
                  key={skill}
                  className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-2.5 py-1 rounded-md">
                  
                    {skill}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6">
            <h4 className="font-bold text-gray-900 mb-4">AI Recommendation</h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              This candidate is a strong fit for the role due to their extensive
              experience with React and Node.js. However, they lack direct
              experience with TypeScript and AWS Lambda, which are preferred
              skills for this position.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h5 className="text-sm font-bold text-blue-900 mb-2">
                Suggested Interview Questions
              </h5>
              <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                <li>
                  "Can you explain a project where you used React and Node.js
                  together?"
                </li>
                <li>
                  "How comfortable are you with learning TypeScript on the job?"
                </li>
                <li>
                  "Have you worked with any serverless architecture similar to
                  AWS Lambda?"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>);

}