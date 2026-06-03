import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { mockApplications } from '../../lib/mockData';
import { CompanyLogo } from '../../components/CompanyLogo';
export function CandidateApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const handleWithdraw = (id: string) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications((apps) =>
      apps.map((app) =>
      app.id === id ?
      {
        ...app,
        status: 'WITHDRAWN'
      } :
      app
      )
      );
      toast.success('Application withdrawn', {
        action: {
          label: 'Undo',
          onClick: () => setApplications(mockApplications)
        }
      });
    }
  };
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          My Applications
        </h1>
        <p className="text-gray-600">
          Track every job application in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Total</div>
          <div className="text-2xl font-bold text-gray-900">
            {applications.length}
          </div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Shortlisted</div>
          <div className="text-2xl font-bold text-green-600">
            {applications.filter((a) => a.status === 'SHORTLISTED').length}
          </div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Interviews</div>
          <div className="text-2xl font-bold text-blue-600">
            {
            applications.filter((a) => a.status === 'INTERVIEW_SCHEDULED').
            length
            }
          </div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-600">
            {applications.filter((a) => a.status === 'REJECTED').length}
          </div>
        </div>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
            
          </div>
          <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
            <option>All Statuses</option>
            <option>Shortlisted</option>
            <option>Interview Scheduled</option>
            <option>Applied</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job & Company</th>
                <th className="px-6 py-4 font-medium">Match Score</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Applied Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white/50">
              {applications.map((app) =>
              <tr key={app.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo company={app.job?.company} size="sm" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {app.job?.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {app.job?.company?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {app.matchScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${app.status === 'SHORTLISTED' ? 'bg-green-100 text-green-700' : app.status === 'INTERVIEW_SCHEDULED' ? 'bg-blue-100 text-blue-700' : app.status === 'WITHDRAWN' ? 'bg-gray-200 text-gray-700' : app.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{app.appliedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-purple-600 hover:text-purple-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-purple-50 transition-colors">
                        View Job
                      </button>
                      {app.status !== 'WITHDRAWN' &&
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      className="text-gray-500 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors"
                      title="Withdraw Application">
                      
                          <MoreVertical className="w-4 h-4" />
                        </button>
                    }
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}