import React, { useEffect, useState } from "react";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";
import {
  getMyProfile,
  updateMyProfile,
  type CandidateProfileResponse,
  type UpdateProfilePayload,
} from "../../services/profileApi";

function toSafeArray(value?: string[] | null) {
  return Array.isArray(value) ? value : [];
}

export function CandidateProfile() {
  const [profile, setProfile] = useState<CandidateProfileResponse | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [education, setEducation] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newPreferredLocation, setNewPreferredLocation] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  function fillForm(data: CandidateProfileResponse) {
    setProfile(data);

    setFullName(data.fullName || "");
    setPhone(data.phone || "");
    setDistrict(data.district || "");
    setCurrentRole(data.currentRole || "");
    setExpectedSalary(data.expectedSalary ? String(data.expectedSalary) : "");
    setExperienceYears(String(data.experienceYears ?? 0));
    setEducation(data.education || "");
    setLinkedinUrl(data.linkedinUrl || "");
    setGithubUrl(data.githubUrl || "");
    setPortfolioUrl(data.portfolioUrl || "");
    setProfileImageUrl(data.profileImageUrl || "");

    setSkills(toSafeArray(data.skills));
    setLanguages(toSafeArray(data.languages));
    setPreferredLocations(toSafeArray(data.preferredLocations));
  }

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);

        const data = await getMyProfile();

        fillForm(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load profile"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();

      const skill = newSkill.trim();

      if (!skills.includes(skill)) {
        setSkills([...skills, skill]);
      }

      setNewSkill("");
    }
  };

  const handleAddLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newLanguage.trim()) {
      e.preventDefault();

      const language = newLanguage.trim();

      if (!languages.includes(language)) {
        setLanguages([...languages, language]);
      }

      setNewLanguage("");
    }
  };

  const handleAddPreferredLocation = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && newPreferredLocation.trim()) {
      e.preventDefault();

      const location = newPreferredLocation.trim();

      if (!preferredLocations.includes(location)) {
        setPreferredLocations([...preferredLocations, location]);
      }

      setNewPreferredLocation("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const removeLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter((language) => language !== languageToRemove));
  };

  const removePreferredLocation = (locationToRemove: string) => {
    setPreferredLocations(
      preferredLocations.filter((location) => location !== locationToRemove)
    );
  };

  const handleDiscard = () => {
    if (profile) {
      fillForm(profile);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    try {
      setIsSaving(true);

      const payload: UpdateProfilePayload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        district: district.trim(),
        currentRole: currentRole.trim(),
        preferredLocations,
        expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
        experienceYears: experienceYears ? Number(experienceYears) : 0,
        skills,
        languages,
        education: education.trim(),
        linkedinUrl: linkedinUrl.trim(),
        githubUrl: githubUrl.trim(),
        portfolioUrl: portfolioUrl.trim(),
        profileImageUrl: profileImageUrl.trim(),
      };

      const updatedProfile = await updateMyProfile(payload);

      fillForm(updatedProfile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto pb-10">
        <div className="h-40 bg-[#F3F4F6] border border-gray-200 rounded-[20px] animate-pulse" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto pb-10">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Profile not found
          </h1>
          <p className="text-gray-600">Unable to load your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-gray-600">
          Manage your professional profile and preferences.
        </p>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white shadow-sm">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-700 text-2xl font-bold">
                {fullName.charAt(0) || "C"}
              </div>
            )}
          </div>

          <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors border-2 border-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>

            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mx-auto md:mx-0">
              Top 15% Profile
            </span>
          </div>

          <p className="text-gray-600 mb-4">
            {currentRole || "Candidate"} • {district || "Sri Lanka"} •{" "}
            {experienceYears || "0"} years experience
          </p>

          <div className="flex items-center gap-4 max-w-md mx-auto md:mx-0">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">
                  Profile Completion
                </span>
                <span className="font-bold text-gray-900">
                  {profile.profileCompletion}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full"
                  style={{
                    width: `${profile.profileCompletion}%`,
                  }}
                />
              </div>
            </div>

            <button className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
              Preview
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={profile.user?.email || ""}
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>

              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Career Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Role
              </label>

              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>

              <input
                type="number"
                min="0"
                step="0.5"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Salary (LKR)
              </label>

              <input
                type="number"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>

              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Skills</h3>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {skill}

                  <button
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

          <div>
            <div className="text-sm text-gray-500 mb-2">
              Popular suggestions:
            </div>

            <div className="flex flex-wrap gap-2">
              {["Docker", "Kubernetes", "GraphQL", "Python"].map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skills.includes(skill)) setSkills([...skills, skill]);
                  }}
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-full text-xs transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Preferences & Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>

              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>

              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio URL
              </label>

              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL
              </label>

              <input
                type="url"
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Preferred Locations
            </h4>

            <div className="flex flex-wrap gap-2 mb-4">
              {preferredLocations.map((location) => (
                <span
                  key={location}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {location}

                  <button
                    onClick={() => removePreferredLocation(location)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={newPreferredLocation}
              onChange={(e) => setNewPreferredLocation(e.target.value)}
              onKeyDown={handleAddPreferredLocation}
              placeholder="Type a location and press Enter..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Languages
            </h4>

            <div className="flex flex-wrap gap-2 mb-4">
              {languages.map((language) => (
                <span
                  key={language}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {language}

                  <button
                    onClick={() => removeLanguage(language)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={handleAddLanguage}
              placeholder="Type a language and press Enter..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            onClick={handleDiscard}
            disabled={isSaving}
            className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Discard Changes
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}