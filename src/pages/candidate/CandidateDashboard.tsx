import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bookmark } from 'lucide-react';
import { mockCandidate, mockJobs, mockApplications } from '../../lib/mockData';
import { CompanyLogo } from '../../components/CompanyLogo';
import { MatchScoreBadge } from '../../components/MatchScoreBadge';
export function CandidateDashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {mockCandidate.name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-600">
            Let's continue your journey to find the right opportunity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
            
            <Search className="w-4 h-4" />
            Find Jobs
          </button>
          <button
            onClick={() => navigate('/candidate/profile')}
            className="bg-white border border-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            
            Improve Profile
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Profile Completion</div>
          <div className="text-2xl font-bold text-gray-900">
            {mockCandidate.profileCompletion}%
          </div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">CV Readiness</div>
          <div className="text-2xl font-bold text-green-600">92%</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Applications</div>
          <div className="text-2xl font-bold text-gray-900">
            {mockApplications.length}
          </div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Shortlisted</div>
          <div className="text-2xl font-bold text-gray-900">2</div>
        </div>
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Saved Jobs</div>
          <div className="text-2xl font-bold text-gray-900">12</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Jobs */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Recommended Jobs for You
              </h2>
              <button
                onClick={() => navigate('/jobs')}
                className="text-sm font-medium text-purple-600 hover:text-purple-700">
                
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockJobs.slice(0, 4).map((job) =>
              <div
                key={job.id}
                className="bg-[#F3F4F6] border border-gray-200 rounded-[16px] p-5 relative group hover:bg-[#ECEFF3] transition-colors cursor-pointer"
                onClick={() => navigate(`/jobs/${job.id}`)}>
                
                  <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    <CompanyLogo company={job.company} size="sm" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm truncate pr-6">
                        {job.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {job.company?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm font-medium text-gray-900">
                      LKR {job.salaryMin.toLocaleString()}
                    </div>
                    <MatchScoreBadge score={job.matchScore} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Applications
              </h2>
              <button
                onClick={() => navigate('/candidate/applications')}
                className="text-sm font-medium text-purple-600 hover:text-purple-700">
                
                View all
              </button>
            </div>
            <div className="bg-[#F3F4F6] border border-gray-200 rounded-[16px] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Job</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Match</th>
                    <th className="px-5 py-3 font-medium">Applied</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white/50">
                  {mockApplications.slice(0, 3).map((app) =>
                  <tr
                    key={app.id}
                    className="hover:bg-white transition-colors cursor-pointer"
                    onClick={() => navigate(`/jobs/${app.jobId}`)}>
                    
                      <td className="px-5 py-3">
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
                      <td className="px-5 py-3">
                        <span
                        className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${app.status === 'SHORTLISTED' ? 'bg-green-100 text-green-700' : app.status === 'INTERVIEW_SCHEDULED' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {app.matchScore}%
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {app.appliedDate}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skill Gap Insights */}
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[16px] p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Skill Gap Insights
            </h2>
            <div className="space-y-4">
              {[
              {
                skill: 'React.js',
                demand: 'High demand',
                match: 80,
                color: 'bg-green-500'
              },
              {
                skill: 'System Design',
                demand: 'High demand',
                match: 65,
                color: 'bg-orange-500'
              },
              {
                skill: 'AWS',
                demand: 'Medium demand',
                match: 45,
                color: 'bg-orange-500'
              },
              {
                skill: 'Docker',
                demand: 'Medium demand',
                match: 40,
                color: 'bg-red-500'
              }].
              map((item) =>
              <div key={item.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">
                      {item.skill}
                    </span>
                    <span className="text-gray-500 text-xs">{item.demand}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{
                      width: `${item.match}%`
                    }} />
                  
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/candidate/cv')}
              className="w-full mt-6 bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              
              Update Skills
            </button>
          </div>

          {/* CareerFit Advisor Mini */}
          <div className="bg-purple-50 border border-purple-100 rounded-[16px] p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-purple-200">
                <span className="text-purple-600 font-bold">75%</span>
              </div>
              <div>
                <h3 className="font-bold text-purple-900">
                  Profile is 75% complete
                </h3>
                <p className="text-xs text-purple-700">
                  Add more skills to improve your match score.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/candidate/profile')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
              
              Improve Now
            </button>
          </div>
        </div>
      </div>
    </div>);

}