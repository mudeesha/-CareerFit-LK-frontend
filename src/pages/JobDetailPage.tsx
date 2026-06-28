import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { CompanyLogo } from "../components/CompanyLogo";
import { CareerFitAdvisor } from "../components/CareerFitAdvisor";
import { ApplicationFormModal } from "../components/ApplicationFormModal";
import { formatCurrency } from "../lib/utils";
import { JobCard } from "../components/JobCard";
import type { Job, MatchResult } from "../lib/types";
import { getJobById, getJobs } from "../services/jobApi";
import { getJobMatch } from "../services/matchApi";
import {
  createApplication,
} from "../services/applicationApi";
import { getStoredAuthUser } from "../services/authApi";
import { MatchAnalysisModal } from "../components/MatchAnalysisModal";
import { getMyProfile, type CandidateProfileResponse } from "../services/profileApi";
import { getDefaultCvAnalysis, type CvAnalysis } from "../services/cvApi";

function workModeLabel(value: Job["workMode"]) {
  const labels: Record<Job["workMode"], string> = {
    ONSITE: "On-site",
    HYBRID: "Hybrid",
    REMOTE: "Remote",
  };

  return labels[value] || value;
}

function jobTypeLabel(value: Job["jobType"]) {
  const labels: Record<Job["jobType"], string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
  };

  return labels[value] || value;
}

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfileResponse | null>(null);
  const [latestCvAnalysis, setLatestCvAnalysis] = useState<CvAnalysis | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadJobDetails() {
      if (!jobId) {
        setError("Job ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsMatchLoading(false);
        setError(null);

        const jobData = await getJobById(jobId);

        if (!isMounted) return;

        setJob(jobData);

        const similarJobsData = await getJobs({
          category: jobData.category?.name,
        });

        if (!isMounted) return;

        setSimilarJobs(
          similarJobsData.items
            .filter((similarJob) => similarJob.id !== jobData.id)
            .slice(0, 2)
        );

        const user = getStoredAuthUser();

        if (user?.role === "CANDIDATE") {
          try {
            setIsMatchLoading(true);

            const [matchData, profileData, cvData] = await Promise.all([
              getJobMatch(jobId),
              getMyProfile().catch(() => null),
              getDefaultCvAnalysis().catch(() => null),
            ]);

            if (!isMounted) return;

            setMatchResult(matchData);
            setCandidateProfile(profileData);
            setLatestCvAnalysis(cvData);
          } catch {
            setMatchResult(null);
          } finally {
            if (isMounted) {
              setIsMatchLoading(false);
            }
          }
        } else {
          setMatchResult(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load job details"
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsMatchLoading(false);
        }
      }
    }

    loadJobDetails();

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  const handleOpenApplyModal = () => {
    const user = getStoredAuthUser();

    if (!user) {
      toast.error("Please login as a candidate to apply");
      navigate("/login");
      return;
    }

    if (user.role !== "CANDIDATE") {
      toast.error("Only candidates can apply for jobs");
      return;
    }

    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = async (
    payload: {
      cvAnalysisId: string;
      coverLetter: string;
    }
  ) => {
    if (!job) return;

    try {
      setIsSubmittingApplication(true);

      await createApplication({
        jobId: job.id,
        cvAnalysisId: payload.cvAnalysisId,
        coverLetter: payload.coverLetter,
      });

      setIsApplyModalOpen(false);
      setIsApplied(true);

      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-[1440px] mx-auto px-6 pt-10">
          <div className="h-72 bg-[#F3F4F6] border border-gray-200 rounded-[20px] animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-[900px] mx-auto px-6 pt-20 text-center">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-12">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Job not found
            </h1>

            <p className="text-gray-500 mb-6">
              {error || "The job you are looking for does not exist."}
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayMatchScore = matchResult?.overallScore || job.matchScore || 0;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-6 pt-10">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="flex items-start gap-5">
                  <CompanyLogo
                    company={job.company}
                    size="lg"
                    className="w-16 h-16 text-xl"
                  />

                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>

                    <div className="flex items-center gap-2 text-lg text-gray-700 font-medium">
                      {job.company?.name}
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-200 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>

                  <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Location</div>
                  <div className="font-medium text-gray-900">
                    {job.location}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Work Mode</div>
                  <div className="font-medium text-gray-900">
                    {workModeLabel(job.workMode)}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Job Type</div>
                  <div className="font-medium text-gray-900">
                    {jobTypeLabel(job.jobType)}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Salary</div>
                  <div className="font-medium text-gray-900">
                    {formatCurrency(job.salaryMin)} -{" "}
                    {formatCurrency(job.salaryMax)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="text-sm text-gray-500">
                  Posted {job.postedDate || "recently"} • {job.applicantCount}{" "}
                  applicants
                </div>

                <button
                  onClick={handleOpenApplyModal}
                  disabled={isApplied || isSubmittingApplication}
                  className={`md:hidden px-8 py-3 rounded-xl font-medium transition-colors ${
                    isApplied
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
              {["Overview", "About Company", "Benefits"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {activeTab === "overview" && (
                <>
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      About the role
                    </h3>
                    <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200 text-gray-700 leading-relaxed">
                      {job.description || "No description provided."}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Responsibilities
                    </h3>
                    <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200">
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {job.responsibilities?.length ? (
                          job.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))
                        ) : (
                          <li>Not specified</li>
                        )}
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Required Skills
                    </h3>
                    <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {job.preferredSkills && job.preferredSkills.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Preferred Skills
                      </h3>
                      <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200 flex flex-wrap gap-2">
                        {job.preferredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}

              {activeTab === "about company" && (
                <section>
                  <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200">
                    <p className="text-gray-700 mb-6">
                      {job.company?.description ||
                        "A leading company in Sri Lanka."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Industry
                        </div>
                        <div className="font-medium text-gray-900">
                          {job.company?.industry || "N/A"}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Company Size
                        </div>
                        <div className="font-medium text-gray-900">
                          {job.company?.size || "N/A"}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Website
                        </div>

                        {job.company?.website ? (
                          <a
                            href={job.company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-purple-600 hover:underline"
                          >
                            {job.company.website}
                          </a>
                        ) : (
                          <span className="font-medium text-gray-900">
                            N/A
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "benefits" && (
                <section>
                  <div className="bg-[#F3F4F6] rounded-[16px] p-6 border border-gray-200">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.benefits?.length ? (
                        job.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            {benefit}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">
                          Benefits not specified.
                        </li>
                      )}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {similarJobs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Similar Jobs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarJobs.map((similarJob) => (
                    <JobCard key={similarJob.id} job={similarJob} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-24">
              {isMatchLoading ? (
                <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 animate-pulse h-96" />
              ) : !matchResult ? (
                <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    CareerFit Match
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Login as a candidate to view your match score and apply
                    readiness.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl"
                  >
                    Login to View Match
                  </button>
                </div>
              ) : (
                <CareerFitAdvisor
                  matchResult={matchResult}
                  onViewDetails={() => setIsAnalysisModalOpen(true)}
                  onImproveCV={() => navigate("/candidate/cv")}
                  onApply={handleOpenApplyModal}
                  isApplied={isApplied}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <ApplicationFormModal
        mode="apply"
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={handleApplySubmit}
        initialCvAnalysisId={latestCvAnalysis?.id}
        initialCoverLetter=""
        isSubmitting={isSubmittingApplication}
      />

      <MatchAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        matchResult={matchResult}
      />
    </div>
  );
}