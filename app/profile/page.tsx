"use client";

import { useEffect, useState } from "react";
import { authService, profileService, Profile } from "@/lib/simple-database";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndGetProfile = async () => {
      try {
        // Check if user is authenticated
        const { data: authData, error: authError } =
          await authService.getCurrentUser();

        if (authError || !authData.user) {
          toast.error("Please log in to access your profile");
          router.push("/login");
          return;
        }

        const { data: profile, error: profileError } =
          await profileService.getProfile(authData.user.id);

        if (profileError) {
          toast.error("Failed to load profile");
          console.error("Profile error:", profileError);
        } else {
          setUser(profile);
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
        console.error("Profile page error:", err);
      } finally {
        setLoading(true);
      }
    };
    checkAuthAndGetProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse shadow rounded-lg bg-white">
            <div className="flex flex-col border-b-2 border-gray-200">
              <div className="p-6 flex flex-col">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2.5">
                    <div className="h-6 bg-gray-300 rounded w-48"></div>
                    <div className="h-5 bg-gray-300 rounded w-60"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col w-9/20 item-center space-y-5 border-b-2 border-gray-200">
              <div className="bg-gray-300 rounded w-45 h-5"></div>
              <div className="grid grid-cols-2 grid-rows-3 gap-y-3.5 gap-x-2">
                <div className="bg-gray-300 rounded w-22 h-4"></div>
                <div className="bg-gray-300 rounded w-22 h-4"></div>
                <div className="bg-gray-300 rounded w-32 h-4"></div>
                <div className="bg-gray-300 rounded w-22 h-4"></div>
                <div className="bg-gray-300 rounded w-25 h-4"></div>
                <div className="bg-gray-300 rounded w-10 h-4"></div>
              </div>
            </div>
            <div className="p-6 flex item-center space-x-4">
              <div className="bg-gray-300 rounded w-26 h-10"></div>
              <div className="bg-gray-300 rounded w-26 h-10"></div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username || "Profile"}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.username || "User"}
                </h1>
                <p className="text-gray-600">
                  Member since{" "}
                  {new Date(user?.created_at || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex space-x-5">
                  <label className="block text-md font-medium text-gray-700">
                    Username
                  </label>
                  <p className="text-md text-gray-900">
                    {user?.username || "Not set"}
                  </p>
                </div>
                <div className="flex space-x-5">
                  <label className="block text-md font-medium text-gray-700">
                    Account Created
                  </label>
                  <p className="text-md text-gray-900">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex space-x-5">
                  <label className="block text-md font-medium text-gray-700">
                    Last Updated
                  </label>
                  <p className="text-md text-gray-900">
                    {user?.updated_at
                      ? new Date(user.updated_at).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
