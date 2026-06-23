import { API_FILE_BASE_URL, apiGet, apiPatch, apiUpload } from "./apiClient";

export const CV_FILE_BASE_URL = API_FILE_BASE_URL;

export interface CvAnalysis {
  id: string;
  candidateId: string;
  fileName: string;
  fileUrl?: string | null;
  isDefault: boolean;
  extractedSkills?: string[];
  experienceYears?: number;
  education?: string[];
  languages?: string[];
  createdAt: string;
}

export async function getDefaultCvAnalysis() {
  return apiGet<CvAnalysis>("/cv/analysis/me");
}

export async function getMyCvAnalyses() {
  return apiGet<{
    items: CvAnalysis[];
    count: number;
  }>("/cv/analyses/me");
}

export async function setDefaultCvAnalysis(cvAnalysisId: string) {
  return apiPatch<CvAnalysis>(`/cv/analyses/${cvAnalysisId}/default`);
}

export async function uploadCv(file: File) {
  const formData = new FormData();
  formData.append("cv", file);

  return apiUpload<CvAnalysis>("/cv/upload", formData);
}