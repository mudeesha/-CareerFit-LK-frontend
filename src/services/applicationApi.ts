import { apiGet, apiPatch, apiPost } from "./apiClient";
import type { Application } from "../lib/types";

export interface CreateApplicationPayload {
  jobId: string;
  coverLetter: string;
}

export interface UpdateApplicationPayload {
  cvAnalysisId: string;
  coverLetter: string;
}

export interface PreviewApplicationPayload {
  cvAnalysisId: string;
}

export interface ApplicationPreview {
  applicationId: string;
  jobId: string;
  cvAnalysisId: string;
  fileName: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  learningPath: string[];
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

export async function updateApplication(
  applicationId: string,
  payload: UpdateApplicationPayload
) {
  return apiPatch<Application>(`/applications/${applicationId}`, payload);
}

export async function previewApplication(
  applicationId: string,
  payload: PreviewApplicationPayload
) {
  return apiPost<ApplicationPreview>(
    `/applications/${applicationId}/preview`,
    payload
  );
}

export async function withdrawApplication(applicationId: string) {
  return apiPatch<Application>(`/applications/${applicationId}/withdraw`);
}