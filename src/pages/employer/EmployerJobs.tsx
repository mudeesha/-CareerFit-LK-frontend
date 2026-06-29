import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  PlusCircle,
  MoreVertical,
  Users,
  Copy,
  Edit,
  Trash2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { Job, JobStatus } from "../../lib/types";
import {
  closeEmployerJob,
  createEmployerJob,
  deleteEmployerJob,
  getEmployerJobs,
} from "../../services/employer/JobApi";
import { ConfirmDialog } from "../../components/ConfirmDialog";

type StatusFilter = "ALL" | JobStatus;
type SortOrder = "NEWEST" | "OLDEST";

type OpenMenuState = {
  jobId: string;
  top: number;
  left: number;
} | null;

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

function getStatusClass(status: JobStatus) {
  if (status === "ACTIVE") return "bg-green-100 text-green-700";
  if (status === "DRAFT") return "bg-gray-200 text-gray-700";
  if (status === "CLOSED") return "bg-red-100 text-red-700";
  if (status === "REJECTED") return "bg-red-100 text-red-700";
  return "bg-orange-100 text-orange-700";
}

function getPostedDate(job: Job) {
  if (job.status === "DRAFT") return "-";
  if (job.status === "PENDING_APPROVAL") return "Pending review";

  return formatDate(job.postedDate || job.createdAt);
}

export function EmployerJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NEWEST");

  const [isLoading, setIsLoading] = useState(true);
  const [closingJobId, setClosingJobId] = useState<string | null>(null);
  const [duplicatingJobId, setDuplicatingJobId] = useState<string | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<OpenMenuState>(null);
  const [error, setError] = useState("");

  const [deleteTargetJob, setDeleteTargetJob] = useState<Job | null>(null);
  const [closeTargetJob, setCloseTargetJob] = useState<Job | null>(null);

  async function loadJobs() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getEmployerJobs();
      setJobs(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (!openMenu) return;

    function closeMenu() {
      setOpenMenu(null);
    }

    window.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("resize", closeMenu);
    };
  }, [openMenu]);

  const filteredJobs = useMemo(() => {
    const keywordValue = keyword.trim().toLowerCase();

    return jobs
      .filter((job) => {
        const matchesKeyword =
          !keywordValue ||
          [
            job.title,
            job.location,
            job.workMode,
            job.jobType,
            job.status,
            job.category?.name,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(keywordValue);

        const matchesStatus =
          statusFilter === "ALL" || job.status === statusFilter;

        return matchesKeyword && matchesStatus;
      })
      .sort((a, b) => {
        const aTime = new Date(a.createdAt || a.postedDate || 0).getTime();
        const bTime = new Date(b.createdAt || b.postedDate || 0).getTime();

        if (sortOrder === "OLDEST") return aTime - bTime;

        return bTime - aTime;
      });
  }, [jobs, keyword, statusFilter, sortOrder]);

  const selectedMenuJob = openMenu
    ? jobs.find((job) => job.id === openMenu.jobId)
    : null;

  const handleToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    jobId: string
  ) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 192;

    setOpenMenu((currentMenu) =>
      currentMenu?.jobId === jobId
        ? null
        : {
            jobId,
            top: rect.bottom + 8,
            left: rect.right - menuWidth,
          }
    );
  };

  const handleDuplicate = async (id: string) => {
    const jobToDuplicate = jobs.find((job) => job.id === id);

    if (!jobToDuplicate) return;

    if (!jobToDuplicate.categoryId) {
      toast.error("Cannot duplicate this job because category is missing.");
      return;
    }

    try {
      setOpenMenu(null);
      setDuplicatingJobId(id);

      const duplicatedJob = await createEmployerJob({
        title: `${jobToDuplicate.title} (Copy)`,
        categoryId: jobToDuplicate.categoryId,
        location: jobToDuplicate.location,
        workMode: jobToDuplicate.workMode,
        jobType: jobToDuplicate.jobType,
        experienceLevel: jobToDuplicate.experienceLevel,
        salaryMin: jobToDuplicate.salaryMin,
        salaryMax: jobToDuplicate.salaryMax,
        skills: jobToDuplicate.skills || [],
        preferredSkills: jobToDuplicate.preferredSkills || [],
        description: jobToDuplicate.description || "",
        responsibilities: jobToDuplicate.responsibilities || [],
        benefits: jobToDuplicate.benefits || [],
        status: "DRAFT",
      });

      setJobs((currentJobs) => [duplicatedJob, ...currentJobs]);
      toast.success("Job duplicated as draft.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to duplicate job");
    } finally {
      setDuplicatingJobId(null);
    }
  };

  const handleClose = async (id: string) => {
    setOpenMenu(null);

    if (
      !window.confirm(
        "Are you sure you want to close this job? Candidates will no longer be able to apply."
      )
    ) {
      return;
    }

    try {
      setClosingJobId(id);

      const updatedJob = await closeEmployerJob(id);

      setJobs((currentJobs) =>
        currentJobs.map((job) => (job.id === id ? updatedJob : job))
      );

      toast.success("Job closed successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to close job");
    } finally {
      setClosingJobId(null);
    }
  };

  const handleDeleteDraft = async (id: string) => {
    setOpenMenu(null);

    try {
      setDeletingJobId(id);

      await deleteEmployerJob(id);

      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
      toast.success("Draft deleted successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete draft");
    } finally {
      setDeletingJobId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Jobs</h1>
          <p className="text-gray-600">Manage your company's job posts.</p>
        </div>

        <button
          onClick={() => navigate("/employer/jobs/new")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="DRAFT">Draft</option>
              <option value="CLOSED">Closed</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            >
              <option value="NEWEST">Newest First</option>
              <option value="OLDEST">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Applicants</th>
                <th className="px-6 py-4 font-medium">Posted Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white/50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Loading jobs...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{job.title}</div>
                      <div className="text-xs text-gray-500">
                        {job.location} • {job.workMode}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusClass(
                          job.status
                        )}`}
                      >
                        {job.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {job.status === "ACTIVE" ? (
                        <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md font-medium">
                          {job.applicantCount ?? 0}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {getPostedDate(job)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {job.status === "ACTIVE" && (
                          <button
                            onClick={() =>
                              navigate(`/employer/jobs/${job.id}/applicants`)
                            }
                            className="text-purple-600 hover:text-purple-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-purple-50 transition-colors inline-flex items-center gap-1.5"
                          >
                            <Users className="w-4 h-4" />
                            Applicants
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleToggleMenu(e, job.id)}
                          className="text-gray-500 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openMenu && selectedMenuJob && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-[9999]"
          style={{
            top: openMenu.top,
            left: openMenu.left,
          }}
        >
          <button
            onClick={() => {
              setOpenMenu(null);
              navigate(`/employer/jobs/${selectedMenuJob.id}/edit`);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Job
          </button>

          <button
            onClick={() => handleDuplicate(selectedMenuJob.id)}
            disabled={duplicatingJobId === selectedMenuJob.id}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-60"
          >
            <Copy className="w-4 h-4" />
            {duplicatingJobId === selectedMenuJob.id
              ? "Duplicating..."
              : "Duplicate"}
          </button>

          {selectedMenuJob.status === "ACTIVE" && (
            <button
              onClick={() => handleClose(selectedMenuJob.id)}
              disabled={closingJobId === selectedMenuJob.id}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-60"
            >
              <XCircle className="w-4 h-4" />
              {closingJobId === selectedMenuJob.id ? "Closing..." : "Close Job"}
            </button>
          )}

          {selectedMenuJob.status === "DRAFT" && (
            <button
              onClick={() => {
                setOpenMenu(null);
                setDeleteTargetJob(selectedMenuJob);
              }}
              disabled={deletingJobId === selectedMenuJob.id}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" />
              Delete Draft
            </button>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTargetJob}
        variant="danger"
        title="Delete Draft Job?"
        description="This action cannot be undone. The draft job will be permanently deleted."
        confirmLabel="Delete Draft"
        isLoading={deletingJobId !== null}
        onClose={() => setDeleteTargetJob(null)}
        onConfirm={async () => {
          if (!deleteTargetJob) return;

          await handleDeleteDraft(deleteTargetJob.id);
          setDeleteTargetJob(null);
        }}
      />
    </div>
  );
}