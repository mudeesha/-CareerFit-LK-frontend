import { apiGet, apiPatch, apiPost } from "../apiClient";
import type { Company } from "../../lib/types";

export type EmployerCompany = Company & {
  status?: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  contactEmail?: string | null;
  phone?: string | null;
  jobs?: unknown[];
  employers?: unknown[];
};

export type EmployerCompanyPayload = {
  name: string;
  logoText: string;
  logoType: string;
  logoColor: string;
  industry: string;
  location: string;
  size?: string;
  website?: string;
  description?: string;
  contactEmail?: string;
  phone?: string;
};

export async function getEmployerCompany() {
  return apiGet<EmployerCompany>("/employer/company");
}

export async function createEmployerCompany(payload: EmployerCompanyPayload) {
  return apiPost<EmployerCompany>("/employer/company", payload);
}

export async function updateEmployerCompany(
  payload: Partial<EmployerCompanyPayload>
) {
  return apiPatch<EmployerCompany>("/employer/company", payload);
}