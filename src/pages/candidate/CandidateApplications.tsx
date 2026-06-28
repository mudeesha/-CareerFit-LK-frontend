import React, { useEffect, useMemo, useState } from "react";
import { Edit, MoreVertical, Search } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Application, ApplicationStatus } from "../../lib/types";
import { CompanyLogo } from "../../components/CompanyLogo";
import { ApplicationFormModal } from "../../components/ApplicationFormModal";
import {
  getMyApplications,
  updateApplication,
  withdrawApplication,
} from "../../services/applicationApi";
import type { CvAnalysis } from "../../services/cvApi";

type EditableApplication = Application & {
  cvAnalysisId?: string | null;
  cvAnalysis?: CvAnalysis | null;
};

function statusLabel(status: ApplicationStatus) {
  return status.replace("_", " ");
}

function statusClass(status: ApplicationStatus) {
  if (status === "SHORTLISTED") return "bg-green-100 text-green-700";
  if (status === "INTERVIEW_SCHEDULED") return "bg-blue-100 text-blue-700";
  if (status === "WITHDRAWN") return "bg-gray-200 text-gray-700";
  if (status === "REJECTED") return "bg-red-100 text-red-700";
  return "bg-orange-100 text-orange-700";
}

function formatDate(value?: string) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CandidateApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<EditableApplication[]>([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "ALL">("ALL");

  const [isLoading, setIsLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const [editingApplication, setEditingApplication] =
    useState<EditableApplication | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadApplications() {
    try {
      setIsLoading(true);
      setError(null);

      const applicationsData = await getMyApplications();

      setApplications(applicationsData.items as EditableApplication[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load applications"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = [
        application.job?.title,
        application.job?.company?.name,
        application.status,
        application.cvAnalysis?.fileName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        !keyword || searchText.includes(keyword.toLowerCase());

      const matchesStatus = status === "ALL" || application.status === status;

      return matchesKeyword && matchesStatus;
    });
  }, [applications, keyword, status]);

  const handleWithdraw = async (id: string) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) {
      return;
    }

    try {
      setWithdrawingId(id);

      const updatedApplication = await withdrawApplication(id);

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === id
            ? (updatedApplication as EditableApplication)
            : application
        )
      );

      toast.success("Application withdrawn");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to withdraw application"
      );
    } finally {
      setWithdrawingId(null);
    }
  };

  const handleSaveEdit = async (
    applicationId: string,
    payload: { cvAnalysisId: string; coverLetter: string }
  ) => {
    try {
      setIsSavingEdit(true);

      const updatedApplication = await updateApplication(applicationId, payload);

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === applicationId
            ? (updatedApplication as EditableApplication)
            : application
        )
      );

      setEditingApplication(null);
      toast.success("Application updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update application"
      );
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl pb-10">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">
          My Applications
        </h1>
        <p className="text-gray-600">
          Track every job application in one place.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-[#F3F4F6] p-5">
          <div className="mb-1 text-sm text-gray-500">Total</div>
          <div className="text-2xl font-bold text-gray-900">
            {applications.length}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[#F3F4F6] p-5">
          <div className="mb-1 text-sm text-gray-500">Shortlisted</div>
          <div className="text-2xl font-bold text-green-600">
            {applications.filter((a) => a.status === "SHORTLISTED").length}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[#F3F4F6] p-5">
          <div className="mb-1 text-sm text-gray-500">Interviews</div>
          <div className="text-2xl font-bold text-blue-600">
            {
              applications.filter((a) => a.status === "INTERVIEW_SCHEDULED")
                .length
            }
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[#F3F4F6] p-5">
          <div className="mb-1 text-sm text-gray-500">Rejected</div>
          <div className="text-2xl font-bold text-red-600">
            {applications.filter((a) => a.status === "REJECTED").length}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-gray-200 bg-[#F3F4F6]">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-200 bg-white/50 p-4 sm:flex-row">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search applications..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-purple-600"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <select
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-600 sm:w-auto"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as ApplicationStatus | "ALL")
            }
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="VIEWED">Viewed</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="REJECTED">Rejected</option>
            <option value="HIRED">Hired</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50/50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Job & Company</th>
                <th className="px-6 py-4 font-medium">CV Used</th>
                <th className="px-6 py-4 font-medium">Match Score</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Applied Date</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white/50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Loading applications...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="transition-colors hover:bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <CompanyLogo company={app.job?.company} size="sm" />

                        <div>
                          <div className="font-medium text-gray-900">
                            {app.job?.title || "N/A"}
                          </div>

                          <div className="text-xs text-gray-500">
                            {app.job?.company?.name || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-[220px] truncate px-6 py-4 text-gray-500">
                      {app.cvAnalysis?.fileName || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {app.matchScore ?? 0}%
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${statusClass(
                          app.status
                        )}`}
                      >
                        {statusLabel(app.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(app.appliedAt)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/jobs/${app.jobId}`)}
                          className="rounded px-3 py-1.5 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50 hover:text-purple-700"
                        >
                          View Job
                        </button>

                        {app.status === "APPLIED" && (
                          <button
                            onClick={() => setEditingApplication(app)}
                            className="rounded p-1.5 text-gray-500 transition-colors hover:bg-purple-50 hover:text-purple-600"
                            title="Edit Application"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        )}

                        {app.status !== "WITHDRAWN" && (
                          <button
                            onClick={() => handleWithdraw(app.id)}
                            disabled={withdrawingId === app.id}
                            className="rounded p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            title="Withdraw Application"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingApplication?.job && (
        <ApplicationFormModal
          mode="edit"
          job={editingApplication.job}
          isOpen={Boolean(editingApplication)}
          onClose={() => setEditingApplication(null)}
          onSubmit={({ cvAnalysisId, coverLetter }) =>
            handleSaveEdit(editingApplication.id, {
              cvAnalysisId,
              coverLetter,
            })
          }
          initialCvAnalysisId={
            editingApplication.cvAnalysisId || editingApplication.cvAnalysis?.id
          }
          initialCoverLetter={editingApplication.coverLetter}
          isSubmitting={isSavingEdit}
        />
      )}
    </div>
  );
}