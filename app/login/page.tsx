"use client";
import { useState } from "react";
import { authService } from "../../lib/simple-database";
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

  const handleGoogleSignup = async () => {
    const { data, error } = await authService.signInWithOAuth("google");
    if (error) {
      setError(error.message);
    }
    // OAuth redirect is handled automatically
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
          <div className="max-w-lg px-18 py-13 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="text-center mb-7">
              <h1
                className="text-4xl md:text-5xl font-extrabold text-black"
                style={typography.tagline}
              >
                Welcome back
              </h1>
            </div>
            <div className="space-y-3 mb-2 flex flex-col items-center">
              <button
                onClick={handleGoogleSignup}
                className="w-80 flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-all duration-200 bg-white text-black font-medium text-sm rounded-md"
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

            {/* Elegant Divider */}
            <div className="relative flex py-6 items-center w-80 mx-auto">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-6 flex flex-col items-center"
            >
              {/* Email Field */}
              <div className="space-y-2 w-80">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-all text-black placeholder-gray-400 rounded-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 w-80">
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
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 focus:border-black focus:outline-none transition-all text-black placeholder-gray-400 rounded-sm"
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
                className={`w-80 py-2 px-4 font-medium transition-all duration-200 ${
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
