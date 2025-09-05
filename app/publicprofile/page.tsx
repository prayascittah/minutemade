"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, User, Calendar, Mail } from "lucide-react";
import { typography } from "../styles/typography";
import { useAuth } from "../hooks/useAuth";
import { PublicProfileSkeleton } from "../components/ui";

export default function PublicProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <PublicProfileSkeleton />;
  }

  return (
    <div className="h-[calc(100vh-66px)] bg-gray-50 overflow-auto">
      {/* Back Button - Top left of content area */}
      <div className="p-6">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={typography.button} className="text-lg font-medium">
            Back to Home
          </span>
        </button>
      </div>
      <div className="max-w-lg mx-auto sm:px-4 sm:my-10 flex items-center">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          {user ? (
            <div className="text-center">
              {/* Profile Picture */}
              <div className="mb-6">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username || "User"}
                    className="w-20 h-20 rounded-2xl object-cover mx-auto"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto">
                    <User className="w-10 h-10 text-gray-500" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="mb-6">
                <h1
                  className="text-3xl font-bold text-gray-900 mb-2"
                  style={typography.hero}
                >
                  {user?.username || "Anonymous User"}
                </h1>
              </div>

              {/* Details */}
              <div className="space-y-4 text-left">
                {/* Email */}
                {user?.email && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="p-1">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Email
                      </p>
                      <p
                        className="text-base text-gray-900"
                        style={typography.technical}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Joined Date */}
                {user?.created_at && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="p-1">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Joined
                      </p>
                      <p
                        className="text-base text-gray-900"
                        style={typography.technical}
                      >
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Not Signed In */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-2"
                style={typography.hero}
              >
                Welcome to MinuteMade
              </h2>
              <p
                className="text-gray-500 mb-6 text-base"
                style={typography.caption}
              >
                Sign in to view your personalized profile
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-base font-medium"
                  style={typography.button}
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-base font-medium"
                  style={typography.button}
                >
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
