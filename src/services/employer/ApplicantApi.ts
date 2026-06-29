import { apiGet, apiPatch } from "../apiClient";
import type { Application } from "../../lib/types";

export type EmployerApplicantsResponse = {
  items: Application[];
  count: number;
};

export async function getApplicantsByJob(jobId: string) {
  return apiGet<EmployerApplicantsResponse>(
    `/employer/applicant/jobs/${jobId}/applicants`
  );
}

export async function markApplicationViewed(applicationId: string) {
  return apiPatch<Application>(
    `/employer/applicant/applications/${applicationId}/viewed`,
    {}
  );
}

export async function shortlistApplication(applicationId: string) {
  return apiPatch<Application>(
    `/employer/applicant/applications/${applicationId}/shortlist`,
    {}
  );
}

export async function rejectApplication(applicationId: string) {
  return apiPatch<Application>(
    `/employer/applicant/applications/${applicationId}/reject`,
    {}
  );
}

export async function hireApplication(applicationId: string) {
  return apiPatch<Application>(
    `/employer/applicant/applications/${applicationId}/hire`,
    {}
  );
}