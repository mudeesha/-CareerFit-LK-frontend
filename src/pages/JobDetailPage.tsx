import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bookmark, Share2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { mockJobs, mockMatchResult } from '../lib/mockData';
import { CompanyLogo } from '../components/CompanyLogo';
import { CareerFitAdvisor } from '../components/CareerFitAdvisor';
import { ApplyJobModal } from '../components/ApplyJobModal';
import { formatCurrency } from '../lib/utils';
import { JobCard } from '../components/JobCard';
export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((j) => j.id === jobId) || mockJobs[0];
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const handleApplySubmit = () => {
    setIsApplyModalOpen(false);
    setIsApplied(true);
    toast.success('Application submitted successfully!');
  };
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-6 pt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            {/* Job Header Card */}
            <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="flex items-start gap-5">
                  <CompanyLogo
                    company={job.company}
                    size="lg"
                    className="w-16 h-16 text-xl" />
                  
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-2 text-lg text-gray-700 font-medium">
                      {job.company?.name}
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-200 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Location</div>
                  <div className="font-medium text-gray-900">
                    {job.location}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Work Mode</div>
                  <div className="font-medium text-gray-900">
                    {job.workMode}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Job Type</div>
                  <div className="font-medium text-gray-900">{job.jobType}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Salary</div>
                  <div className="font-medium text-gray-900">
                    {formatCurrency(job.salaryMin)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="text-sm text-gray-500">
                  Posted {job.postedDate} • {job.applicantCount} applicants
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  disabled={isApplied}
                  className={`md:hidden px-8 py-3 rounded-xl font-medium transition-colors ${isApplied ? 'bg-green-100 text-green-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                  
                  {isApplied ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
              {['Overview', 'About Company', 'Benefits'].map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.toLowerCase() ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                
                  {tab}
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'overview' &&
              <>
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      About the role
                    </h3>
                    <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200 text-gray-700 leading-relaxed">
                      {job.description || 'No description provided.'}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Responsibilities
                    </h3>
                    <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200">
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {job.responsibilities?.map((r, i) =>
                      <li key={i}>{r}</li>
                      ) || <li>Not specified</li>}
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Required Skills
                    </h3>
                    <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200 flex flex-wrap gap-2">
                      {job.skills.map((skill) =>
                    <span
                      key={skill}
                      className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      
                          {skill}
                        </span>
                    )}
                    </div>
                  </section>

                  {job.preferredSkills &&
                <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Preferred Skills
                      </h3>
                      <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200 flex flex-wrap gap-2">
                        {job.preferredSkills.map((skill) =>
                    <span
                      key={skill}
                      className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      
                            {skill}
                          </span>
                    )}
                      </div>
                    </section>
                }
                </>
              }

              {activeTab === 'about company' &&
              <section>
                  <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200">
                    <p className="text-gray-700 mb-6">
                      {job.company?.description ||
                    'A leading company in Sri Lanka.'}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Industry
                        </div>
                        <div className="font-medium text-gray-900">
                          {job.company?.industry}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Company Size
                        </div>
                        <div className="font-medium text-gray-900">
                          {job.company?.size || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Website
                        </div>
                        <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline">
                        
                          {job.company?.website || 'Visit website'}
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              }

              {activeTab === 'benefits' &&
              <section>
                  <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.benefits?.map((benefit, i) =>
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-700">
                      
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          {benefit}
                        </li>
                    ) ||
                    <li className="text-gray-500">
                          Benefits not specified.
                        </li>
                    }
                    </ul>
                  </div>
                </section>
              }
            </div>

            {/* Similar Jobs */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Similar Jobs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockJobs.
                filter((j) => j.id !== job.id && j.category === job.category).
                slice(0, 2).
                map((similarJob) =>
                <JobCard key={similarJob.id} job={similarJob} />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Advisor */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-24">
              <CareerFitAdvisor
                matchResult={mockMatchResult}
                onViewDetails={() =>
                toast.info('Match details modal would open here')
                }
                onImproveCV={() => navigate('/candidate/cv')}
                onApply={() => setIsApplyModalOpen(true)}
                isApplied={isApplied} />
              
            </div>
          </div>
        </div>
      </div>

      <ApplyJobModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={handleApplySubmit}
        matchScore={mockMatchResult.overallScore} />
      
    </div>);

}