import React, { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  CV_FILE_BASE_URL,
  getLatestCvAnalysis,
  uploadCv,
  type CvAnalysis,
} from "../../services/cvApi";

function toSafeArray(value?: string[] | null) {
  return Array.isArray(value) ? value : [];
}

function scoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Work";
}

export function CandidateCV() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [analysis, setAnalysis] = useState<CvAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState("skills");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const isUploaded = Boolean(analysis);

  useEffect(() => {
    async function loadLatestAnalysis() {
      try {
        setIsLoading(true);
        const data = await getLatestCvAnalysis();
        setAnalysis(data);
      } catch {
        setAnalysis(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadLatestAnalysis();
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF and DOCX files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      const uploadedAnalysis = await uploadCv(file);

      setAnalysis(uploadedAnalysis);
      setActiveTab("skills");
      toast.success("CV uploaded and analyzed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "CV upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const extractedSkills = toSafeArray(analysis?.extractedSkills);
  const missingSkills = toSafeArray(analysis?.missingSkills);
  const suggestions = toSafeArray(analysis?.suggestions);
  const education = toSafeArray(analysis?.education);
  const languages = toSafeArray(analysis?.languages);
  const strengthScore = analysis?.strengthScore || 0;

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">CV Analysis</h1>
        <p className="text-gray-600">
          Upload your CV and get AI-powered career insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-8 text-center">
            {isLoading ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 animate-pulse" />
                <div className="h-5 w-48 bg-gray-100 rounded mb-3 animate-pulse" />
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : !isUploaded ? (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8 text-purple-600" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Upload your CV
                </h3>

                <p className="text-sm text-gray-500 mb-6">
                  PDF or DOCX up to 5MB
                </p>

                <button
                  onClick={handleBrowseClick}
                  disabled={isUploading}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                >
                  {isUploading ? "Uploading..." : "Browse Files"}
                </button>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {analysis?.fileName}
                </h3>

                <p className="text-sm text-green-600 font-medium mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Uploaded successfully
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  {analysis?.fileUrl && (
                    <a
                      href={`${CV_FILE_BASE_URL}${analysis.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white border border-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      View CV
                    </a>
                  )}

                  <button
                    onClick={handleBrowseClick}
                    disabled={isUploading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                  >
                    {isUploading ? "Uploading..." : "Upload New CV"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {isUploaded && (
            <div>
              <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
                {["Skills", "Experience", "Suggestions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? "border-purple-600 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">
                        Extracted Skills
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {extractedSkills.length > 0 ? (
                          extractedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No extracted skills found.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">
                        Missing High-Demand Skills
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {missingSkills.length > 0 ? (
                          missingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No missing skills detected.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <div className="font-bold text-gray-900">
                        Detected Experience
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {analysis?.experienceYears || 0} years
                      </div>
                      <p className="text-sm text-gray-700">
                        This is the experience value detected during analysis.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <div className="font-bold text-gray-900">Education</div>
                      <div className="text-sm text-gray-700">
                        {education.length > 0
                          ? education.join(", ")
                          : "Not detected"}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <div className="font-bold text-gray-900">Languages</div>
                      <div className="text-sm text-gray-700">
                        {languages.length > 0
                          ? languages.join(", ")
                          : "Not detected"}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "suggestions" && (
                  <div className="space-y-4">
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestion) => (
                        <div
                          key={suggestion}
                          className="bg-white p-5 rounded-xl border border-gray-200"
                        >
                          <h4 className="font-bold text-gray-900 mb-2">
                            {suggestion}
                          </h4>

                          <p className="text-sm text-gray-600">
                            Improve this area to increase your CV strength and
                            job match score.
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white p-5 rounded-xl border border-gray-200 text-sm text-gray-500">
                        No suggestions available.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-6">CV Strength Score</h3>

            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />

                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isUploaded ? "#16A34A" : "#9CA3AF"}
                  strokeWidth="3"
                  strokeDasharray={
                    isUploaded ? `${strengthScore}, 100` : "0, 100"
                  }
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {isUploaded ? `${strengthScore}%` : "--"}
                </span>
              </div>
            </div>

            {isUploaded && (
              <div className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                {scoreLabel(strengthScore)}
              </div>
            )}

            <p className="text-sm text-gray-500">
              {isUploaded
                ? "Your CV has been analyzed using the latest uploaded file."
                : "Upload your CV to see your score."}
            </p>
          </div>

          {isUploaded && analysis?.fileUrl && (
            <a
              href={`${CV_FILE_BASE_URL}${analysis.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Uploaded CV
            </a>
          )}
        </div>
      </div>
    </div>
  );
}