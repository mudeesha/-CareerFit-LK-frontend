import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { mockJobs, mockCategories, mockCompanies } from '../lib/mockData';
import { JobCard } from '../components/JobCard';
import { CategoryCard } from '../components/CategoryCard';
import { CompanyCard } from '../components/CompanyCard';
import { HeroVisual } from '../components/HeroVisual';

export function HomePage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (keyword) params.append('q', keyword);
    if (location) params.append('location', location);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-purple-50 py-16 lg:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-[minmax(0,640px)_560px] gap-10 xl:gap-16 items-center justify-between">
            <div className="max-w-[640px]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 leading-tight mb-6">
                Find your next job in Sri Lanka <br />
                <span className="text-purple-600 relative inline-block">
                  with smart CV matching
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-purple-600/20"
                    viewBox="0 0 200 9"
                    fill="none"
                  >
                    <path
                      d="M2.00006 6.99999C35.4215 2.89531 100.864 -1.3323 198.001 6.99999"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Search Sri Lankan jobs, compare opportunities, and see your CV
                match score before applying.
              </p>

              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200 mb-6 max-w-[640px]">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-xl border border-transparent focus-within:border-purple-600 focus-within:bg-white transition-colors">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Job title, skill, or company"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 px-3 py-3.5 text-gray-900 placeholder:text-gray-400"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>

                  <div className="sm:w-48 flex items-center px-4 bg-gray-50 rounded-xl border border-transparent focus-within:border-purple-600 focus-within:bg-white transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                    <select
                      className="w-full bg-transparent border-none outline-none focus:ring-0 px-2 py-3.5 text-gray-900 appearance-none cursor-pointer"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">All Sri Lanka</option>
                      <option value="Colombo">Colombo</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Galle">Galle</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Search Jobs
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium">Popular:</span>
                {['Software Engineer', 'Banking', 'Internship', 'Remote', 'Customer Support'].map((tag) => (
                  <Link
                    key={tag}
                    to={`/jobs?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-6 lg:px-10 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
              <p className="text-gray-600">Explore jobs that match your skills and career goals.</p>
            </div>

            <button
              onClick={() => navigate('/jobs')}
              className="hidden sm:flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700"
            >
              View all jobs <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 lg:px-10 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by Category</h2>
            <p className="text-gray-600">
              Find opportunities across Sri Lanka’s most active job sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCategories.slice(0, 8).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 px-6 lg:px-10 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Top Hiring Companies
              </h2>
              <p className="text-gray-600">
                Discover companies actively hiring across Sri Lanka.
              </p>
            </div>

            <button
              onClick={() => navigate('/companies')}
              className="hidden sm:flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700"
            >
              View all companies <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCompanies.slice(0, 6).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* CareerFit Advisor */}
      <section className="py-20 px-6 lg:px-10 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet <span className="text-purple-600">CareerFit Advisor</span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Know how well your CV matches a job before you apply. Our AI
                analyzes your skills, experience, and suggests improvements to
                increase your chances.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'CV-to-job match score',
                  'Matched and missing skills',
                  'Personalized CV improvement tips',
                  'Recommended learning path',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/candidate/cv')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Upload CV
                </button>

                <button className="bg-white text-gray-900 border border-gray-200 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  View Sample Analysis
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-purple-50 rounded-[2rem] rotate-3 scale-105" />
              <div className="relative bg-white rounded-[2rem] shadow-xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">CareerFit Advisor</h3>
                    <p className="text-sm text-gray-500">Senior Software Engineer at WSO2</p>
                  </div>

                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600">78%</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Matched Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'REST API'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Missing Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {['TypeScript', 'AWS Lambda'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <p className="text-sm font-medium text-purple-600 mb-1">Suggestion:</p>
                    <p className="text-sm text-gray-900">
                      Add a TypeScript project to your CV to increase your match score.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}