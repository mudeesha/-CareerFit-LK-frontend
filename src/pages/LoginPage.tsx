import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Form Side */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">Sign in to continue to CareerFit LK</p>
          </div>

          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[24px] p-8">
            <form
              className="space-y-5 mb-8"
              onSubmit={(e) => e.preventDefault()}>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="Enter your email" />
                
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-purple-600 font-medium hover:text-purple-700">
                    
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="Enter your password" />
                
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-colors">
                Sign In
              </button>
            </form>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#F3F4F6] text-gray-500">
                  Or continue with demo accounts
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/candidate/dashboard')}
                className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                
                <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs font-bold">
                  C
                </div>
                Continue as Demo Candidate
              </button>
              <button
                onClick={() => navigate('/employer/dashboard')}
                className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                
                <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded flex items-center justify-center text-xs font-bold">
                  E
                </div>
                Continue as Demo Employer
              </button>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                
                <div className="w-5 h-5 bg-gray-200 text-gray-700 rounded flex items-center justify-center text-xs font-bold">
                  A
                </div>
                Continue as Demo Admin
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-600 font-medium hover:underline">
              
              Sign up
            </Link>
          </p>
        </div>

        {/* Benefit Side */}
        <div className="hidden md:block">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[32px] p-12 h-full flex flex-col justify-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-8">
              C
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              CareerFit helps you apply smarter.
            </h2>
            <ul className="space-y-6">
              {[
              'Get CV matches before you apply',
              'Discover relevant jobs and companies',
              'Track your applications and progress',
              'Find the best jobs that match your profile'].
              map((text, i) =>
              <li
                key={i}
                className="flex items-center gap-4 text-gray-700 font-medium">
                
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    
                      <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7" />
                    
                    </svg>
                  </div>
                  {text}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>);

}