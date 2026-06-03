import React from 'react';
import { toast } from 'sonner';
export function CandidateSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully.');
  };
  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your account preferences and notifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Account Information */}
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Account Information
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="nimal.perera@example.com"
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed" />
              
              <p className="text-xs text-gray-500 mt-1">
                Contact support to change your email address.
              </p>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Email Notifications
          </h3>
          <div className="space-y-4">
            {[
            {
              title: 'Application Updates',
              desc: 'Get notified when an employer views or shortlists your application.'
            },
            {
              title: 'Job Alerts',
              desc: 'Receive daily emails with jobs matching your profile.'
            },
            {
              title: 'Career Advice',
              desc: 'Tips on improving your CV and interview skills.'
            }].
            map((item, i) =>
            <div
              key={i}
              className="flex items-start justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200">
              
                <div>
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer" />
                
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            )}
          </div>
        </section>

        {/* Password */}
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Change Password
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50 border border-red-100 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
          <p className="text-sm text-red-700 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            type="button"
            className="bg-white border border-red-200 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
            
            Delete Account
          </button>
        </section>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
            
            Save Settings
          </button>
        </div>
      </form>
    </div>);

}