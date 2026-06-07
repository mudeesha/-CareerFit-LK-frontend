import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { JobListRow } from "../components/JobListRow";
import type { Category, Company, Job } from "../lib/types";
import { getJobs, type GetJobsParams } from "../services/jobApi";
import { getCategories } from "../services/categoryApi";
import { getCompanies } from "../services/companyApi";

function mapSalaryForApi(
  value: string
): Pick<GetJobsParams, "salaryMin" | "salaryMax"> {
  const map: Record<string, Pick<GetJobsParams, "salaryMin" | "salaryMax">> = {
    "25000-50000": { salaryMin: 25000, salaryMax: 50000 },
    "50000-100000": { salaryMin: 50000, salaryMax: 100000 },
    "100000-200000": { salaryMin: 100000, salaryMax: 200000 },
    "200000-350000": { salaryMin: 200000, salaryMax: 350000 },
    "350000+": { salaryMin: 350000 },
  };

  return map[value] || {};
}

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [company, setCompany] = useState(searchParams.get("company") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [experience, setExperience] = useState(
    searchParams.get("experienceLevel") || ""
  );
  const [salary, setSalary] = useState(searchParams.get("salary") || "");
  const [workMode, setWorkMode] = useState(searchParams.get("workMode") || "");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiFilters = useMemo<GetJobsParams>(() => {
    const salaryFilter = mapSalaryForApi(salary);

    return {
      keyword: keyword || undefined,
      category: category || undefined,
      company: company || undefined,
      location: location || undefined,
      experienceLevel: experience || undefined,
      workMode: workMode || undefined,
      jobType: jobType || undefined,
      ...salaryFilter,
    };
  }, [
    keyword,
    category,
    company,
    location,
    experience,
    salary,
    workMode,
    jobType,
  ]);

  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (keyword) params.set("q", keyword);
    if (category) params.set("category", category);
    if (company) params.set("company", company);
    if (location) params.set("location", location);
    if (experience) params.set("experienceLevel", experience);
    if (salary) params.set("salary", salary);
    if (workMode) params.set("workMode", workMode);
    if (jobType) params.set("jobType", jobType);

    setSearchParams(params);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateUrlParams();
  };

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setCompany("");
    setLocation("");
    setExperience("");
    setSalary("");
    setWorkMode("");
    setJobType("");
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    let isMounted = true;

    async function loadFilterData() {
      try {
        setIsFiltersLoading(true);

        const [categoriesResponse, companiesResponse] = await Promise.all([
          getCategories(),
          getCompanies(),
        ]);

        if (isMounted) {
          setCategories(categoriesResponse.items);
          setCompanies(companiesResponse.items);
        }
      } catch (err) {
        console.error("Failed to load filter data", err);
      } finally {
        if (isMounted) {
          setIsFiltersLoading(false);
        }
      }
    }

    loadFilterData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getJobs(apiFilters);

        if (isMounted) {
          setJobs(data.items);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load jobs");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [apiFilters]);

  const FilterSidebar = () => (
    <div className="bg-[#F3F4F6] border border-gray-200 rounded-[18px] p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Filters</h3>

        <button
          onClick={resetFilters}
          className="text-sm text-purple-600 font-medium hover:text-purple-700"
        >
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
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">
              {isFiltersLoading ? "Loading categories..." : "All Categories"}
            </option>

            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>

          <select
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">
              {isFiltersLoading ? "Loading companies..." : "All Companies"}
            </option>

            {companies.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>

          <div className="space-y-2">
            {[
              { label: "Entry Level", value: "ENTRY_LEVEL" },
              { label: "1–2 Years", value: "ONE_TO_TWO_YEARS" },
              { label: "3–5 Years", value: "THREE_TO_FIVE_YEARS" },
              { label: "5+ Years", value: "FIVE_PLUS_YEARS" },
            ].map((exp) => (
              <label key={exp.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experience"
                  value={exp.value}
                  checked={experience === exp.value}
                  onChange={(e) => setExperience(e.target.value)}
                  className="text-purple-600 focus:ring-purple-600"
                />

                <span className="text-sm text-gray-700">{exp.label}</span>
              </label>
            ))}

            {experience && (
              <button
                type="button"
                onClick={() => setExperience("")}
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                Clear experience
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>

          <select
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          >
            <option value="">Any Salary</option>
            <option value="25000-50000">LKR 25,000 - 50,000</option>
            <option value="50000-100000">LKR 50,000 - 100,000</option>
            <option value="100000-200000">LKR 100,000 - 200,000</option>
            <option value="200000-350000">LKR 200,000 - 350,000</option>
            <option value="350000+">LKR 350,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Mode
          </label>

          <div className="space-y-2">
            {[
              { label: "On-site", value: "ONSITE" },
              { label: "Hybrid", value: "HYBRID" },
              { label: "Remote", value: "REMOTE" },
            ].map((mode) => (
              <label key={mode.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="workMode"
                  value={mode.value}
                  checked={workMode === mode.value}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="text-purple-600 focus:ring-purple-600"
                />

                <span className="text-sm text-gray-700">{mode.label}</span>
              </label>
            ))}

            {workMode && (
              <button
                type="button"
                onClick={() => setWorkMode("")}
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                Clear work mode
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>

          <div className="space-y-2">
            {[
              { label: "Full-time", value: "FULL_TIME" },
              { label: "Part-time", value: "PART_TIME" },
              { label: "Contract", value: "CONTRACT" },
              { label: "Internship", value: "INTERNSHIP" },
            ].map((type) => (
              <label key={type.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="jobType"
                  value={type.value}
                  checked={jobType === type.value}
                  onChange={(e) => setJobType(e.target.value)}
                  className="text-purple-600 focus:ring-purple-600"
                />

                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}

            {jobType && (
              <button
                type="button"
                onClick={() => setJobType("")}
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                Clear job type
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
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
            className="bg-[#F3F4F6] p-2 rounded-[18px] border border-gray-200 flex flex-col md:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Job title, skill, or company"
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="relative md:w-64">
              <select
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { label: "All", keyword: "" },
              { label: "Software", keyword: "Software" },
              { label: "Banking", keyword: "Banking" },
              { label: "Finance", keyword: "Finance" },
              { label: "Internships", keyword: "Internship" },
              { label: "Remote", keyword: "Remote" },
              { label: "Customer Support", keyword: "Customer Support" },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => {
                  if (chip.label === "All") {
                    resetFilters();
                  } else {
                    setKeyword(chip.keyword);
                  }
                }}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 pt-8 flex flex-col md:flex-row gap-8">
        <button
          className="md:hidden flex items-center justify-center gap-2 w-full bg-[#F3F4F6] border border-gray-200 py-3 rounded-xl font-medium text-gray-700"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>

        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMobileFiltersOpen(false)}
            />

            <div className="relative w-4/5 max-w-sm bg-white h-full overflow-y-auto p-6">
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-8">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {isLoading ? "Loading jobs..." : `${jobs.length} jobs found`}
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

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-[18px] border border-gray-200 bg-[#F3F4F6]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="bg-[#F3F4F6] border border-gray-200 rounded-[18px] p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <X className="w-8 h-8 text-red-400" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Failed to load jobs
              </h3>

              <p className="text-gray-500 mb-6">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="bg-white border border-gray-200 text-gray-700 font-medium px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : jobs.length > 0 ? (
            <div>
              {jobs.map((job) => (
                <JobListRow key={job.id} job={job} />
              ))}
            </div>
          ) : (
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
                className="bg-white border border-gray-200 text-gray-700 font-medium px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}