import React, { useEffect, useMemo, useState } from "react";
import { Edit, MoreVertical, Search, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Application, ApplicationStatus } from "../../lib/types";
import { CompanyLogo } from "../../components/CompanyLogo";
import {
  getMyApplications,
  previewApplication,
  updateApplication,
  withdrawApplication,
  type ApplicationPreview,
} from "../../services/applicationApi";
import { getMyCvAnalyses, type CvAnalysis } from "../../services/cvApi";

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

function getScoreClass(score: number) {
  if (score >= 80) return "text-green-700 bg-green-100";
  if (score >= 60) return "text-orange-700 bg-orange-100";
  return "text-red-700 bg-red-100";
}

function SkillBadge({
  skill,
  type,
}: {
  skill: string;
  type: "matched" | "missing";
}) {
  const className =
    type === "matched"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-orange-200 bg-orange-50 text-orange-700";

  return (
    <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs ${className}`}>
      {skill}
    </span>
  );
}

function EditApplicationModal({
  application,
  cvs,
  isOpen,
  isSaving,
  onClose,
  onSave,
}: {
  application: EditableApplication | null;
  cvs: CvAnalysis[];
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (
    applicationId: string,
    payload: { cvAnalysisId: string; coverLetter: string }
  ) => Promise<void>;
}) {
  const [cvAnalysisId, setCvAnalysisId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [preview, setPreview] = useState<ApplicationPreview | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!application || !isOpen) return;

    const initialCvId =
      application.cvAnalysisId ||
      application.cvAnalysis?.id ||
      cvs.find((cv) => cv.isDefault)?.id ||
      cvs[0]?.id ||
      "";

    setCvAnalysisId(initialCvId);
    setCoverLetter(application.coverLetter || "");
    setPreview(null);
    setError("");
  }, [application, cvs, isOpen]);

  useEffect(() => {
    if (!application || !cvAnalysisId || !isOpen) return;

    let isMounted = true;

    async function loadPreview() {
      try {
        setIsPreviewLoading(true);

        const data = await previewApplication(application.id, {
          cvAnalysisId,
        });

        if (isMounted) {
          setPreview(data);
        }
      } catch (err) {
        if (isMounted) {
          toast.error(
            err instanceof Error ? err.message : "Failed to preview application"
          );
        }
      } finally {
        if (isMounted) {
          setIsPreviewLoading(false);
        }
      }
    }

    loadPreview();

    return () => {
      isMounted = false;
    };
  }, [application, cvAnalysisId, isOpen]);

  if (!isOpen || !application) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvAnalysisId) {
      setError("Please select a CV.");
      return;
    }

    if (!coverLetter.trim()) {
      setError("Cover letter is required.");
      return;
    }

    if (coverLetter.trim().length < 10) {
      setError("Cover letter must be at least 10 characters.");
      return;
    }

    await onSave(application.id, {
      cvAnalysisId,
      coverLetter: coverLetter.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isSaving ? undefined : onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[20px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Edit Application
            </h2>
            <p className="text-sm text-gray-500">
              Change your CV or cover letter while the application is still applied.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isSaving}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid max-h-[calc(90vh-150px)] grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-6 rounded-xl border border-gray-200 bg-[#F3F4F6] p-4">
                <div className="flex items-center gap-3">
                  <CompanyLogo company={application.job?.company} size="sm" />

                  <div>
                    <div className="font-semibold text-gray-900">
                      {application.job?.title || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.job?.company?.name || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select CV
                </label>

                <select
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-600"
                  value={cvAnalysisId}
                  disabled={isSaving}
                  onChange={(e) => {
                    setCvAnalysisId(e.target.value);
                    if (error) setError("");
                  }}
                >
                  <option value="">Select a CV</option>
                  {cvs.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {cv.fileName}
                      {cv.isDefault ? " — Default" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cover Letter
                </label>

                <textarea
                  className={`w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 ${
                    error
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-200 focus:ring-purple-600"
                  }`}
                  rows={8}
                  value={coverLetter}
                  disabled={isSaving}
                  onChange={(e) => {
                    setCoverLetter(e.target.value);
                    if (error) setError("");
                  }}
                />

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#F3F4F6] p-5">
              <h3 className="mb-1 text-lg font-bold text-gray-900">
                CareerFit Preview
              </h3>
              <p className="mb-5 text-sm text-gray-500">
                Live CV-to-job match analysis.
              </p>

              {isPreviewLoading ? (
                <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-500">
                  Calculating match score...
                </div>
              ) : preview ? (
                <div className="space-y-5">
                  <div className="rounded-xl bg-white p-5 text-center">
                    <div className="mx-auto mb-3 flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-purple-200">
                      <span className="text-2xl font-bold text-gray-900">
                        {preview.matchScore}%
                      </span>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getScoreClass(
                        preview.matchScore
                      )}`}
                    >
                      {preview.matchScore >= 80
                        ? "Great Match"
                        : preview.matchScore >= 60
                          ? "Good Match"
                          : "Low Match"}
                    </span>

                    <p className="mt-2 text-sm text-gray-600">
                      {preview.fileName}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Matched Skills
                    </h4>

                    {preview.matchedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {preview.matchedSkills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} type="matched" />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No matched skills found.
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Missing Skills
                    </h4>

                    {preview.missingSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {preview.missingSkills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} type="missing" />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No missing skills. This CV matches well.
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Suggestions
                    </h4>

                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                      {preview.suggestions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Learning Path
                    </h4>

                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                      {preview.learningPath.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-500">
                  Select a CV to preview match score.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CandidateApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<EditableApplication[]>([]);
  const [cvs, setCvs] = useState<CvAnalysis[]>([]);
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

      const [applicationsData, cvsData] = await Promise.all([
        getMyApplications(),
        getMyCvAnalyses(),
      ]);

      setApplications(applicationsData.items as EditableApplication[]);
      setCvs(cvsData.items);
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

      <EditApplicationModal
        application={editingApplication}
        cvs={cvs}
        isOpen={Boolean(editingApplication)}
        isSaving={isSavingEdit}
        onClose={() => setEditingApplication(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}