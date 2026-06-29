import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  EmployerJobForm,
  type EmployerJobFormValues,
} from "../../components/employer/EmployerJobForm";
import {
  getEmployerJob,
  updateEmployerJob,
} from "../../services/employer/JobApi";
import type { Job } from "../../lib/types";

export function EmployerEditJob() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadJob() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getEmployerJob(id);
        setJob(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load job");
        navigate("/employer/jobs");
      } finally {
        setIsLoading(false);
      }
    }

    loadJob();
  }, [id, navigate]);

  const handleUpdateJob = async (values: EmployerJobFormValues) => {
    if (!id) return;

    try {
      setIsSubmitting(true);

      await updateEmployerJob(id, values);

      toast.success("Job updated successfully.");
      navigate("/employer/jobs");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update job");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto pb-10">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-8 text-gray-500">
          Loading job...
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <EmployerJobForm
      title="Edit Job"
      description="Update your job post details."
      submitLabel="Save Changes"
      isSubmitting={isSubmitting}
      initialValues={{
        title: job.title,
        categoryId: job.categoryId,
        location: job.location,
        workMode: job.workMode,
        jobType: job.jobType,
        experienceLevel: job.experienceLevel,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        skills: job.skills || [],
        description: job.description || "",
      }}
      onSubmit={handleUpdateJob}
      onCancel={() => navigate("/employer/jobs")}
    />
  );
}