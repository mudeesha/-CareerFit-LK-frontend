import { apiGet, apiPatch, apiPost } from "./apiClient";
import type { Application } from "../lib/types";

export interface CreateApplicationPayload {
  jobId: string;
  coverLetter: string;
}

export async function createApplication(payload: CreateApplicationPayload) {
  return apiPost<Application>("/applications", payload);
}

export async function getMyApplications() {
  return apiGet<{
    items: Application[];
    count: number;
  }>("/applications/me");
}

export async function withdrawApplication(applicationId: string) {
  return apiPatch<Application>(`/applications/${applicationId}/withdraw`);
}