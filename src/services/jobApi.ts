import type { Job } from "../lib/types";
import { apiGet } from "./apiClient";

export interface GetJobsParams {
  keyword?: string;
  category?: string;
  company?: string;
  location?: string;
  workMode?: string;
  jobType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
}

interface GetJobsApiData {
  items: Job[];
  count: number;
}

export async function getJobs(params: GetJobsParams = {}) {
  return apiGet<GetJobsApiData>("/jobs", params);
}

export async function getJobById(id: string): Promise<Job> {
  return apiGet<Job>(`/jobs/${id}`);
}