import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getDashboardPathByRole, register } from "../services/authApi";

export function RegisterPage() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<"candidate" | "employer">(
    "candidate"
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const auth = await register({
        fullName,
        email,
        password,
        role: accountType === "candidate" ? "CANDIDATE" : "EMPLOYER",
      });

      toast.success("Account created successfully");
      navigate(getDashboardPathByRole(auth.user.role), { replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-gray-600">Join Sri Lanka's smart job portal</p>
        </div>

        <div className="bg-[#F3F4F6] border border-gray-200 rounded-[24px] p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setAccountType("candidate")}
              className={`p-4 rounded-xl border text-left transition-colors ${
                accountType === "candidate"
                  ? "bg-purple-50 border-purple-600 ring-1 ring-purple-600"
                  : "bg-white border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Candidate</div>
              <div className="text-xs text-gray-500">
                I want to find jobs and improve my CV.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAccountType("employer")}
              className={`p-4 rounded-xl border text-left transition-colors ${
                accountType === "employer"
                  ? "bg-purple-50 border-purple-600 ring-1 ring-purple-600"
                  : "bg-white border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Employer</div>
              <div className="text-xs text-gray-500">
                I want to post jobs and find candidates.
              </div>
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                placeholder="John Doe"
                required
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                placeholder="Create a password"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors mt-2"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}