"use client";
import { useState } from "react";
import { authService } from "../../lib/simple-database";
import { typography } from "../styles/typography";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import DashboardPreview from "../components/DashboardPreview";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const { data, error } = await authService.signUp(email, password, {
      username: username,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to login with success message
      window.location.href =
        "/login?message=Check your email for confirmation!";
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    const { data, error } = await authService.signInWithOAuth("google");
    if (error) {
      setError(error.message);
    }
    // OAuth redirect is handled automatically
  };

  return (
    <div className="h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Form */}
          <div className="w-full lg:w-[40%] flex items-center justify-center px-4 lg:px-6">
            <div className="max-w-sm w-full mx-auto">
              <div className="mb-2">
                <h1
                  className="text-2xl md:text-3xl font-bold text-black mb-2"
                  style={typography.tagline}
                >
                  Create your MinuteMade account
                </h1>
                <p className="text-gray-600 text-sm" style={typography.status}>
                  Free for individuals. Team plans for collaborative features.
                </p>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-2 flex flex-col items-center">
                <button
                  onClick={handleGoogleSignup}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 hover:border-gray-400 transition-colors bg-white text-black font-medium text-sm"
                  style={typography.button}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="text-center text-gray-500 mb-2">or</div>

              {/* Form */}
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-black"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1">
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1 mb-4">
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
                      placeholder="Create a password"
                      required
                      className="w-full pl-10 pr-12 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder-gray-400"
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
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-gray-600 text-xs">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-black hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <DashboardPreview />
        </div>
      </div>
    </div>
  );
}
