import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { mockJobs, mockCategories, mockCompanies } from '../lib/mockData';
import { JobListRow } from '../components/JobListRow';
export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // Filter states
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [jobType, setJobType] = useState('');
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('q', keyword);
    if (category) params.append('category', category);
    if (company) params.append('company', company);
    if (location) params.append('location', location);
    setSearchParams(params);
  };
  const resetFilters = () => {
    setKeyword('');
    setCategory('');
    setCompany('');
    setLocation('');
    setExperience('');
    setSalary('');
    setWorkMode('');
    setJobType('');
    setSearchParams(new URLSearchParams());
  };
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      if (
      keyword &&
      !job.title.toLowerCase().includes(keyword.toLowerCase()) &&
      !job.company?.name.toLowerCase().includes(keyword.toLowerCase()))

      return false;
      if (category && job.category !== category) return false;
      if (company && job.company?.name !== company) return false;
      if (location && job.location !== location) return false;
      if (experience && job.experienceLevel !== experience) return false;
      if (workMode && job.workMode !== workMode) return false;
      if (jobType && job.jobType !== jobType) return false;
      // Salary filtering logic would go here
      return true;
    });
  }, [
  keyword,
  category,
  company,
  location,
  experience,
  workMode,
  jobType,
  salary]
  );
  const FilterSidebar = () =>
  <div className="bg-[#F3F4F6] border border-gray-200 rounded-[18px] p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button
        onClick={resetFilters}
        className="text-sm text-purple-600 font-medium hover:text-purple-700">
        
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleSearch();
          }}>
          
            <option value="">All Categories</option>
            {mockCategories.map((c) =>
          <option key={c.id} value={c.name}>
                {c.name}
              </option>
          )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <select
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            handleSearch();
          }}>
          
            <option value="">All Companies</option>
            {mockCompanies.map((c) =>
          <option key={c.id} value={c.name}>
                {c.name}
              </option>
          )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <div className="space-y-2">
            {['Entry Level', '1–2 Years', '3–5 Years', '5+ Years'].map(
            (exp) =>
            <label key={exp} className="flex items-center gap-2">
                  <input
                type="radio"
                name="experience"
                value={exp}
                checked={experience === exp}
                onChange={(e) => setExperience(e.target.value)}
                className="text-purple-600 focus:ring-purple-600" />
              
                  <span className="text-sm text-gray-700">{exp}</span>
                </label>

          )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Mode
          </label>
          <div className="space-y-2">
            {['On-site', 'Hybrid', 'Remote'].map((mode) =>
          <label key={mode} className="flex items-center gap-2">
                <input
              type="radio"
              name="workMode"
              value={mode}
              checked={workMode === mode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="text-purple-600 focus:ring-purple-600" />
            
                <span className="text-sm text-gray-700">{mode}</span>
              </label>
          )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <div className="space-y-2">
            {['Full-time', 'Part-time', 'Contract', 'Internship'].map(
            (type) =>
            <label key={type} className="flex items-center gap-2">
                  <input
                type="radio"
                name="jobType"
                value={type}
                checked={jobType === type}
                onChange={(e) => setJobType(e.target.value)}
                className="text-purple-600 focus:ring-purple-600" />
              
                  <span className="text-sm text-gray-700">{type}</span>
                </label>

          )}
          </div>
        </div>
      </div>
    </div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header & Search */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-8 px-6">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Jobs
          </h1>
          <p className="text-gray-600 mb-8">
            Find the right opportunity in Sri Lanka.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-[#F3F4F6] p-2 rounded-[18px] border border-gray-200 flex flex-col md:flex-row gap-2">
            
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, skill, or company"
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} />
              
            </div>
            <div className="relative md:w-64">
              <select
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}>
                
                <option value="">All Locations</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
              
              Search
            </button>
          </form>

          {/* Quick Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
            'All',
            'Software',
            'Banking',
            'Finance',
            'Internships',
            'Remote',
            'Customer Support'].
            map((chip) =>
            <button
              key={chip}
              onClick={() => {
                if (chip === 'All') resetFilters();else
                {
                  setKeyword(chip);
                  handleSearch();
                }
              }}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              
                {chip}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 pt-8 flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <button
          className="md:hidden flex items-center justify-center gap-2 w-full bg-[#F3F4F6] border border-gray-200 py-3 rounded-xl font-medium text-gray-700"
          onClick={() => setIsMobileFiltersOpen(true)}>
          
          <Filter className="w-5 h-5" />
          Filters
        </button>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Mobile Sidebar Drawer */}
        {isMobileFiltersOpen &&
        <div className="fixed inset-0 z-50 flex md:hidden">
            <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileFiltersOpen(false)} />
          
            <div className="relative w-4/5 max-w-sm bg-white h-full overflow-y-auto p-6">
              <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setIsMobileFiltersOpen(false)}>
              
                <X className="w-6 h-6" />
              </button>
              <div className="mt-8">
                <FilterSidebar />
              </div>
            </div>
          </div>
        }

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredJobs.length} jobs found
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer">
                <option>Best Match</option>
                <option>Latest</option>
                <option>Salary: High to Low</option>
              </select>
            </div>
          </div>

          {filteredJobs.length > 0 ?
          <div>
              {filteredJobs.map((job) =>
            <JobListRow key={job.id} job={job} />
            )}
            </div> :

          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[18px] p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500 mb-6">
                Try changing your filters or search keyword.
              </p>
              <button
              onClick={resetFilters}
              className="bg-white border border-gray-200 text-gray-700 font-medium px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              
                Reset Filters
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}