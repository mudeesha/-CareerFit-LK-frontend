import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CompanyLogo } from "../../components/CompanyLogo";
import { LOCATION_OPTIONS } from "../../constants/employerJobOptions";
import {
  createEmployerCompany,
  getEmployerCompany,
  updateEmployerCompany,
  type EmployerCompany,
} from "../../services/employer/CompanyApi";

const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "500+"];

const DEFAULT_LOGO_COLOR = "#7C3AED";

export function EmployerCompany() {
  const [company, setCompany] = useState<EmployerCompany | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const [name, setName] = useState("");
  const [logoText, setLogoText] = useState("");
  const [logoType, setLogoType] = useState<"text" | "initials">("initials");
  const [logoColor, setLogoColor] = useState(DEFAULT_LOGO_COLOR);
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function loadCompany() {
      try {
        setIsLoading(true);

        const data = await getEmployerCompany();

        setCompany(data);
        setIsCreateMode(false);

        setName(data.name || "");
        setLogoText(data.logoText || "");
        setLogoType((data.logoType as "text" | "initials") || "initials");
        setLogoColor(data.logoColor || DEFAULT_LOGO_COLOR);
        setIndustry(data.industry || "");
        setSize(data.size || "");
        setLocation(data.location || "");
        setWebsite(data.website || "");
        setDescription(data.description || "");
        setContactEmail(data.contactEmail || "");
        setPhone(data.phone || "");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load company";

        if (
          message.includes("not linked to a company") ||
          message.includes("COMPANY_NOT_FOUND")
        ) {
          setIsCreateMode(true);
          setCompany(null);
        } else {
          toast.error(message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadCompany();
  }, []);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Company name is required");
      return false;
    }

    if (!logoText.trim()) {
      toast.error("Logo text is required");
      return false;
    }

    if (!industry.trim()) {
      toast.error("Industry is required");
      return false;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return false;
    }

    if (contactEmail && !contactEmail.includes("@")) {
      toast.error("Please enter a valid contact email");
      return false;
    }

    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: name.trim(),
      logoText: logoText.trim(),
      logoType,
      logoColor,
      industry: industry.trim(),
      location,
      size,
      website: website.trim(),
      description: description.trim(),
      contactEmail: contactEmail.trim(),
      phone: phone.trim(),
    };

    try {
      setIsSaving(true);

      const savedCompany = isCreateMode
        ? await createEmployerCompany(payload)
        : await updateEmployerCompany(payload);

      setCompany(savedCompany);
      setIsCreateMode(false);

      toast.success(
        isCreateMode
          ? "Company profile submitted for approval."
          : "Company profile updated successfully."
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save company"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const previewCompany = {
    id: company?.id || "preview",
    name: name || "Company",
    logoText: logoText || "C",
    logoType,
    logoColor,
    industry,
    location,
    openJobs: company?.openJobs || 0,
    website,
    size,
    description,
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto pb-10">
        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-8 text-gray-500">
          Loading company profile...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Company Profile
        </h1>
        <p className="text-gray-600">
          {isCreateMode
            ? "Create your company profile before posting jobs."
            : "Manage how your company appears to candidates."}
        </p>
      </div>

      {company?.status && (
        <div className="mb-6 rounded-xl border border-purple-100 bg-purple-50 px-5 py-4 text-sm text-purple-800">
          Company status: <strong>{company.status}</strong>
          {company.status === "PENDING" &&
            " — admin approval is required before posting active jobs."}
        </div>
      )}

      {isCreateMode && (
        <div className="mb-6 rounded-xl border border-orange-100 bg-orange-50 px-5 py-4 text-sm text-orange-800">
          Your employer account is not linked to a company yet. Create a company
          profile first.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Company Logo</h3>

          <div className="flex items-center gap-6">
            <CompanyLogo
              company={previewCompany}
              size="lg"
              className="w-24 h-24 text-3xl"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Text *
                </label>
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="e.g. CTS"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Type *
                </label>
                <select
                  value={logoType}
                  onChange={(e) =>
                    setLogoType(e.target.value as "text" | "initials")
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
                >
                  <option value="initials">Initials</option>
                  <option value="text">Text</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Color *
                </label>
                <input
                  type="color"
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="w-full h-[46px] bg-white border border-gray-200 rounded-xl px-2 py-2"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Software"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
              >
                <option value="">Select Size</option>
                {COMPANY_SIZE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://company.lk"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your company..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="hr@company.lk"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
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
                placeholder="+94 11 234 5678"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            disabled
            className="px-6 py-3 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-xl cursor-not-allowed"
          >
            Preview Public Profile
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-60"
          >
            {isSaving
              ? "Saving..."
              : isCreateMode
                ? "Submit Company for Approval"
                : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}