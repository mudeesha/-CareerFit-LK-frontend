import type { ExperienceLevel, JobType, WorkMode } from "../lib/types";

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

export const EXPERIENCE_LEVEL_OPTIONS: SelectOption<ExperienceLevel>[] = [
  { label: "Entry Level", value: "ENTRY_LEVEL" },
  { label: "1-2 Years", value: "ONE_TO_TWO_YEARS" },
  { label: "3-5 Years", value: "THREE_TO_FIVE_YEARS" },
  { label: "5+ Years", value: "FIVE_PLUS_YEARS" },
];

export const LOCATION_OPTIONS: SelectOption[] = [
  { label: "Ampara", value: "Ampara" },
  { label: "Anuradhapura", value: "Anuradhapura" },
  { label: "Badulla", value: "Badulla" },
  { label: "Batticaloa", value: "Batticaloa" },
  { label: "Colombo", value: "Colombo" },
  { label: "Galle", value: "Galle" },
  { label: "Gampaha", value: "Gampaha" },
  { label: "Hambantota", value: "Hambantota" },
  { label: "Jaffna", value: "Jaffna" },
  { label: "Kalutara", value: "Kalutara" },
  { label: "Kandy", value: "Kandy" },
  { label: "Kegalle", value: "Kegalle" },
  { label: "Kilinochchi", value: "Kilinochchi" },
  { label: "Kurunegala", value: "Kurunegala" },
  { label: "Mannar", value: "Mannar" },
  { label: "Matale", value: "Matale" },
  { label: "Matara", value: "Matara" },
  { label: "Monaragala", value: "Monaragala" },
  { label: "Mullaitivu", value: "Mullaitivu" },
  { label: "Nuwara Eliya", value: "Nuwara Eliya" },
  { label: "Polonnaruwa", value: "Polonnaruwa" },
  { label: "Puttalam", value: "Puttalam" },
  { label: "Ratnapura", value: "Ratnapura" },
  { label: "Trincomalee", value: "Trincomalee" },
  { label: "Vavuniya", value: "Vavuniya" },
];

export const WORK_MODE_OPTIONS: SelectOption<WorkMode>[] = [
  { label: "On-site", value: "ONSITE" },
  { label: "Hybrid", value: "HYBRID" },
  { label: "Remote", value: "REMOTE" },
];

export const JOB_TYPE_OPTIONS: SelectOption<JobType>[] = [
  { label: "Full-time", value: "FULL_TIME" },
  { label: "Part-time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERNSHIP" },
];