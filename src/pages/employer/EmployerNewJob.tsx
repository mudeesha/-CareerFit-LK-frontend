import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'sonner';
export function EmployerNewJob() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };
  const handleSaveDraft = () => {
    toast.success('Job saved as draft.');
    navigate('/employer/jobs');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Job submitted for admin review.');
    navigate('/employer/jobs');
  };
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Post a New Job
        </h1>
        <p className="text-gray-600">
          Create a job post and reach matched candidates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
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
                placeholder="e.g. Senior Software Engineer"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                
                <option value="">Select Category</option>
                <option>Software Engineering</option>
                <option>Accounting & Finance</option>
                <option>Banking</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level *
              </label>
              <select
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                
                <option value="">Select Experience</option>
                <option>Entry Level</option>
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
          </div>
        </section>

        {/* Location & Mode */}
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
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                
                <option value="">Select Location</option>
                <option>Colombo</option>
                <option>Kandy</option>
                <option>Galle</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Mode *
              </label>
              <select
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                
                <option value="">Select Mode</option>
                <option>On-site</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                
                <option value="">Select Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
        </section>

        {/* Salary */}
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
                placeholder="e.g. 100000"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Salary
              </label>
              <input
                type="number"
                placeholder="e.g. 150000"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Requirements</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills *
            </label>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) =>
                <span
                  key={skill}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                  
                    {skill}
                    <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-gray-400 hover:text-red-500">
                    
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </div>
        </section>

        {/* Description */}
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
              placeholder="Describe the role, responsibilities, and what you are looking for..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
            
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
            
            Save Draft
          </button>
          <button
            type="button"
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-[#F3F4F6] border border-gray-200 hover:bg-gray-200 rounded-xl transition-colors">
            
            Preview Job
          </button>
          <button
            type="submit"
            className="px-8 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
            
            Submit for Review
          </button>
        </div>
      </form>
    </div>);

}