import { apiGet, apiPatch, apiPost } from "./apiClient";
import type { Application } from "../lib/types";

export interface CreateApplicationPayload {
  jobId: string;
  cvAnalysisId: string;
  coverLetter: string;
}

export interface UpdateApplicationPayload {
  cvAnalysisId: string;
  coverLetter: string;
}

export interface PreviewJobApplicationPayload {
  jobId: string;
  cvAnalysisId: string;
}

export interface ApplicationPreview {
  applicationId?: string;
  jobId: string;
  cvAnalysisId: string;
  fileName: string;
  matchScore: number;
  breakdown: {
    skills: number;
    experience: number;
    location: number;
    salary: number;
    language: number;
  };
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

export async function previewJobApplication(
  payload: PreviewJobApplicationPayload
) {
  return apiPost<ApplicationPreview>("/applications/preview", payload);
}

export async function withdrawApplication(applicationId: string) {
  return apiPatch<Application>(`/applications/${applicationId}/withdraw`);
}