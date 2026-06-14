import {
  AUTH_USER_STORAGE_KEY,
  apiGet,
  apiPost,
  clearAuthToken,
  setAuthToken,
} from "./apiClient";

export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";
export type UserStatus = "ACTIVE" | "DISABLED";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: "CANDIDATE" | "EMPLOYER";
  fullName: string;
  phone?: string;
  district?: string;
  position?: string;
}

export function getStoredAuthUser(): AuthUser | null {
  const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    return null;
  }
}

export function persistAuthSession(auth: AuthResponse) {
  setAuthToken(auth.token);
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(auth.user));
}

export function clearAuthSession() {
  clearAuthToken();
}

export function getDashboardPathByRole(role: UserRole) {
  if (role === "CANDIDATE") return "/candidate/dashboard";
  if (role === "EMPLOYER") return "/employer/dashboard";
  return "/admin/dashboard";
}

export async function login(payload: LoginPayload) {
  const auth = await apiPost<AuthResponse>("/auth/login", payload);
  persistAuthSession(auth);

  return auth;
}

export async function register(payload: RegisterPayload) {
  const auth = await apiPost<AuthResponse>("/auth/register", payload);
  persistAuthSession(auth);

  return auth;
}

export async function getMe() {
  const user = await apiGet<AuthUser>("/auth/me");
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));

  return user;
}

export function logout() {
  clearAuthSession();
}