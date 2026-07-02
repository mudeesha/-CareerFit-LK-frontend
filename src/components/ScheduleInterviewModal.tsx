import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
  InterviewType,
  ScheduleInterviewPayload,
} from "../services/employer/InterviewApi";

type InterviewTypeOption = {
  label: string;
  value: InterviewType;
};

const INTERVIEW_TYPE_OPTIONS: InterviewTypeOption[] = [
  { label: "Online", value: "ONLINE" },
  { label: "On-site", value: "ONSITE" },
  { label: "Phone", value: "PHONE" },
];

interface ScheduleInterviewModalProps {
  candidateName: string;
  jobTitle: string;
  isOpen: boolean;
  isSubmitting?: boolean;
  initialValues?: Partial<ScheduleInterviewPayload>;
  onClose: () => void;
  onSubmit: (payload: ScheduleInterviewPayload) => void;
}

export function ScheduleInterviewModal({
  candidateName,
  jobTitle,
  isOpen,
  isSubmitting = false,
  initialValues,
  onClose,
  onSubmit,
}: ScheduleInterviewModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<InterviewType>("ONLINE");
  const [locationOrLink, setLocationOrLink] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setDate(initialValues?.interviewDate || "");
    setTime(initialValues?.interviewTime || "");
    setType(initialValues?.interviewType || "ONLINE");
    setLocationOrLink(initialValues?.locationOrLink || "");
    setNotes(initialValues?.notes || "");
  }, [isOpen, initialValues]);

  if (!isOpen) return null;

  const selectedTypeLabel =
    INTERVIEW_TYPE_OPTIONS.find((option) => option.value === type)?.label ||
    "Online";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) return;

    onSubmit({
      interviewDate: date,
      interviewTime: time,
      interviewType: type,
      locationOrLink: locationOrLink.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Schedule Interview
            </h2>
            <p className="text-sm text-gray-500">
              {candidateName} • {jobTitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form
            id="schedule-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Time *
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Interview Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as InterviewType)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              >
                {INTERVIEW_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meeting Link / Location
              </label>
              <input
                type="text"
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
                placeholder={
                  selectedTypeLabel === "Online"
                    ? "e.g. Zoom link"
                    : selectedTypeLabel === "Phone"
                      ? "e.g. Phone number"
                      : "e.g. Office address"
                }
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes for Candidate
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any instructions for the interview..."
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="schedule-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}