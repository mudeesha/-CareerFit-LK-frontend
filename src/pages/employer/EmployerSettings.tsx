import React from 'react';
import { toast } from 'sonner';
export function EmployerSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully.');
  };
  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your employer account preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Account Information
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@colombotech.lk"
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed" />
              
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Notification Preferences
          </h3>
          <div className="space-y-4">
            {[
            {
              title: 'New Applications',
              desc: 'Get notified when a candidate applies to your jobs.'
            },
            {
              title: 'High Match Alerts',
              desc: 'Receive immediate alerts for candidates with >90% match score.'
            },
            {
              title: 'Weekly Summary',
              desc: 'Get a weekly report of your job performance and applicant stats.'
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

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Team Access</h3>
            <button
              type="button"
              className="text-sm font-medium text-purple-600 hover:text-purple-700">
              
              Invite Member
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-900">Sarah Fernando</div>
                <div className="text-sm text-gray-500">
                  admin@colombotech.lk
                </div>
              </div>
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                Owner
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">John Silva</div>
                <div className="text-sm text-gray-500">hr@colombotech.lk</div>
              </div>
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                Recruiter
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Billing & Subscription
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900 mb-1">Pro Plan</div>
              <div className="text-sm text-gray-500">
                Up to 10 active jobs • Billed monthly
              </div>
            </div>
            <button
              type="button"
              className="bg-gray-50 border border-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              
              Manage Billing
            </button>
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