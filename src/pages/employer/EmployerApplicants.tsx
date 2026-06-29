import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { toast } from "sonner";
import type { Application, Job } from "../../lib/types";
import { getEmployerJob } from "../../services/employer/JobApi";
import { CV_FILE_BASE_URL } from "../../services/cvApi";
import {
  getApplicantsByJob,
  markApplicationViewed,
  rejectApplication,
  shortlistApplication,
} from "../../services/employer/ApplicantApi";
import {
  ApplicantCard,
  type EmployerApplicantView,
} from "../../components/employer/ApplicantCard";
import {
  CandidateCVModal,
  type CandidateCVModalData,
} from "../../components/CandidateCVModal";
import {
  MatchDetailsModal,
  type MatchDetailsModalData,
} from "../../components/MatchDetailsModal";

type ModalState = "none" | "cv" | "match";

type EmployerApplication = Application & {
  candidate?: any;
  cvAnalysis?: any;
  job?: Job;
  coverLetter?: string | null;
  appliedAt?: string | null;
  matchScore?: number | null;
  matchDetails?: MatchDetailsModalData & {
    suggestions?: string[];
    learningPath?: string[];
  };
};

type StatusFilter =
  | "ALL"
  | "APPLIED"
  | "VIEWED"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "REJECTED"
  | "HIRED";

type SortOption = "MATCH_SCORE" | "NEWEST";

function getCandidateName(application: EmployerApplication) {
  return (
    application.candidate?.name ||
    application.candidate?.fullName ||
    application.candidate?.user?.fullName ||
    application.candidate?.user?.name ||
    application.candidate?.user?.email ||
    "Unknown Candidate"
  );
}

function mapApplicationToView(
  application: EmployerApplication
): EmployerApplicantView {
  const candidate = application.candidate || {};
  const cvAnalysis = application.cvAnalysis || {};

  return {
    id: application.id,
    status: application.status || "APPLIED",
    matchScore:
      application.matchDetails?.overallScore ?? application.matchScore ?? 0,
    appliedAt: application.appliedAt,
    candidateName: getCandidateName(application),
    candidateLocation: candidate.location || candidate.district || null,
    experienceYears:
      cvAnalysis.experienceYears ?? candidate.experienceYears ?? null,
    expectedSalary: candidate.expectedSalary ?? null,
    skills: cvAnalysis.extractedSkills || candidate.skills || [],
  };
}

function buildCvModalData(application: EmployerApplication): CandidateCVModalData {
  const candidate = application.candidate || {};
  const cvAnalysis = application.cvAnalysis || {};

  return {
    candidateName: getCandidateName(application),
    candidateEmail: candidate.user?.email || candidate.email || null,
    candidateLocation: candidate.location || candidate.district || null,
    currentRole: candidate.currentRole || null,
    expectedSalary: candidate.expectedSalary ?? null,
    coverLetter: application.coverLetter || null,
    cvFileUrl: cvAnalysis.fileUrl
      ? `${CV_FILE_BASE_URL}${cvAnalysis.fileUrl}`
      : null,
    cvFileName: cvAnalysis.fileName || null,
    skills: cvAnalysis.extractedSkills || candidate.skills || [],
    experienceYears:
      cvAnalysis.experienceYears ?? candidate.experienceYears ?? null,
    education: cvAnalysis.education || null,
    languages: cvAnalysis.languages || [],
  };
}

function buildMatchModalData(
  application: EmployerApplication
): MatchDetailsModalData {
  const matchDetails = application.matchDetails;

  return {
    overallScore: matchDetails?.overallScore ?? application.matchScore ?? 0,
    breakdown: {
      skills: matchDetails?.breakdown?.skills ?? 0,
      experience: matchDetails?.breakdown?.experience ?? 0,
      location: matchDetails?.breakdown?.location ?? 0,
      salary: matchDetails?.breakdown?.salary ?? 0,
    },
    matchedSkills: matchDetails?.matchedSkills || [],
    missingSkills: matchDetails?.missingSkills || [],
    recommendation:
      matchDetails?.recommendation ||
      matchDetails?.suggestions?.join(" ") ||
      undefined,
    interviewQuestions: matchDetails?.interviewQuestions || [],
  };
}

export function EmployerApplicants() {
  const { jobId } = useParams<{ jobId: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<EmployerApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<EmployerApplication | null>(null);

  const [modalState, setModalState] = useState<ModalState>("none");
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("MATCH_SCORE");

  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadApplicants() {
    if (!jobId) return;

    try {
      setIsLoading(true);
      setError("");

      const [jobData, applicantsData] = await Promise.all([
        getEmployerJob(jobId),
        getApplicantsByJob(jobId),
      ]);

      setJob(jobData);
      setApplications(applicantsData.items as EmployerApplication[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load applicants");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const filteredApplications = useMemo(() => {
    const keywordValue = keyword.trim().toLowerCase();

    return applications
      .filter((application) => {
        const view = mapApplicationToView(application);

        const matchesKeyword =
          !keywordValue ||
          [
            view.candidateName,
            view.candidateLocation,
            view.status,
            ...(view.skills || []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(keywordValue);

        const matchesStatus =
          statusFilter === "ALL" || application.status === statusFilter;

        return matchesKeyword && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOption === "NEWEST") {
          return (
            new Date(b.appliedAt || 0).getTime() -
            new Date(a.appliedAt || 0).getTime()
          );
        }

        return (
          (b.matchDetails?.overallScore ?? b.matchScore ?? 0) -
          (a.matchDetails?.overallScore ?? a.matchScore ?? 0)
        );
      });
  }, [applications, keyword, statusFilter, sortOption]);

  const updateApplicationInList = (updatedApplication: Application) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? (updatedApplication as EmployerApplication)
          : application
      )
    );
  };

  const handleViewCv = async (application: EmployerApplication) => {
    try {
      let applicationForModal = application;

      if (application.status === "APPLIED") {
        const updatedApplication = await markApplicationViewed(application.id);
        updateApplicationInList(updatedApplication);
        applicationForModal = updatedApplication as EmployerApplication;
      }

      setSelectedApplication(applicationForModal);
      setModalState("cv");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to open CV");
    }
  };

  const handleShortlist = async (applicationId: string) => {
    try {
      setActionLoadingId(applicationId);
      const updatedApplication = await shortlistApplication(applicationId);
      updateApplicationInList(updatedApplication);
      toast.success("Candidate shortlisted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to shortlist");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (applicationId: string) => {
    try {
      setActionLoadingId(applicationId);
      const updatedApplication = await rejectApplication(applicationId);
      updateApplicationInList(updatedApplication);
      toast.success("Candidate rejected.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to reject");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Applicants for {job?.title || "Job"}
        </h1>
        <p className="text-gray-600">{applications.length} applicants found</p>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search applicants..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            >
              <option value="MATCH_SCORE">Sort by Match Score</option>
              <option value="NEWEST">Sort by Newest</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="VIEWED">Viewed</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="INTERVIEW_SCHEDULED">Interviewing</option>
              <option value="REJECTED">Rejected</option>
              <option value="HIRED">Hired</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {isLoading ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500">
              Loading applicants...
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-2xl p-8 text-center text-red-500">
              {error}
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500">
              No applicants found.
            </div>
          ) : (
            filteredApplications.map((application) => {
              const applicantView = mapApplicationToView(application);

              return (
                <ApplicantCard
                  key={application.id}
                  applicant={applicantView}
                  onViewCv={() => handleViewCv(application)}
                  onViewMatch={() => {
                    setSelectedApplication(application);
                    setModalState("match");
                  }}
                  onShortlist={() => handleShortlist(application.id)}
                  onReject={() => handleReject(application.id)}
                  onScheduleInterview={() =>
                    toast.info("Interview scheduling will be connected next.")
                  }
                />
              );
            })
          )}
        </div>
      </div>

      {selectedApplication && (
        <CandidateCVModal
          data={buildCvModalData(selectedApplication)}
          isOpen={modalState === "cv"}
          onClose={() => setModalState("none")}
        />
      )}

      {selectedApplication && (
        <MatchDetailsModal
          candidateName={getCandidateName(selectedApplication)}
          jobTitle={job?.title || "Job"}
          matchResult={buildMatchModalData(selectedApplication)}
          isOpen={modalState === "match"}
          onClose={() => setModalState("none")}
        />
      )}
    </div>
  );
}