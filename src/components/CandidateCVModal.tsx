import React from "react";
import { X, Download, FileText } from "lucide-react";
import { toast } from "sonner";

export type CandidateCVModalData = {
  candidateName: string;
  candidateEmail?: string | null;
  candidateLocation?: string | null;
  currentRole?: string | null;
  expectedSalary?: number | null;

  coverLetter?: string | null;

  cvFileUrl?: string | null;
  cvFileName?: string | null;

  skills?: string[] | null;
  experienceYears?: number | null;
  education?: string | null;
  languages?: string[] | null;
};

type CandidateCVModalProps = {
  data: CandidateCVModalData;
  isOpen: boolean;
  onClose: () => void;
};

export function CandidateCVModal({
  data,
  isOpen,
  onClose,
}: CandidateCVModalProps) {
  if (!isOpen) return null;

  const skills = data.skills ?? [];
  const languages = data.languages ?? [];

  const handleDownload = () => {
    if (!data.cvFileUrl) {
      toast.error("CV file is not available.");
      return;
    }

    window.open(data.cvFileUrl, "_blank", "noopener,noreferrer");
    toast.success("CV opened.");
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            Candidate Profile & CV
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-purple-100 text-purple-700 rounded-full shrink-0 flex items-center justify-center text-2xl font-bold">
                {data.candidateName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {data.candidateName}
                </h3>

                <p className="text-gray-600 font-medium mb-4">
                  {data.currentRole || "Candidate"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Location:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {data.candidateLocation || "Not provided"}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">Experience:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {data.experienceYears ?? 0}+ years
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">Expected Salary:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {data.expectedSalary
                        ? `LKR ${data.expectedSalary.toLocaleString()}`
                        : "Not provided"}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">Email:</span>{" "}
                    <span className="font-medium text-purple-600">
                      {data.candidateEmail || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {data.coverLetter && (
            <div className="bg-white border border-gray-200 rounded-[20px] p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Cover Letter</h4>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {data.coverLetter}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-[20px] p-6">
              <h4 className="font-bold text-gray-900 mb-4">Skills</h4>

              {skills.length === 0 ? (
                <p className="text-sm text-gray-500">No skills extracted.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-[20px] p-6">
              <h4 className="font-bold text-gray-900 mb-4">Languages</h4>

              {languages.length === 0 ? (
                <p className="text-sm text-gray-500">No languages extracted.</p>
              ) : (
                <div className="space-y-2 text-sm">
                  {languages.map((language) => (
                    <div key={language} className="flex justify-between">
                      <span className="text-gray-600">{language}</span>
                      <span className="font-medium text-gray-900">
                        Listed
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {data.education && (
            <div className="bg-white border border-gray-200 rounded-[20px] p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Education</h4>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {data.education}
              </p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-[20px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900">Original CV Document</h4>

              <button
                type="button"
                onClick={handleDownload}
                disabled={!data.cvFileUrl}
                className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {data.cvFileUrl ? "Open CV" : "CV unavailable"}
              </button>
            </div>

            <div className="bg-gray-100 rounded-xl h-64 flex flex-col items-center justify-center border border-gray-200 text-gray-400">
              <FileText className="w-12 h-12 mb-2" />
              <p className="text-sm font-medium">
                {data.cvFileName || "CV Preview Placeholder"}
              </p>
              {data.cvFileUrl && (
                <p className="text-xs text-gray-400 mt-1">
                  Click Open CV to view the original document.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}