import React, { useState } from 'react';
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  X,
  XSquare } from
'lucide-react';
import { toast } from 'sonner';
import { mockJobs } from '../../lib/mockData';
import { CompanyLogo } from '../../components/CompanyLogo';
import { formatCurrency } from '../../lib/utils';
export function AdminJobs() {
  const [jobs, setJobs] = useState(
    mockJobs.map((j, i) => ({
      ...j,
      status: i === 0 || i === 1 ? 'PENDING_APPROVAL' : j.status,
      isFeatured: i === 2
    }))
  );
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const handleApprove = (id: string) => {
    if (window.confirm('Approve this job post?')) {
      const prevStatus = jobs.find((j) => j.id === id)?.status;
      setJobs((allJobs) =>
      allJobs.map((j) =>
      j.id === id ?
      {
        ...j,
        status: 'ACTIVE'
      } :
      j
      )
      );
      toast.success('Approved successfully.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setJobs((allJobs) =>
          allJobs.map((j) =>
          j.id === id ?
          {
            ...j,
            status: prevStatus
          } :
          j
          )
          )
        }
      });
    }
  };
  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob && rejectReason) {
      const prevStatus = selectedJob.status;
      setJobs((allJobs) =>
      allJobs.map((j) =>
      j.id === selectedJob.id ?
      {
        ...j,
        status: 'REJECTED'
      } :
      j
      )
      );
      toast.success('Rejected successfully.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setJobs((allJobs) =>
          allJobs.map((j) =>
          j.id === selectedJob.id ?
          {
            ...j,
            status: prevStatus
          } :
          j
          )
          )
        }
      });
      setRejectModalOpen(false);
      setRejectReason('');
      setSelectedJob(null);
    }
  };
  const handleToggleFeatured = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    if (job) {
      const newFeatured = !job.isFeatured;
      setJobs((allJobs) =>
      allJobs.map((j) =>
      j.id === id ?
      {
        ...j,
        isFeatured: newFeatured
      } :
      j
      )
      );
      toast.success(
        newFeatured ? 'Job marked as featured.' : 'Job removed from featured.',
        {
          action: {
            label: 'Undo',
            onClick: () =>
            setJobs((allJobs) =>
            allJobs.map((j) =>
            j.id === id ?
            {
              ...j,
              isFeatured: !newFeatured
            } :
            j
            )
            )
          }
        }
      );
    }
  };
  const handleClose = (id: string) => {
    if (window.confirm('Force close this job?')) {
      const prevStatus = jobs.find((j) => j.id === id)?.status;
      setJobs((allJobs) =>
      allJobs.map((j) =>
      j.id === id ?
      {
        ...j,
        status: 'CLOSED'
      } :
      j
      )
      );
      toast.success('Job closed.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setJobs((allJobs) =>
          allJobs.map((j) =>
          j.id === id ?
          {
            ...j,
            status: prevStatus
          } :
          j
          )
          )
        }
      });
    }
  };
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Job Approvals</h1>
        <p className="text-gray-600">Review and manage job postings.</p>
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
              <option>Pending Approval</option>
              <option>Active</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title & Company</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Salary Range</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white/50">
              {jobs.map((job) =>
              <tr key={job.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo company={job.company} size="sm" />
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {job.title}
                          {job.isFeatured &&
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        }
                        </div>
                        <div className="text-xs text-gray-500">
                          {job.company?.name} • {job.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{job.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatCurrency(job.salaryMin)} -{' '}
                    {formatCurrency(job.salaryMax)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : job.status === 'PENDING_APPROVAL' ? 'bg-orange-100 text-orange-700' : job.status === 'CLOSED' ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'}`}>
                    
                      {job.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {job.status === 'PENDING_APPROVAL' &&
                    <>
                          <button
                        onClick={() => handleApprove(job.id)}
                        className="text-green-600 hover:bg-green-50 p-1.5 rounded transition-colors"
                        title="Approve">
                        
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                        onClick={() => {
                          setSelectedJob(job);
                          setRejectModalOpen(true);
                        }}
                        className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Reject">
                        
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                    }

                      <div className="relative group">
                        <button className="text-gray-500 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-10">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Eye className="w-4 h-4" /> View Job
                          </button>
                          {job.status === 'ACTIVE' &&
                        <>
                              <button
                            onClick={() => handleToggleFeatured(job.id)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            
                                <Star className="w-4 h-4" />{' '}
                                {job.isFeatured ?
                            'Remove Featured' :
                            'Mark Featured'}
                              </button>
                              <button
                            onClick={() => handleClose(job.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            
                                <XSquare className="w-4 h-4" /> Force Close
                              </button>
                            </>
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

      {/* Reject Modal */}
      {rejectModalOpen && selectedJob &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setRejectModalOpen(false)} />
        
          <div className="relative w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Reject Job Post
              </h2>
              <button
              onClick={() => setRejectModalOpen(false)}
              className="text-gray-400 hover:text-gray-600">
              
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                You are rejecting{' '}
                <span className="font-bold text-gray-900">
                  {selectedJob.title}
                </span>{' '}
                by{' '}
                <span className="font-bold text-gray-900">
                  {selectedJob.company?.name}
                </span>
                .
              </p>
              <form id="reject-job-form" onSubmit={handleRejectSubmit}>
                <textarea
                required
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection (sent to employer)..."
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
              
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
              type="button"
              onClick={() => setRejectModalOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors">
              
                Cancel
              </button>
              <button
              type="submit"
              form="reject-job-form"
              className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors">
              
                Reject Job
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}