export type JobStatus =
'PENDING_APPROVAL' |
'ACTIVE' |
'CLOSED' |
'REJECTED' |
'DRAFT';
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
  company?: Company;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  preferredSkills?: string[];
  category: string;
  experienceLevel: string;
  postedDate: string;
  closingDate?: string;
  matchScore?: number;
  status: JobStatus;
  applicantCount: number;
  description?: string;
  responsibilities?: string[];
  benefits?: string[];
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
  appliedDate: string;
  matchScore: number;
  lastUpdated: string;
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