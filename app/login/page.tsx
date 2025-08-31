"use client";
import { useState } from "react";
import { authService } from "../../lib/database";
import { typography } from "../styles/typography";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await authService.signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      // Redirect to home page on successful login
      window.location.href = "/home";
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center px-8 py-16 min-h-[calc(100vh-140px)]">
          <div className="max-w-md w-full">
            <div className="text-center mb-7">
              <h1
                className="text-4xl md:text-5xl font-extrabold text-black"
                style={typography.tagline}
              >
                Welcome back
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 font-medium transition-all duration-200 ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-black hover:bg-gray-800 text-white hover:shadow-lg"
                }`}
                style={typography.button}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-black hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
