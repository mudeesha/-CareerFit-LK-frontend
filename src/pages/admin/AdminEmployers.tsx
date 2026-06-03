import React, { useState } from 'react';
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Ban,
  Eye,
  X } from
'lucide-react';
import { toast } from 'sonner';
import { mockCompanies } from '../../lib/mockData';
import { CompanyLogo } from '../../components/CompanyLogo';
export function AdminEmployers() {
  const [employers, setEmployers] = useState(
    mockCompanies.map((c, i) => ({
      ...c,
      status: i === 0 ? 'PENDING' : i === 1 ? 'SUSPENDED' : 'APPROVED',
      submittedDate: '2024-01-15',
      contactPerson: 'Admin User',
      contactEmail: `admin@${c.website || 'company.com'}`
    }))
  );
  const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const handleApprove = (id: string) => {
    if (window.confirm('Approve this employer?')) {
      const prevStatus = employers.find((e) => e.id === id)?.status;
      setEmployers((emps) =>
      emps.map((e) =>
      e.id === id ?
      {
        ...e,
        status: 'APPROVED'
      } :
      e
      )
      );
      toast.success('Approved successfully.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setEmployers((emps) =>
          emps.map((e) =>
          e.id === id ?
          {
            ...e,
            status: prevStatus
          } :
          e
          )
          )
        }
      });
    }
  };
  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployer && rejectReason) {
      const prevStatus = selectedEmployer.status;
      setEmployers((emps) =>
      emps.map((emp) =>
      emp.id === selectedEmployer.id ?
      {
        ...emp,
        status: 'REJECTED'
      } :
      emp
      )
      );
      toast.success('Rejected successfully.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setEmployers((emps) =>
          emps.map((emp) =>
          emp.id === selectedEmployer.id ?
          {
            ...emp,
            status: prevStatus
          } :
          emp
          )
          )
        }
      });
      setRejectModalOpen(false);
      setRejectReason('');
      setSelectedEmployer(null);
    }
  };
  const handleSuspend = (id: string) => {
    if (window.confirm('Are you sure you want to suspend this employer?')) {
      const prevStatus = employers.find((e) => e.id === id)?.status;
      setEmployers((emps) =>
      emps.map((e) =>
      e.id === id ?
      {
        ...e,
        status: 'SUSPENDED'
      } :
      e
      )
      );
      toast.success('Employer suspended.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setEmployers((emps) =>
          emps.map((e) =>
          e.id === id ?
          {
            ...e,
            status: prevStatus
          } :
          e
          )
          )
        }
      });
    }
  };
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Employer Management
        </h1>
        <p className="text-gray-600">Approve and manage employer accounts.</p>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employers..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
            
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Submitted</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white/50">
              {employers.map((emp) =>
              <tr key={emp.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo company={emp} size="sm" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {emp.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {emp.industry} • {emp.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {emp.contactPerson}
                    </div>
                    <div className="text-xs text-gray-500">
                      {emp.contactEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${emp.status === 'APPROVED' ? 'bg-green-100 text-green-700' : emp.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : emp.status === 'SUSPENDED' ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'}`}>
                    
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {emp.submittedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {emp.status === 'PENDING' &&
                    <>
                          <button
                        onClick={() => handleApprove(emp.id)}
                        className="text-green-600 hover:bg-green-50 p-1.5 rounded transition-colors"
                        title="Approve">
                        
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                        onClick={() => {
                          setSelectedEmployer(emp);
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
                            <Eye className="w-4 h-4" /> View Details
                          </button>
                          {emp.status === 'APPROVED' &&
                        <button
                          onClick={() => handleSuspend(emp.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          
                              <Ban className="w-4 h-4" /> Suspend
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

      {/* Reject Modal */}
      {rejectModalOpen && selectedEmployer &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setRejectModalOpen(false)} />
        
          <div className="relative w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Reject Employer
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
                  {selectedEmployer.name}
                </span>
                . Please provide a reason.
              </p>
              <form id="reject-form" onSubmit={handleRejectSubmit}>
                <textarea
                required
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection..."
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
              form="reject-form"
              className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors">
              
                Reject Employer
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}