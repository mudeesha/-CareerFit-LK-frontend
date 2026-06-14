export type WorkMode = "ONSITE" | "HYBRID" | "REMOTE";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP";

export type ExperienceLevel =
  | "ENTRY_LEVEL"
  | "ONE_TO_TWO_YEARS"
  | "THREE_TO_FIVE_YEARS"
  | "FIVE_PLUS_YEARS";

export type JobStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "CLOSED"
  | "REJECTED";

export type ApplicationStatus =
'APPLIED' |
'VIEWED' |
'SHORTLISTED' |
'INTERVIEW_SCHEDULED' |
'REJECTED' |
'HIRED' |
'WITHDRAWN';
export type EmployerStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface Company {
  id: string;
  name: string;
  logoText: string;
  logoType: 'text' | 'initials';
  logoColor: string;
  industry: string;
  location: string;
  openJobs: number;
  description?: string;
  website?: string;
  size?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  categoryId?: string;
  company?: Company;
  category?: Category;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: ExperienceLevel;
  skills: string[];
  preferredSkills?: string[];
  description?: string;
  responsibilities?: string[];
  benefits?: string[];
  status: JobStatus;
  isFeatured?: boolean;
  applicantCount: number;
  postedDate?: string;
  matchScore?: number;
}

export interface Category {
  id: string;
  name: string;
  jobCount: number;
  iconName: string;
  description?: string;
  topSkills?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  currentRole: string;
  experienceYears: number;
  expectedSalary: number;
  skills: string[];
  profileCompletion: number;
  avatarUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  candidateId: string;
  candidate?: Candidate;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt?: string;
  withdrawnAt?: string | null;
  matchScore: number;
}

export interface MatchBreakdown {
  skills: number;
  experience: number;
  location: number;
  salary: number;
}

export interface MatchResult {
  overallScore: number;
  label: 'Great Match' | 'Good Match' | 'Low Match';
  readiness: 'Ready to Apply' | 'Improve CV First' | 'Not Recommended Yet';
  breakdown: MatchBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  learningPath: string[];
}