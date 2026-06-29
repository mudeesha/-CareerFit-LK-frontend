import { apiDelete, apiGet, apiPatch, apiPost } from "../apiClient";
import type {
  ExperienceLevel,
  Job,
  JobStatus,
  JobType,
  WorkMode,
} from "../../lib/types";

export type EmployerJobPayload = {
  title: string;
  categoryId: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  preferredSkills?: string[];
  description?: string;
  responsibilities?: string[];
  benefits?: string[];
  status?: Extract<JobStatus, "DRAFT" | "PENDING_APPROVAL">;
};

export type EmployerJobsResponse = {
  items: Job[];
  count: number;
};

export async function getEmployerJobs() {
  return apiGet<EmployerJobsResponse>("/employer/jobs");
}

export async function getEmployerJob(id: string) {
  return apiGet<Job>(`/employer/jobs/${id}`);
}

export async function createEmployerJob(payload: EmployerJobPayload) {
  return apiPost<Job>("/employer/jobs", payload);
}

export async function updateEmployerJob(
  id: string,
  payload: Partial<EmployerJobPayload>
) {
  return apiPatch<Job>(`/employer/jobs/${id}`, payload);
}

export async function closeEmployerJob(id: string) {
  return apiPatch<Job>(`/employer/jobs/${id}/close`, {});
}

export async function deleteEmployerJob(id: string) {
  return apiDelete<Job>(`/employer/jobs/${id}`);
}