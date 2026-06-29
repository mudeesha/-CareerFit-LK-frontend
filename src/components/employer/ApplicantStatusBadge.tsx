import type { ApplicationStatus } from "../../lib/types";

type ApplicantStatusBadgeProps = {
  status: ApplicationStatus | string;
};

export function ApplicantStatusBadge({ status }: ApplicantStatusBadgeProps) {
  const normalizedStatus = status || "APPLIED";

  const className =
    normalizedStatus === "SHORTLISTED"
      ? "bg-green-100 text-green-700"
      : normalizedStatus === "INTERVIEW_SCHEDULED"
        ? "bg-blue-100 text-blue-700"
        : normalizedStatus === "REJECTED"
          ? "bg-red-100 text-red-700"
          : normalizedStatus === "HIRED"
            ? "bg-purple-100 text-purple-700"
            : "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${className}`}>
      {normalizedStatus.replace("_", " ")}
    </span>
  );
}