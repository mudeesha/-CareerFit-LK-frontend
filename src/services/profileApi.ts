import { apiGet, apiPatch, apiUpload } from "./apiClient";

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

export interface ProfileEnvelope {
  profileType: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  profile: CandidateProfileResponse | null;
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

function unwrapCandidateProfile(data: ProfileEnvelope) {
  if (data.profileType !== "CANDIDATE" || !data.profile) {
    throw new Error("Candidate profile not found");
  }

  return data.profile;
}

export async function getMyProfile() {
  const data = await apiGet<ProfileEnvelope>("/profile/me");

  return unwrapCandidateProfile(data);
}

export async function updateMyProfile(payload: UpdateProfilePayload) {
  const data = await apiPatch<ProfileEnvelope>("/profile/me", payload);

  return unwrapCandidateProfile(data);
}

export async function uploadProfileAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  const data = await apiUpload<ProfileEnvelope>("/profile/me/avatar", formData);

  return unwrapCandidateProfile(data);
}