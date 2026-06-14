import React from "react";
import { X, AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";
import type { MatchResult } from "../lib/types";

interface MatchAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchResult: MatchResult | null;
}

export function MatchAnalysisModal({
  isOpen,
  onClose,
  matchResult,
}: MatchAnalysisModalProps) {
  if (!isOpen || !matchResult) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-[20px]">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              CareerFit Action Plan
            </h2>
            <p className="text-sm text-gray-500">
              Improve your match for this job
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Action Plan</h3>
            <p className="text-sm text-gray-600">
              You are{" "}
              <span className="font-bold text-gray-900">
                {matchResult.overallScore}%
              </span>{" "}
              matched for this role. Focus on the missing skills below to improve
              your chances before applying.
            </p>
          </div>

          <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-900">Skills to Improve</h3>
            </div>

            {matchResult.missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-orange-50 text-orange-700 border border-orange-200 text-sm px-3 py-1.5 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  Your CV already matches the main skills required for this job.
                </span>
              </div>
            )}
          </div>

          <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Suggestions</h3>

            {matchResult.suggestions.length > 0 ? (
              <ul className="space-y-3">
                {matchResult.suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No suggestions available.
              </p>
            )}
          </div>

          <div className="bg-[#F3F4F6] border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-900">Learning Path</h3>
            </div>

            {matchResult.learningPath.length > 0 ? (
              <ol className="space-y-3">
                {matchResult.learningPath.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <span className="w-6 h-6 rounded-full bg-white border border-purple-200 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-500">
                No learning path available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}