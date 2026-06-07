import { API_FILE_BASE_URL, apiGet, apiUpload } from "./apiClient";

export const CV_FILE_BASE_URL = API_FILE_BASE_URL;

export interface CvAnalysis {
  id: string;
  candidateId: string;
  fileName: string;
  fileUrl?: string;
  strengthScore: number;
  extractedSkills?: string[];
  missingSkills?: string[];
  experienceYears?: number;
  education?: string[];
  languages?: string[];
  suggestions?: string[];
  createdAt: string;
}

export async function getLatestCvAnalysis() {
  return apiGet<CvAnalysis>("/cv/analysis/me");
}

export async function getMyCvAnalyses() {
  return apiGet<{
    items: CvAnalysis[];
    count: number;
  }>("/cv/analyses/me");
}

export async function uploadCv(file: File) {
  const formData = new FormData();
  formData.append("cv", file);

  return apiUpload<CvAnalysis>("/cv/upload", formData);
}