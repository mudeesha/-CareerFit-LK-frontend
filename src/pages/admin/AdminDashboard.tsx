import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid } from
'recharts';
const applicationsData = [
{
  name: 'Jan',
  value: 400
},
{
  name: 'Feb',
  value: 300
},
{
  name: 'Mar',
  value: 550
},
{
  name: 'Apr',
  value: 450
},
{
  name: 'May',
  value: 700
},
{
  name: 'Jun',
  value: 650
}];

const skillsData = [
{
  name: 'AWS',
  value: 85
},
{
  name: 'TypeScript',
  value: 72
},
{
  name: 'Docker',
  value: 65
},
{
  name: 'CI/CD',
  value: 58
},
{
  name: 'System Design',
  value: 45
}];

export function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor platform activity and approvals.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Total Candidates</div>
          <div className="text-2xl font-bold text-gray-900">8,900</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Total Employers</div>
          <div className="text-2xl font-bold text-gray-900">500</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Active Jobs</div>
          <div className="text-2xl font-bold text-gray-900">2,856</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Pending Approvals</div>
          <div className="text-2xl font-bold text-orange-600">32</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications Chart */}
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Applications Trend
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationsData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>
                
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
                  cursor={{
                    fill: '#E5E7EB'
                  }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }} />
                
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Missing Skills Chart */}
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Top Missing Skills (Platform-wide)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={skillsData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 10,
                  left: 20,
                  bottom: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#E5E7EB" />
                
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />
                
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#4B5563',
                    fontSize: 12,
                    fontWeight: 500
                  }} />
                
                <Tooltip
                  cursor={{
                    fill: '#E5E7EB'
                  }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  }} />
                
                <Bar
                  dataKey="value"
                  fill="#F97316"
                  radius={[0, 4, 4, 0]}
                  barSize={24} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Recent Platform Activity
        </h2>
        <div className="space-y-4">
          {[
          {
            action: 'Job submitted for review',
            entity: 'Senior React Developer by WSO2',
            time: '10 mins ago',
            type: 'pending'
          },
          {
            action: 'Employer registered',
            entity: 'Creative Labs Colombo',
            time: '1 hour ago',
            type: 'info'
          },
          {
            action: 'Job approved',
            entity: 'Marketing Manager by Dialog',
            time: '2 hours ago',
            type: 'success'
          },
          {
            action: 'Candidate applied',
            entity: 'Nimal Perera to Frontend Developer',
            time: '3 hours ago',
            type: 'info'
          },
          {
            action: 'Employer rejected',
            entity: 'SpamCompany Ltd',
            time: '5 hours ago',
            type: 'error'
          }].
          map((activity, i) =>
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            
              <div className="flex items-center gap-3">
                <div
                className={`w-2 h-2 rounded-full ${activity.type === 'pending' ? 'bg-orange-500' : activity.type === 'success' ? 'bg-green-500' : activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
              
                <div>
                  <span className="font-medium text-gray-900">
                    {activity.action}:{' '}
                  </span>
                  <span className="text-gray-600">{activity.entity}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          )}
        </div>
      </div>
    </div>);

}