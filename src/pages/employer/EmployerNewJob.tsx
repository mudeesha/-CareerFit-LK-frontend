import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  EmployerJobForm,
  type EmployerJobFormValues,
} from "../../components/employer/EmployerJobForm";
import { createEmployerJob } from "../../services/employer/JobApi";

export function EmployerNewJob() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateJob = async (values: EmployerJobFormValues) => {
    try {
      setIsSubmitting(true);

      await createEmployerJob(values);

      toast.success(
        values.status === "DRAFT"
          ? "Job saved as draft."
          : "Job submitted for admin review."
      );

      navigate("/employer/jobs");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EmployerJobForm
      title="Post a New Job"
      description="Create a job post and reach matched candidates."
      submitLabel="Submit for Review"
      draftLabel="Save Draft"
      isSubmitting={isSubmitting}
      onSubmit={handleCreateJob}
      onSaveDraft={handleCreateJob}
      onCancel={() => navigate("/employer/jobs")}
    />
  );
}