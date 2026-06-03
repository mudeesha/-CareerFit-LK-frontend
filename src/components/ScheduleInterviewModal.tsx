import React, { useState } from 'react';
import { X } from 'lucide-react';
interface ScheduleInterviewModalProps {
  candidateName: string;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
export function ScheduleInterviewModal({
  candidateName,
  jobTitle,
  isOpen,
  onClose,
  onSubmit
}: ScheduleInterviewModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('Online');
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time) {
      onSubmit();
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Schedule Interview
            </h2>
            <p className="text-sm text-gray-500">
              {candidateName} • {jobTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600">
            
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form
            id="schedule-form"
            onSubmit={handleSubmit}
            className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Time *
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Interview Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
                
                <option>Online</option>
                <option>On-site</option>
                <option>Phone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meeting Link / Location
              </label>
              <input
                type="text"
                placeholder={
                type === 'Online' ? 'e.g. Zoom link' : 'e.g. Office address'
                }
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes for Candidate
              </label>
              <textarea
                rows={3}
                placeholder="Any instructions for the interview..."
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors">
            
            Cancel
          </button>
          <button
            type="submit"
            form="schedule-form"
            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
            
            Schedule
          </button>
        </div>
      </div>
    </div>);

}