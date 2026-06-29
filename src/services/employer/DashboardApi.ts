import { apiGet } from "../apiClient";
import type { Job } from "../../lib/types";

export type EmployerDashboardStats = {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  shortlisted: number;
  pendingReviews: number;
};

export type EmployerDashboardTrendItem = {
  name: string;
  value: number;
};

export type EmployerDashboardApplicant = {
  id: string;
  candidateName: string;
  jobTitle: string;
  status: string;
  matchScore?: number | null;
  appliedAt: string;
};

export type EmployerDashboardResponse = {
  stats: EmployerDashboardStats;
  applicationsTrend: EmployerDashboardTrendItem[];
  recentApplicants: EmployerDashboardApplicant[];
  activeJobs: Job[];
};

export async function getEmployerDashboard() {
  return apiGet<EmployerDashboardResponse>("/employer/dashboard");
}