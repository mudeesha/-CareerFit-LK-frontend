import React from 'react';
import { toast } from 'sonner';
export function AdminSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully.');
  };
  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Admin Settings
        </h1>
        <p className="text-gray-600">
          Manage platform configuration and admin preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Admin Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue="Super Admin"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@careerfit.lk"
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed" />
              
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Approval Workflows
          </h3>
          <div className="space-y-4">
            {[
            {
              title: 'Auto-approve known employers',
              desc: 'Automatically approve job posts from verified employers.'
            },
            {
              title: 'Require manual review for new employers',
              desc: 'All new employer registrations must be manually approved.'
            },
            {
              title: 'Flag suspicious keywords',
              desc: 'Automatically flag job posts containing suspicious keywords for manual review.'
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
                  defaultChecked={i !== 0}
                  className="sr-only peer" />
                
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Platform Notifications
          </h3>
          <div className="space-y-4">
            {[
            {
              title: 'New Employer Registrations',
              desc: 'Get an email when a new employer registers.'
            },
            {
              title: 'Daily Summary Report',
              desc: 'Receive a daily summary of platform activity.'
            },
            {
              title: 'System Alerts',
              desc: 'Critical system alerts and error reports.'
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