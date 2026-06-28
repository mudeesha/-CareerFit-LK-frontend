import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { Job } from "../lib/types";
import { CompanyLogo } from "./CompanyLogo";
import {
  previewJobApplication,
  type ApplicationPreview,
} from "../services/applicationApi";
import { getMyCvAnalyses, uploadCv, type CvAnalysis } from "../services/cvApi";

type ApplicationFormMode = "apply" | "edit";

interface ApplicationFormModalProps {
  mode: ApplicationFormMode;
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    cvAnalysisId: string;
    coverLetter: string;
  }) => Promise<void>;
  initialCvAnalysisId?: string | null;
  initialCoverLetter?: string;
  isSubmitting?: boolean;
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
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs ${className}`}
    >
      {skill}
    </span>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(0, Math.min(100, score));

  return (
    <div className="relative mx-auto mb-3 h-28 w-28">
      <svg className="-rotate-90 h-28 w-28" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#9333EA"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * safeScore) / 100}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{safeScore}%</span>
      </div>
    </div>
  );
}

function MatchBreakdown({ preview }: { preview: ApplicationPreview }) {
  const items = [
    { label: "Skills Match", value: preview.breakdown?.skills ?? 0 },
    { label: "Experience Fit", value: preview.breakdown?.experience ?? 0 },
    { label: "Location Fit", value: preview.breakdown?.location ?? 0 },
    { label: "Salary Fit", value: preview.breakdown?.salary ?? 0 },
  ];

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h4 className="mb-4 font-semibold text-gray-900">Match Breakdown</h4>

      {items.map((item) => {
        const value = Math.max(0, Math.min(100, item.value));

        return (
          <div key={item.label} className="mb-4 last:mb-0">
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-gray-700">{item.label}</span>
              <span className="font-semibold text-gray-900">{value}%</span>
            </div>

            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-purple-600 transition-all"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ApplicationFormModal({
  mode,
  job,
  isOpen,
  onClose,
  onSubmit,
  initialCvAnalysisId,
  initialCoverLetter = "",
  isSubmitting = false,
}: ApplicationFormModalProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const [cvs, setCvs] = useState<CvAnalysis[]>([]);
  const [cvAnalysisId, setCvAnalysisId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [preview, setPreview] = useState<ApplicationPreview | null>(null);
  const [isLoadingCvs, setIsLoadingCvs] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false);
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [error, setError] = useState("");

  const selectedCv = cvs.find((cv) => cv.id === cvAnalysisId) || null;

  useEffect(() => {
    if (!isOpen) return;

    async function loadCvs() {
      try {
        setIsLoadingCvs(true);

        const data = await getMyCvAnalyses();
        const defaultCv = data.items.find((cv) => cv.isDefault);
        const initialCvId =
          initialCvAnalysisId || defaultCv?.id || data.items[0]?.id || "";

        setCvs(data.items);
        setCvAnalysisId(initialCvId);
        setCoverLetter(initialCoverLetter || "");
        setPreview(null);
        setError("");
        setIsCvDropdownOpen(false);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to load CVs");
      } finally {
        setIsLoadingCvs(false);
      }
    }

    loadCvs();
  }, [isOpen, initialCvAnalysisId, initialCoverLetter]);

  useEffect(() => {
    if (!isOpen || !job?.id || !cvAnalysisId) return;

    let isMounted = true;

    async function loadPreview() {
      try {
        setIsPreviewLoading(true);

        const data = await previewJobApplication({
          jobId: job.id,
          cvAnalysisId,
        });

        if (isMounted) setPreview(data);
      } catch (err) {
        if (isMounted) {
          toast.error(
            err instanceof Error ? err.message : "Failed to preview application"
          );
        }
      } finally {
        if (isMounted) setIsPreviewLoading(false);
      }
    }

    loadPreview();

    return () => {
      isMounted = false;
    };
  }, [isOpen, job?.id, cvAnalysisId]);

  if (!isOpen) return null;

  const title = mode === "apply" ? "Apply for Job" : "Edit Application";
  const description =
    mode === "apply"
      ? "Choose the best CV and write a cover letter before submitting."
      : "Change your CV or cover letter while the application is still applied.";
  const submitText = mode === "apply" ? "Submit Application" : "Save Changes";

  const handleUploadNewCv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF and DOCX files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      return;
    }

    try {
      setIsUploadingCv(true);

      const uploadedCv = await uploadCv(file);

      setCvs((currentCvs) => [
        uploadedCv,
        ...currentCvs.map((cv) => ({
          ...cv,
          isDefault: false,
        })),
      ]);

      setCvAnalysisId(uploadedCv.id);
      setIsCvDropdownOpen(false);

      toast.success("CV uploaded. It is now selected for this application.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "CV upload failed");
    } finally {
      setIsUploadingCv(false);
      e.target.value = "";
    }
  };

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

    await onSubmit({
      cvAnalysisId,
      coverLetter: coverLetter.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isSubmitting ? undefined : onClose}
      />

      <input
        ref={uploadInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleUploadNewCv}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[20px] bg-white shadow-xl">
        <div className="shrink-0 border-b border-gray-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500">{description}</p>
            </div>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_390px]">
            <div className="space-y-6 p-6">
              <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                <div className="flex items-center gap-3">
                  <CompanyLogo company={job.company} size="sm" />

                  <div>
                    <div className="font-semibold text-gray-900">
                      {job.title || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {job.company?.name || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-gray-900">
                  Select CV
                </label>
                <p className="mb-3 text-sm text-gray-500">
                  Choose a CV to use for this application.
                </p>

                <button
                  type="button"
                  onClick={() => setIsCvDropdownOpen((value) => !value)}
                  disabled={isSubmitting || isLoadingCvs}
                  className="flex w-full items-center justify-between rounded-xl border-2 border-purple-500 bg-white px-4 py-3 text-left text-sm shadow-sm disabled:opacity-60"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-purple-600" />
                    <span className="truncate font-medium text-gray-900">
                      {isLoadingCvs
                        ? "Loading CVs..."
                        : selectedCv?.fileName || "Select a CV"}
                    </span>
                  </span>

                  <span className="flex items-center gap-3">
                    {selectedCv?.isDefault && (
                      <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
                        Default
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </span>
                </button>

                {isCvDropdownOpen && (
                  <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                    <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                      {cvs.map((cv) => {
                        const isSelected = cv.id === cvAnalysisId;

                        return (
                          <button
                            key={cv.id}
                            type="button"
                            onClick={() => {
                              setCvAnalysisId(cv.id);
                              setIsCvDropdownOpen(false);
                              if (error) setError("");
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                              isSelected
                                ? "bg-purple-50 ring-1 ring-purple-200"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                isSelected
                                  ? "border-purple-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
                              )}
                            </span>

                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                              <FileText className="h-5 w-5 text-purple-600" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-medium text-gray-900">
                                {cv.fileName}
                              </span>
                              <span className="block text-xs text-gray-500">
                                Uploaded CV
                              </span>
                            </span>

                            {cv.isDefault && (
                              <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
                                Default
                              </span>
                            )}

                            {isSelected && (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => uploadInputRef.current?.click()}
                      disabled={isUploadingCv}
                      className="mt-3 flex w-full items-center gap-3 rounded-xl border border-dashed border-purple-300 bg-purple-50/50 px-4 py-4 text-left transition-colors hover:bg-purple-50 disabled:opacity-60"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                        <UploadCloud className="h-5 w-5 text-purple-600" />
                      </span>

                      <span>
                        <span className="block font-semibold text-purple-700">
                          {isUploadingCv ? "Uploading CV..." : "Upload New CV"}
                        </span>
                        <span className="text-sm text-gray-500">
                          PDF or DOCX up to 5MB. New CV becomes default.
                        </span>
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-gray-900">
                  Cover Letter
                </label>
                <p className="mb-3 text-sm text-gray-500">
                  Write a cover letter for this application.
                </p>

                <textarea
                  className={`min-h-[260px] w-full rounded-xl border p-4 text-sm outline-none focus:ring-2 ${
                    error
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-200 focus:ring-purple-600"
                  }`}
                  placeholder="Write your cover letter..."
                  value={coverLetter}
                  disabled={isSubmitting}
                  maxLength={2000}
                  onChange={(e) => {
                    setCoverLetter(e.target.value);
                    if (error) setError("");
                  }}
                />

                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-red-500">{error}</span>
                  <span className="text-gray-400">
                    {coverLetter.length} / 2000
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-[#F3F4F6] p-6 lg:border-l lg:border-t-0">
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
                <div className="space-y-4">
                  <div className="rounded-xl bg-white p-5 text-center shadow-sm">
                    <ScoreRing score={preview.matchScore} />

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

                    <p className="mt-2 break-words text-sm text-gray-600">
                      {preview.fileName}
                    </p>
                  </div>

                  <MatchBreakdown preview={preview} />

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Matched Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {preview.matchedSkills.length > 0 ? (
                        preview.matchedSkills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} type="matched" />
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No matched skills found.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {preview.missingSkills.length > 0 ? (
                        preview.missingSkills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} type="missing" />
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No missing skills. This CV matches well.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Suggestions
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                      {preview.suggestions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
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

          <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : submitText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}