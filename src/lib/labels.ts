import type { ExperienceLevel, JobType, WorkMode } from "./types";

export function workModeLabel(value: WorkMode) {
  const labels: Record<WorkMode, string> = {
    ONSITE: "On-site",
    HYBRID: "Hybrid",
    REMOTE: "Remote",
  };

  return labels[value];
}

export function jobTypeLabel(value: JobType) {
  const labels: Record<JobType, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
  };

  return labels[value];
}

export function experienceLevelLabel(value: ExperienceLevel) {
  const labels: Record<ExperienceLevel, string> = {
    ENTRY_LEVEL: "Entry Level",
    ONE_TO_TWO_YEARS: "1–2 Years",
    THREE_TO_FIVE_YEARS: "3–5 Years",
    FIVE_PLUS_YEARS: "5+ Years",
  };

  return labels[value];
}