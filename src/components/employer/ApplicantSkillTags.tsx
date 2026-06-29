type ApplicantSkillTagsProps = {
  skills?: string[] | null;
  maxVisible?: number;
};

export function ApplicantSkillTags({
  skills,
  maxVisible = 4,
}: ApplicantSkillTagsProps) {
  const safeSkills = skills ?? [];

  const visibleSkills = safeSkills.slice(0, maxVisible);
  const remainingCount = safeSkills.length - visibleSkills.length;

  if (safeSkills.length === 0) {
    return (
      <span className="text-xs text-gray-400">
        No extracted skills available
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {visibleSkills.map((skill) => (
        <span
          key={skill}
          className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
        >
          {skill}
        </span>
      ))}

      {remainingCount > 0 && (
        <span className="bg-gray-50 border border-gray-200 text-gray-500 text-xs px-2 py-1 rounded">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}