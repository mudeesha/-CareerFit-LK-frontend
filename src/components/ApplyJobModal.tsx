import React, { useState } from "react";
import { X } from "lucide-react";
import { Job } from "../lib/types";
import { CompanyLogo } from "./CompanyLogo";

interface ApplyJobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (coverLetter: string) => Promise<void> | void;
  matchScore: number;
  isSubmitting?: boolean;
  candidateName?: string;
  cvFileName?: string;
  cvUploadedAt?: string;
}

function formatDate(value?: string) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ApplyJobModal({
  job,
  isOpen,
  onClose,
  onSubmit,
  matchScore,
  isSubmitting = false,
  candidateName = "Candidate",
  cvFileName = "No CV uploaded",
  cvUploadedAt,
}: ApplyJobModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const hasCv = cvFileName !== "No CV uploaded";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasCv) {
      setError("Please upload a CV before applying.");
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

    await onSubmit(coverLetter.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isSubmitting ? undefined : onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Apply for Job</h2>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="bg-[#F3F4F6] rounded-xl p-4 flex items-center gap-4 mb-6 border border-gray-200">
            <CompanyLogo company={job.company} size="md" />

            <div>
              <h3 className="font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company?.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div>
              <div className="text-sm text-purple-900 font-medium">
                Applying as
              </div>
              <div className="text-purple-700">{candidateName}</div>
            </div>

            <div className="text-right">
              <div className="text-sm text-purple-900 font-medium">
                Match Score
              </div>
              <div className="text-purple-700 font-bold">{matchScore}%</div>
            </div>
          </div>

          <form id="apply-form" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected CV
              </label>

              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                </svg>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {cvFileName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hasCv ? `Uploaded ${formatDate(cvUploadedAt)}` : "Upload a CV first"}
                  </div>
                </div>

                <button
                  type="button"
                  className="text-sm text-purple-600 font-medium"
                  disabled={isSubmitting}
                  onClick={() => {
                    window.location.href = "/candidate/cv";
                  }}
                >
                  {hasCv ? "Change" : "Upload"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter
              </label>

              <textarea
                className={`w-full border ${
                  error
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-200 focus:ring-purple-600"
                } rounded-lg p-3 text-sm focus:outline-none focus:ring-2`}
                rows={5}
                placeholder="Write a short message to the employer..."
                value={coverLetter}
                disabled={isSubmitting}
                onChange={(e) => {
                  setCoverLetter(e.target.value);
                  if (error) setError("");
                }}
              />

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="apply-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}