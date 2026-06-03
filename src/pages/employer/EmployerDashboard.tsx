import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users, Eye } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid } from
'recharts';
import { mockJobs, mockCompanies } from '../../lib/mockData';
const chartData = [
{
  name: 'Mon',
  applicants: 12
},
{
  name: 'Tue',
  applicants: 19
},
{
  name: 'Wed',
  applicants: 15
},
{
  name: 'Thu',
  applicants: 25
},
{
  name: 'Fri',
  applicants: 22
},
{
  name: 'Sat',
  applicants: 30
},
{
  name: 'Sun',
  applicants: 28
}];

export function EmployerDashboard() {
  const navigate = useNavigate();
  const company = mockCompanies[2]; // Colombo Tech Solutions
  const myJobs = mockJobs.filter((j) => j.companyId === company.id);
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Good morning, {company.name}
          </h1>
          <p className="text-gray-600">
            Manage jobs, applicants, and hiring performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/employer/jobs/new')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
            
            <PlusCircle className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Active Jobs</div>
          <div className="text-2xl font-bold text-gray-900">
            {myJobs.length}
          </div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Total Applicants</div>
          <div className="text-2xl font-bold text-gray-900">128</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Shortlisted</div>
          <div className="text-2xl font-bold text-green-600">24</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Pending Reviews</div>
          <div className="text-2xl font-bold text-orange-600">8</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Applications Over Time
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB" />
                
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }}
                  dy={10} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="applicants"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorApp)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Recent Applicants
            </h2>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[
            {
              name: 'Nimal Perera',
              role: 'Junior Full Stack Developer',
              score: 92,
              time: '2h ago'
            },
            {
              name: 'Kasun Silva',
              role: 'Junior Full Stack Developer',
              score: 85,
              time: '5h ago'
            },
            {
              name: 'Amali Fernando',
              role: 'Frontend Developer',
              score: 78,
              time: '1d ago'
            }].
            map((applicant, i) =>
            <div
              key={i}
              className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden shrink-0">
                    <img
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={applicant.name}
                    className="w-full h-full object-cover" />
                  
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {applicant.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate w-32">
                      {applicant.role}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    {applicant.score}%
                  </div>
                  <div className="text-xs text-gray-400">{applicant.time}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Jobs */}
      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-white/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Active Jobs</h2>
          <button
            onClick={() => navigate('/employer/jobs')}
            className="text-sm font-medium text-purple-600 hover:text-purple-700">
            
            Manage all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Applicants</th>
                <th className="px-6 py-4 font-medium">Avg. Match</th>
                <th className="px-6 py-4 font-medium">Posted</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white/50">
              {myJobs.map((job) =>
              <tr key={job.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md font-medium">
                      {job.applicantCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.matchScore}%
                  </td>
                  <td className="px-6 py-4 text-gray-500">{job.postedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                    onClick={() =>
                    navigate(`/employer/jobs/${job.id}/applicants`)
                    }
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-purple-50 transition-colors inline-flex items-center gap-1.5">
                    
                      <Users className="w-4 h-4" />
                      View Applicants
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}