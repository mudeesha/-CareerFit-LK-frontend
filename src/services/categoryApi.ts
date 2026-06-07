import type { Category } from "../lib/types";
import { apiGet } from "./apiClient";

interface GetCategoriesResponse {
  items: Category[];
  count: number;
}

export async function getCategories() {
  return apiGet<GetCategoriesResponse>("/categories");
}