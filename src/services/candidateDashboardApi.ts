import { apiGet } from "./apiClient";
import type { Application, Job } from "../lib/types";
import type { CvAnalysis } from "./cvApi";

export interface CandidateDashboardProfile {
  id: string;
  fullName: string;
  email: string;
  currentRole: string | null;
  district: string | null;
  experienceYears: number;
  expectedSalary: number | null;
  skills: string[] | null;
  profileCompletion: number;
}

export interface CandidateDashboardStats {
  profileCompletion: number;
  cvReadiness: number;
  applications: number;
  shortlisted: number;
  savedJobs: number;
}

export interface CandidateSkillGapInsight {
  skill: string;
  demand: "High demand" | "Medium demand" | "Low demand";
  match: number;
}

export interface CandidateDashboardResponse {
  profile: CandidateDashboardProfile;
  stats: CandidateDashboardStats;
  recommendedJobs: Job[];
  recentApplications: Application[];
  skillGapInsights: CandidateSkillGapInsight[];
  latestCvAnalysis: CvAnalysis | null;
}

export async function getCandidateDashboard() {
  return apiGet<CandidateDashboardResponse>("/candidate/dashboard");
}