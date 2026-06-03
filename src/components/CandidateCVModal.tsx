import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Candidate } from '../lib/types';
interface CandidateCVModalProps {
  candidate: Candidate;
  isOpen: boolean;
  onClose: () => void;
}
export function CandidateCVModal({
  candidate,
  isOpen,
  onClose
}: CandidateCVModalProps) {
  if (!isOpen) return null;
  const handleDownload = () => {
    toast.success('CV download started.');
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            Candidate Profile & CV
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600">
            
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt={candidate.name}
                  className="w-full h-full object-cover" />
                
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {candidate.name}
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  {candidate.currentRole}
                </p>

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Location:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {candidate.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Experience:</span>{' '}
                    <span className="font-medium text-gray-900">
                      {candidate.experienceYears}+ years
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Expected Salary:</span>{' '}
                    <span className="font-medium text-gray-900">
                      LKR {candidate.expectedSalary.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>{' '}
                    <span className="font-medium text-purple-600">
                      {candidate.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-[20px] p-6">
              <h4 className="font-bold text-gray-900 mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) =>
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  
                    {skill}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-[20px] p-6">
              <h4 className="font-bold text-gray-900 mb-4">Languages</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">English</span>
                  <span className="font-medium text-gray-900">Fluent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sinhala</span>
                  <span className="font-medium text-gray-900">Native</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900">Original CV Document</h4>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            <div className="bg-gray-100 rounded-xl h-64 flex flex-col items-center justify-center border border-gray-200 text-gray-400">
              <FileText className="w-12 h-12 mb-2" />
              <p className="text-sm font-medium">CV Preview Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}