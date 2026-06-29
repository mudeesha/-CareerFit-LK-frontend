import { FileText, BrainCircuit, CheckCircle, XCircle, Calendar } from "lucide-react";
import type { ApplicationStatus } from "../../lib/types";
import { ApplicantStatusBadge } from "./ApplicantStatusBadge";
import { ApplicantSkillTags } from "./ApplicantSkillTags";

export type EmployerApplicantView = {
  id: string;
  status: ApplicationStatus | string;
  matchScore?: number | null;
  appliedAt?: string | null;
  candidateName: string;
  candidateLocation?: string | null;
  experienceYears?: number | null;
  expectedSalary?: number | null;
  skills?: string[] | null;
};

type ApplicantCardProps = {
  applicant: EmployerApplicantView;
  onViewCv: () => void;
  onViewMatch: () => void;
  onShortlist: () => void;
  onReject: () => void;
  onScheduleInterview: () => void;
};

export function ApplicantCard({
  applicant,
  onViewCv,
  onViewMatch,
  onShortlist,
  onReject,
  onScheduleInterview,
}: ApplicantCardProps) {
  const canShortlistOrReject = applicant.status === "APPLIED";
  const canScheduleInterview =
    applicant.status === "SHORTLISTED" ||
    applicant.status === "INTERVIEW_SCHEDULED";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col lg:flex-row gap-6">
      <div className="flex items-start gap-4 flex-1">
        <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full shrink-0 flex items-center justify-center font-bold text-lg">
          {applicant.candidateName
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-bold text-gray-900">
              {applicant.candidateName}
            </h3>
            <ApplicantStatusBadge status={applicant.status} />
          </div>

          <div className="text-sm text-gray-600 mb-3">
            {applicant.candidateLocation || "Location not provided"} •{" "}
            {applicant.experienceYears ?? 0}+ years exp
            {applicant.expectedSalary
              ? ` • LKR ${applicant.expectedSalary.toLocaleString()}`
              : ""}
          </div>

          <ApplicantSkillTags skills={applicant.skills} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 border-y lg:border-y-0 lg:border-x border-gray-100 py-4 lg:py-0 shrink-0">
        <div className="text-3xl font-bold text-green-600 mb-1">
          {applicant.matchScore ?? 0}%
        </div>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Match Score
        </div>
      </div>

      <div className="flex flex-col gap-2 shrink-0 lg:w-48">
        <div className="flex gap-2">
          <button
            onClick={onViewCv}
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" /> CV
          </button>

          <button
            onClick={onViewMatch}
            className="flex-1 bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <BrainCircuit className="w-4 h-4" /> Match
          </button>
        </div>

        {canShortlistOrReject && (
          <div className="flex gap-2">
            <button
              onClick={onShortlist}
              className="flex-1 bg-white border border-green-200 text-green-600 hover:bg-green-50 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4" /> Shortlist
            </button>

            <button
              onClick={onReject}
              className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        )}

        {canScheduleInterview && (
          <button
            onClick={onScheduleInterview}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {applicant.status === "INTERVIEW_SCHEDULED"
              ? "Reschedule"
              : "Schedule Interview"}
          </button>
        )}
      </div>
    </div>
  );
}