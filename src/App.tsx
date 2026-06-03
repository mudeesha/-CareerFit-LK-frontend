import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet } from
'react-router-dom';
import { Toaster } from 'sonner';
// Layouts
import { PublicNavbar } from './components/PublicNavbar';
import { DashboardSidebar } from './components/DashboardSidebar';
// Public Pages
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
// Candidate Pages
import { CandidateDashboard } from './pages/candidate/CandidateDashboard';
import { CandidateProfile } from './pages/candidate/CandidateProfile';
import { CandidateCV } from './pages/candidate/CandidateCV';
import { CandidateApplications } from './pages/candidate/CandidateApplications';
import { CandidateSettings } from './pages/candidate/CandidateSettings';
// Employer Pages
import { EmployerDashboard } from './pages/employer/EmployerDashboard';
import { EmployerJobs } from './pages/employer/EmployerJobs';
import { EmployerNewJob } from './pages/employer/EmployerNewJob';
import { EmployerApplicants } from './pages/employer/EmployerApplicants';
import { EmployerCompany } from './pages/employer/EmployerCompany';
import { EmployerSettings } from './pages/employer/EmployerSettings';
// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEmployers } from './pages/admin/AdminEmployers';
import { AdminJobs } from './pages/admin/AdminJobs';
import { AdminSettings } from './pages/admin/AdminSettings';
const PublicLayout = () =>
<div className="min-h-screen bg-white flex flex-col">
    <PublicNavbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-bold text-xl text-gray-900">
              CareerFit LK
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Sri Lanka’s smart job portal with CV matching.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">For Job Seekers</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Browse Jobs</li>
            <li>CV Analysis</li>
            <li>Career Advice</li>
            <li>Profile</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">For Employers</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Post a Job</li>
            <li>Find Candidates</li>
            <li>Employer Dashboard</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>;

const DashboardLayout = ({
  role


}: {role: 'candidate' | 'employer' | 'admin';}) =>
<div className="min-h-screen bg-white flex">
    <DashboardSidebar role={role} />
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 justify-between shrink-0">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
          
            <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <button className="text-gray-500 hover:text-gray-700">
            <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            
            </svg>
          </button>
          <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold text-sm">
            {role === 'candidate' ? 'NP' : role === 'employer' ? 'CT' : 'AD'}
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  </div>;

export function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Candidate Dashboard */}
        <Route path="/candidate" element={<DashboardLayout role="candidate" />}>
          <Route
            index
            element={<Navigate to="/candidate/dashboard" replace />} />
          
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="profile" element={<CandidateProfile />} />
          <Route path="cv" element={<CandidateCV />} />
          <Route path="applications" element={<CandidateApplications />} />
          <Route path="settings" element={<CandidateSettings />} />
        </Route>

        {/* Employer Dashboard */}
        <Route path="/employer" element={<DashboardLayout role="employer" />}>
          <Route
            index
            element={<Navigate to="/employer/dashboard" replace />} />
          
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="jobs" element={<EmployerJobs />} />
          <Route path="jobs/new" element={<EmployerNewJob />} />
          <Route
            path="jobs/:jobId/applicants"
            element={<EmployerApplicants />} />
          
          <Route path="company" element={<EmployerCompany />} />
          <Route path="settings" element={<EmployerSettings />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employers" element={<AdminEmployers />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}