import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getDashboardPathByRole, login } from "../services/authApi";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const auth = await login({
        email,
        password,
      });

      toast.success("Login successful");
      navigate(getDashboardPathByRole(auth.user.role), { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">Sign in to continue to CareerFit LK</p>
          </div>

          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[24px] p-8">
            <form className="space-y-5 mb-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-purple-600 font-medium hover:text-purple-700"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

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
                "Get CV matches before you apply",
                "Discover relevant jobs and companies",
                "Track your applications and progress",
                "Find the best jobs that match your profile",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-4 text-gray-700 font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}