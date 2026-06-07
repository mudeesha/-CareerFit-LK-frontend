import type { Company } from "../lib/types";
import { apiGet } from "./apiClient";

interface GetCompaniesResponse {
  items: Company[];
  count: number;
}

export async function getCompanies() {
  return apiGet<GetCompaniesResponse>("/companies");
}