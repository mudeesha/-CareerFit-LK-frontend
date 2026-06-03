import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  MoreVertical,
  Users,
  Copy,
  Edit,
  Trash2,
  XCircle } from
'lucide-react';
import { toast } from 'sonner';
import { mockJobs, mockCompanies } from '../../lib/mockData';
export function EmployerJobs() {
  const navigate = useNavigate();
  const company = mockCompanies[2];
  const [jobs, setJobs] = useState(
    mockJobs.filter((j) => j.companyId === company.id)
  );
  const handleDuplicate = (id: string) => {
    const jobToDuplicate = jobs.find((j) => j.id === id);
    if (jobToDuplicate) {
      const newJob = {
        ...jobToDuplicate,
        id: `j${Date.now()}`,
        title: `${jobToDuplicate.title} (Copy)`,
        status: 'DRAFT' as const
      };
      setJobs([newJob, ...jobs]);
      toast.success('Job duplicated as draft.');
    }
  };
  const handleClose = (id: string) => {
    if (
    window.confirm(
      'Are you sure you want to close this job? Candidates will no longer be able to apply.'
    ))
    {
      setJobs(
        jobs.map((j) =>
        j.id === id ?
        {
          ...j,
          status: 'CLOSED'
        } :
        j
        )
      );
      toast.success('Job closed successfully.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setJobs(
            jobs.map((j) =>
            j.id === id ?
            {
              ...j,
              status: 'ACTIVE'
            } :
            j
            )
          )
        }
      });
    }
  };
  const handleDeleteDraft = (id: string) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      setJobs(jobs.filter((j) => j.id !== id));
      toast.success('Draft deleted.');
    }
  };
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Jobs</h1>
          <p className="text-gray-600">Manage your company's job posts.</p>
        </div>
        <button
          onClick={() => navigate('/employer/jobs/new')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
          
          <PlusCircle className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
            
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
            <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Applicants</th>
                <th className="px-6 py-4 font-medium">Posted Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white/50">
              {jobs.map((job) =>
              <tr key={job.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500">
                      {job.location} • {job.workMode}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : job.status === 'DRAFT' ? 'bg-gray-200 text-gray-700' : job.status === 'CLOSED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    
                      {job.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {job.status === 'ACTIVE' ?
                  <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md font-medium">
                        {job.applicantCount}
                      </span> :

                  <span className="text-gray-400">-</span>
                  }
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {job.status === 'DRAFT' ? '-' : job.postedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {job.status === 'ACTIVE' &&
                    <button
                      onClick={() =>
                      navigate(`/employer/jobs/${job.id}/applicants`)
                      }
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-purple-50 transition-colors inline-flex items-center gap-1.5">
                      
                          <Users className="w-4 h-4" />
                          Applicants
                        </button>
                    }

                      <div className="relative group">
                        <button className="text-gray-500 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-10">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Edit className="w-4 h-4" /> Edit Job
                          </button>
                          <button
                          onClick={() => handleDuplicate(job.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          
                            <Copy className="w-4 h-4" /> Duplicate
                          </button>
                          {job.status === 'ACTIVE' &&
                        <button
                          onClick={() => handleClose(job.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          
                              <XCircle className="w-4 h-4" /> Close Job
                            </button>
                        }
                          {job.status === 'DRAFT' &&
                        <button
                          onClick={() => handleDeleteDraft(job.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          
                              <Trash2 className="w-4 h-4" /> Delete Draft
                            </button>
                        }
                        </div>
                      </div>
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