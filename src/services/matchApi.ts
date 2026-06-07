import type { MatchResult } from "../lib/types";
import { apiGet } from "./apiClient";

interface BackendMatchResult {
  jobId: string;
  candidateId: string;
  overallScore: number;
  matchLabel: "Strong Match" | "Good Match" | "Low Match";
  applyReadiness:
    | "READY_TO_APPLY"
    | "IMPROVE_CV_FIRST"
    | "NOT_RECOMMENDED_YET";
  breakdown: {
    skills: number;
    experience: number;
    location: number;
    salary: number;
    language: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  learningPath: string[];
}

function mapMatchLabel(label: BackendMatchResult["matchLabel"]): MatchResult["label"] {
  if (label === "Strong Match") return "Great Match";
  if (label === "Good Match") return "Good Match";
  return "Low Match";
}

function mapReadiness(
  readiness: BackendMatchResult["applyReadiness"]
): MatchResult["readiness"] {
  if (readiness === "READY_TO_APPLY") return "Ready to Apply";
  if (readiness === "IMPROVE_CV_FIRST") return "Improve CV First";
  return "Not Recommended Yet";
}

function mapMatchResult(data: BackendMatchResult): MatchResult {
  return {
    overallScore: data.overallScore,
    label: mapMatchLabel(data.matchLabel),
    readiness: mapReadiness(data.applyReadiness),
    breakdown: {
      skills: data.breakdown.skills,
      experience: data.breakdown.experience,
      location: data.breakdown.location,
      salary: data.breakdown.salary,
    },
    matchedSkills: data.matchedSkills,
    missingSkills: data.missingSkills,
    suggestions: data.suggestions,
    learningPath: data.learningPath,
  };
}

export async function getJobMatch(jobId: string): Promise<MatchResult> {
  const data = await apiGet<BackendMatchResult>(`/jobs/${jobId}/match`);

  return mapMatchResult(data);
}