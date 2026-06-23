import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Star,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import {
  CV_FILE_BASE_URL,
  getDefaultCvAnalysis,
  getMyCvAnalyses,
  setDefaultCvAnalysis,
  uploadCv,
  type CvAnalysis,
} from "../../services/cvApi";

function toSafeArray(value?: string[] | null) {
  return Array.isArray(value) ? value : [];
}

function formatDate(value?: string) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CvListCard({
  cv,
  isSettingDefault,
  onSetDefault,
}: {
  cv: CvAnalysis;
  isSettingDefault: boolean;
  onSetDefault: (cvId: string) => void;
}) {
  const skills = toSafeArray(cv.extractedSkills);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5 shrink-0 text-purple-600" />

            <h3 className="truncate font-bold text-gray-900">{cv.fileName}</h3>

            {cv.isDefault && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                <Star className="h-3 w-3" />
                Default
              </span>
            )}
          </div>

          <p className="mb-3 text-sm text-gray-500">
            Uploaded {formatDate(cv.createdAt)}
          </p>

          <div className="mb-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-[#F3F4F6] p-3">
              <div className="text-xs text-gray-500">Experience</div>
              <div className="font-semibold text-gray-900">
                {cv.experienceYears ?? 0} years
              </div>
            </div>

            <div className="rounded-xl bg-[#F3F4F6] p-3">
              <div className="text-xs text-gray-500">Education</div>
              <div className="truncate font-semibold text-gray-900">
                {toSafeArray(cv.education).join(", ") || "Not detected"}
              </div>
            </div>

            <div className="rounded-xl bg-[#F3F4F6] p-3">
              <div className="text-xs text-gray-500">Languages</div>
              <div className="truncate font-semibold text-gray-900">
                {toSafeArray(cv.languages).join(", ") || "Not detected"}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold text-gray-900">
              Extracted Skills
            </div>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 12).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-gray-200 bg-[#F3F4F6] px-3 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {skill}
                  </span>
                ))}

                {skills.length > 12 && (
                  <span className="rounded-lg border border-gray-200 bg-[#F3F4F6] px-3 py-1.5 text-sm font-medium text-gray-500">
                    +{skills.length - 12} more
                  </span>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No extracted skills found.
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
          {cv.fileUrl && (
            <a
              href={`${CV_FILE_BASE_URL}${cv.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              View CV
            </a>
          )}

          {!cv.isDefault && (
            <button
              type="button"
              onClick={() => onSetDefault(cv.id)}
              disabled={isSettingDefault}
              className="rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-60"
            >
              {isSettingDefault ? "Updating..." : "Set as Default"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CandidateCV() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cvs, setCvs] = useState<CvAnalysis[]>([]);
  const [defaultCv, setDefaultCv] = useState<CvAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  const hasCvs = cvs.length > 0;

  const sortedCvs = useMemo(() => {
    return [...cvs].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [cvs]);

  async function loadCvData() {
    try {
      setIsLoading(true);

      const [allCvs, defaultAnalysis] = await Promise.all([
        getMyCvAnalyses(),
        getDefaultCvAnalysis().catch(() => null),
      ]);

      setCvs(allCvs.items);
      setDefaultCv(defaultAnalysis);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load CVs");
      setCvs([]);
      setDefaultCv(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCvData();
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

      const uploadedCv = await uploadCv(file);

      setCvs((currentCvs) => [
        uploadedCv,
        ...currentCvs.map((cv) => ({
          ...cv,
          isDefault: false,
        })),
      ]);

      setDefaultCv(uploadedCv);

      toast.success("CV uploaded successfully. It is now your default CV.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "CV upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSetDefault = async (cvId: string) => {
    try {
      setSettingDefaultId(cvId);

      const updatedCv = await setDefaultCvAnalysis(cvId);

      setCvs((currentCvs) =>
        currentCvs.map((cv) => ({
          ...cv,
          isDefault: cv.id === updatedCv.id,
        }))
      );

      setDefaultCv(updatedCv);

      toast.success("Default CV updated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update default CV"
      );
    } finally {
      setSettingDefaultId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl pb-10">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900">My CVs</h1>
          <p className="text-gray-600">
            Upload multiple CVs and choose the default CV used for job matching.
          </p>
        </div>

        <button
          onClick={handleBrowseClick}
          disabled={isUploading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-60"
        >
          <UploadCloud className="h-5 w-5" />
          {isUploading ? "Uploading..." : "Upload CV"}
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-[20px] border border-gray-200 bg-[#F3F4F6] p-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Loading CVs...
          </div>
        </div>
      ) : !hasCvs ? (
        <div className="rounded-[20px] border border-gray-200 bg-[#F3F4F6] p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
            <UploadCloud className="h-8 w-8 text-purple-600" />
          </div>

          <h3 className="mb-2 text-lg font-bold text-gray-900">
            Upload your first CV
          </h3>

          <p className="mb-6 text-sm text-gray-500">
            PDF or DOCX up to 5MB. Your first uploaded CV will be selected as
            default automatically.
          </p>

          <button
            onClick={handleBrowseClick}
            disabled={isUploading}
            className="rounded-xl bg-purple-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Browse Files"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-gray-200 bg-[#F3F4F6] p-5">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Uploaded CVs
              </h2>

              <div className="space-y-4">
                {sortedCvs.map((cv) => (
                  <CvListCard
                    key={cv.id}
                    cv={cv}
                    isSettingDefault={settingDefaultId === cv.id}
                    onSetDefault={handleSetDefault}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[20px] border border-gray-200 bg-[#F3F4F6] p-6">
              <h3 className="mb-4 font-bold text-gray-900">Default CV</h3>

              {defaultCv ? (
                <div className="rounded-2xl border border-purple-100 bg-white p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                  </div>

                  <h4 className="mb-2 break-words font-bold text-gray-900">
                    {defaultCv.fileName}
                  </h4>

                  <p className="mb-4 text-sm text-gray-500">
                    Uploaded {formatDate(defaultCv.createdAt)}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-500">Experience</div>
                      <div className="font-semibold text-gray-900">
                        {defaultCv.experienceYears ?? 0} years
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500">Education</div>
                      <div className="font-semibold text-gray-900">
                        {toSafeArray(defaultCv.education).join(", ") ||
                          "Not detected"}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500">Languages</div>
                      <div className="font-semibold text-gray-900">
                        {toSafeArray(defaultCv.languages).join(", ") ||
                          "Not detected"}
                      </div>
                    </div>
                  </div>

                  {defaultCv.fileUrl && (
                    <a
                      href={`${CV_FILE_BASE_URL}${defaultCv.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <FileText className="h-4 w-4" />
                      View Default CV
                    </a>
                  )}
                </div>
              ) : (
                <div className="rounded-xl bg-white p-5 text-sm text-gray-500">
                  No default CV selected.
                </div>
              )}
            </div>

            <div className="rounded-[20px] border border-gray-200 bg-[#F3F4F6] p-6">
              <h3 className="mb-3 font-bold text-gray-900">
                How default CV works
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Your default CV is used to calculate job match scores across job
                listings and job details. When you apply for a job, that
                application stores the selected CV reference so employers can see
                the exact CV used for that application.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}