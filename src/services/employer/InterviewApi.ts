import { apiPost, apiPatch } from "../apiClient";
import type { Application } from "../../lib/types";

export type InterviewType = "ONLINE" | "ONSITE" | "PHONE";

export type ScheduleInterviewPayload = {
  interviewDate: string;
  interviewTime: string;
  interviewType: InterviewType;
  locationOrLink?: string;
  notes?: string;
};

export type UpdateInterviewPayload = Partial<ScheduleInterviewPayload>;

export async function scheduleInterview(
  applicationId: string,
  payload: ScheduleInterviewPayload
) {
  return apiPost<Application>(
    `/employer/interview/applications/${applicationId}/interview`,
    payload
  );
}

export async function updateInterview(
  interviewId: string,
  payload: UpdateInterviewPayload
) {
  return apiPatch<Application>(`/employer/interview/interviews/${interviewId}`, payload);
}

export async function cancelInterview(interviewId: string) {
  return apiPatch<Application>(
    `/employer/interview/interviews/${interviewId}/cancel`,
    {}
  );
}