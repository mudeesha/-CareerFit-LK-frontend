import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { getCategories } from "../../services/categoryApi";
import type {
  Category,
  ExperienceLevel,
  JobStatus,
  JobType,
  WorkMode,
} from "../../lib/types";
import {
  EXPERIENCE_LEVEL_OPTIONS,
  JOB_TYPE_OPTIONS,
  LOCATION_OPTIONS,
  WORK_MODE_OPTIONS,
} from "../../constants/employerJobOptions";

export type EmployerJobFormValues = {
  title: string;
  categoryId: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  preferredSkills?: string[];
  description?: string;
  responsibilities?: string[];
  benefits?: string[];
  status?: Extract<JobStatus, "DRAFT" | "PENDING_APPROVAL">;
};

type EmployerJobFormInitialValues = Partial<{
  title: string;
  categoryId: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  description: string;
}>;

type EmployerJobFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  draftLabel?: string;
  isSubmitting?: boolean;
  initialValues?: EmployerJobFormInitialValues;
  onSubmit: (values: EmployerJobFormValues) => Promise<void>;
  onSaveDraft?: (values: EmployerJobFormValues) => Promise<void>;
  onCancel?: () => void;
};

export function EmployerJobForm({
  title: pageTitle,
  description: pageDescription,
  submitLabel,
  draftLabel = "Save Draft",
  isSubmitting = false,
  initialValues,
  onSubmit,
  onSaveDraft,
  onCancel,
}: EmployerJobFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const [title, setTitle] = useState(initialValues?.title || "");
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || "");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">(
    initialValues?.experienceLevel || ""
  );
  const [location, setLocation] = useState(initialValues?.location || "");
  const [workMode, setWorkMode] = useState<WorkMode | "">(
    initialValues?.workMode || ""
  );
  const [jobType, setJobType] = useState<JobType | "">(
    initialValues?.jobType || ""
  );
  const [salaryMin, setSalaryMin] = useState(
    initialValues?.salaryMin?.toString() || ""
  );
  const [salaryMax, setSalaryMax] = useState(
    initialValues?.salaryMax?.toString() || ""
  );
  const [skills, setSkills] = useState<string[]>(initialValues?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const data = await getCategories();
        setCategories(data.items);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load categories"
        );
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (!initialValues) return;

    setTitle(initialValues.title || "");
    setCategoryId(initialValues.categoryId || "");
    setExperienceLevel(initialValues.experienceLevel || "");
    setLocation(initialValues.location || "");
    setWorkMode(initialValues.workMode || "");
    setJobType(initialValues.jobType || "");
    setSalaryMin(initialValues.salaryMin?.toString() || "");
    setSalaryMax(initialValues.salaryMax?.toString() || "");
    setSkills(initialValues.skills || []);
    setDescription(initialValues.description || "");
  }, [initialValues]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();

      const skill = newSkill.trim();

      if (!skills.includes(skill)) {
        setSkills((currentSkills) => [...currentSkills, skill]);
      }

      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((currentSkills) =>
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Job title is required");
      return false;
    }

    if (!categoryId) {
      toast.error("Category is required");
      return false;
    }

    if (!experienceLevel) {
      toast.error("Experience level is required");
      return false;
    }

    if (!location) {
      toast.error("Location is required");
      return false;
    }

    if (!workMode) {
      toast.error("Work mode is required");
      return false;
    }

    if (!jobType) {
      toast.error("Job type is required");
      return false;
    }

    if (!salaryMin || !salaryMax) {
      toast.error("Salary range is required");
      return false;
    }

    if (Number(salaryMin) > Number(salaryMax)) {
      toast.error("Minimum salary cannot be greater than maximum salary");
      return false;
    }

    if (skills.length === 0) {
      toast.error("Please add at least one required skill");
      return false;
    }

    if (!description.trim()) {
      toast.error("Job description is required");
      return false;
    }

    return true;
  };

  const buildPayload = (
    status?: Extract<JobStatus, "DRAFT" | "PENDING_APPROVAL">
  ): EmployerJobFormValues => ({
    title: title.trim(),
    categoryId,
    location,
    workMode: workMode as WorkMode,
    jobType: jobType as JobType,
    experienceLevel: experienceLevel as ExperienceLevel,
    salaryMin: Number(salaryMin),
    salaryMax: Number(salaryMax),
    skills,
    description: description.trim(),
    status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit(buildPayload("PENDING_APPROVAL"));
  };

  const handleSaveDraft = async () => {
    if (!onSaveDraft) return;
    if (!validateForm()) return;

    await onSaveDraft(buildPayload("DRAFT"));
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{pageTitle}</h1>
        <p className="text-gray-600">{pageDescription}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Basic Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
              >
                <option value="">
                  {isLoadingCategories
                    ? "Loading categories..."
                    : "Select Category"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level *
              </label>
              <select
                required
                value={experienceLevel}
                onChange={(e) =>
                  setExperienceLevel(e.target.value as ExperienceLevel)
                }
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
              >
                <option value="">Select Experience</option>
                {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Location & Work Mode
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
              >
                <option value="">Select Location</option>
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Mode *
              </label>
              <select
                required
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
              >
                <option value="">Select Mode</option>
                {WORK_MODE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                required
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
              >
                <option value="">Select Type</option>
                {JOB_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Salary Range (LKR)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Salary
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="e.g. 100000"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Salary
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Requirements</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills *
            </label>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Job Description
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, and what you are looking for..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
          )}

          {onSaveDraft && (
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : draftLabel}
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}