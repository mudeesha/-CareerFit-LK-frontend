import { apiGet, apiPatch } from "./apiClient";

export interface CandidateProfileResponse {
  id: string;
  userId: string;
  fullName: string;
  phone?: string | null;
  district?: string | null;
  currentRole?: string | null;
  preferredLocations?: string[] | null;
  expectedSalary?: number | null;
  experienceYears: number;
  skills?: string[] | null;
  languages?: string[] | null;
  education?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  profileImageUrl?: string | null;
  profileCompletion: number;
  user?: {
    id: string;
    email: string;
    role: string;
    status: string;
  };
}

export interface UpdateProfilePayload {
  fullName?: string;
  phone?: string;
  district?: string;
  currentRole?: string;
  preferredLocations?: string[];
  expectedSalary?: number;
  experienceYears?: number;
  skills?: string[];
  languages?: string[];
  education?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  profileImageUrl?: string;
}

export async function getMyProfile() {
  return apiGet<CandidateProfileResponse>("/profile/me");
}

export async function updateMyProfile(payload: UpdateProfilePayload) {
  return apiPatch<CandidateProfileResponse>("/profile/me", payload);
}