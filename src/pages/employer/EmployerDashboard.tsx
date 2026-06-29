import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Users } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";
import {
  getEmployerDashboard,
  type EmployerDashboardResponse,
} from "../../services/employer/DashboardApi";

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatRelativeTime(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function EmployerDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<EmployerDashboardResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true);
        const data = await getEmployerDashboard();
        setDashboard(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load dashboard"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const chartData = useMemo(() => {
    return (
      dashboard?.applicationsTrend?.map((item) => ({
        name: item.name,
        applicants: item.value,
      })) || []
    );
  }, [dashboard]);

  if (isLoading) {
    return (
      <div className="space-y-8 pb-10">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-8 text-gray-500">
          Loading employer dashboard...
        </div>
      </div>
    );
  }

  const stats = dashboard?.stats;
  const recentApplicants = dashboard?.recentApplicants || [];
  const activeJobs = dashboard?.activeJobs || [];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Employer Dashboard
          </h1>
          <p className="text-gray-600">
            Manage jobs, applicants, and hiring performance.
          </p>
        </div>

        <button
          onClick={() => navigate("/employer/jobs/new")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Total Jobs</div>
          <div className="text-2xl font-bold text-gray-900">
            {stats?.totalJobs ?? 0}
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Active Jobs</div>
          <div className="text-2xl font-bold text-gray-900">
            {stats?.activeJobs ?? 0}
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Total Applicants</div>
          <div className="text-2xl font-bold text-gray-900">
            {stats?.totalApplicants ?? 0}
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Shortlisted</div>
          <div className="text-2xl font-bold text-green-600">
            {stats?.shortlisted ?? 0}
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500 mb-1">Pending Reviews</div>
          <div className="text-2xl font-bold text-orange-600">
            {stats?.pendingReviews ?? 0}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Applications Over Time
          </h2>

          <div className="h-[300px] w-full">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                No application data yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    dy={10}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="applicants"
                    stroke="#7C3AED"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorApp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Recent Applicants
            </h2>

            <button
              onClick={() => navigate("/employer/jobs")}
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentApplicants.length === 0 ? (
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-500">
                No applicants yet.
              </div>
            ) : (
              recentApplicants.map((applicant, index) => (
                <div
                  key={applicant.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full shrink-0 flex items-center justify-center font-semibold text-sm">
                      {applicant.candidateName
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || `A${index + 1}`}
                    </div>

                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {applicant.candidateName}
                      </div>
                      <div className="text-xs text-gray-500 truncate w-32">
                        {applicant.jobTitle}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {applicant.matchScore ?? 0}%
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatRelativeTime(applicant.appliedAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-white/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Active Jobs</h2>

          <button
            onClick={() => navigate("/employer/jobs")}
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Manage all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Applicants</th>
                <th className="px-6 py-4 font-medium">Posted</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white/50">
              {activeJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No active jobs yet.
                  </td>
                </tr>
              ) : (
                activeJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {job.title}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md font-medium">
                        {job.applicantCount ?? 0}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(job.postedDate || job.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/employer/jobs/${job.id}/applicants`)
                        }
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-purple-50 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Users className="w-4 h-4" />
                        View Applicants
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}