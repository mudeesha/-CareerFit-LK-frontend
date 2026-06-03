import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';
import { mockCandidate } from '../../lib/mockData';
export function CandidateProfile() {
  const [skills, setSkills] = useState(mockCandidate.skills);
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
  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-gray-600">
          Manage your professional profile and preferences.
        </p>
      </div>

      {/* Top Profile Card */}
      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white shadow-sm">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Profile"
              className="w-full h-full object-cover" />
            
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors border-2 border-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {mockCandidate.name}
            </h2>
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mx-auto md:mx-0">
              Top 15% Profile
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            {mockCandidate.currentRole} • {mockCandidate.location} •{' '}
            {mockCandidate.experienceYears}+ years experience
          </p>

          <div className="flex items-center gap-4 max-w-md mx-auto md:mx-0">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">
                  Profile Completion
                </span>
                <span className="font-bold text-gray-900">
                  {mockCandidate.profileCompletion}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full"
                  style={{
                    width: `${mockCandidate.profileCompletion}%`
                  }} />
                
              </div>
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="space-y-8">
        {/* Personal Info */}
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
                defaultValue={mockCandidate.name}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={mockCandidate.email}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={mockCandidate.phone}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                defaultValue={mockCandidate.location}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </div>
        </section>

        {/* Career Info */}
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
                defaultValue={mockCandidate.currentRole}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                <option>Less than 1 year</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option selected>5+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Salary (LKR)
              </label>
              <input
                type="number"
                defaultValue={mockCandidate.expectedSalary}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Mode Preference
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none appearance-none">
                <option>On-site</option>
                <option selected>Hybrid</option>
                <option>Remote</option>
              </select>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Skills</h3>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) =>
              <span
                key={skill}
                className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                
                  {skill}
                  <button
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
          <div>
            <div className="text-sm text-gray-500 mb-2">
              Popular suggestions:
            </div>
            <div className="flex flex-wrap gap-2">
              {['Docker', 'Kubernetes', 'GraphQL', 'Python'].map((skill) =>
              <button
                key={skill}
                onClick={() => {
                  if (!skills.includes(skill)) setSkills([...skills, skill]);
                }}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-full text-xs transition-colors">
                
                  + {skill}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
            
            Save Changes
          </button>
        </div>
      </div>
    </div>);

}