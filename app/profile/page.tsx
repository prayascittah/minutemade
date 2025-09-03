"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Check, X, ArrowLeft, User } from "lucide-react";
import { typography } from "../styles/typography";
import { useAuth } from "../hooks/useAuth";
import { profileService } from "../../lib/simple-database";
import toast from "react-hot-toast";

export default function AuthenticatedProfilePage() {
  const { user, loading, isAuthenticated, setUser } = useAuth();
  const router = useRouter();

  // Editing states
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  // Initialize edit values when user data loads
  useEffect(() => {
    if (user) {
      setEditValues({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    // Reset values to original
    if (user) {
      setEditValues({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
    setEditingField(null);
  };

  const handleSave = async (field: string) => {
    if (!user) return;

    setSaving(true);
    try {
      if (field === "email") {
        toast.error(
          "Email updates require verification. Please contact support."
        );
        setSaving(false);
        setEditingField(null);
        return;
      }

      if (field === "password") {
        toast.error(
          "Password updates require additional verification. Please contact support."
        );
        setSaving(false);
        setEditingField(null);
        return;
      }

      const updates: any = {};
      if (field === "username") {
        updates.username = editValues.username;
      }

      const { data, error } = await profileService.updateProfile(
        user.id,
        updates
      );

      if (error) {
        toast.error("Failed to update profile");
        console.error("Profile update error:", error);
      } else {
        // Update local user state
        setUser({ ...user, ...updates });
        toast.success(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } updated successfully!`
        );
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Update error:", err);
    } finally {
      setSaving(false);
      setEditingField(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="mb-6">
              <div className="h-5 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
                <div className="space-y-2.5">
                  <div className="h-6 bg-gray-300 rounded w-48"></div>
                  <div className="h-5 bg-gray-300 rounded w-60"></div>
                </div>
              </div>
              <div className="mt-8 space-y-6">
                <div className="h-5 bg-gray-300 rounded w-45"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={typography.button}>Back to Home</span>
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-6 mb-8">
            {/* Left Side - Profile Picture */}
            <div className="relative">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-md object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
              )}
            </div>

            {/* Right Side - User Info */}
            <div>
              <h1
                className="text-3xl font-bold text-gray-900"
                style={typography.hero}
              >
                {user?.username || "User"}
              </h1>
              <p className="text-lg text-gray-600" style={typography.caption}>
                Member since{" "}
                {new Date(user?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Profile Management Section */}
          <div className="space-y-6">
            <div>
              <h2
                className="text-xl font-semibold text-gray-900 mb-6"
                style={typography.sectionHeader}
              >
                Profile Information
              </h2>

              <div className="space-y-4">
                {/* Username Field */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4 flex-1">
                    <label
                      className="block text-base font-medium text-gray-700 w-28"
                      style={typography.technical}
                    >
                      Username
                    </label>
                    {editingField === "username" ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <input
                          type="text"
                          value={editValues.username}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              username: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-base"
                          style={typography.technical}
                          disabled={saving}
                        />
                        <button
                          onClick={() => handleSave("username")}
                          disabled={saving}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={saving}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between flex-1">
                        <p
                          className="text-gray-900 text-base"
                          style={typography.technical}
                        >
                          {user?.username || "Not set"}
                        </p>
                        <button
                          onClick={() => handleEdit("username")}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4 flex-1">
                    <label
                      className="block text-base font-medium text-gray-700 w-28"
                      style={typography.technical}
                    >
                      Email
                    </label>
                    <div className="flex items-center justify-between flex-1">
                      <p
                        className="text-gray-900 text-base"
                        style={typography.technical}
                      >
                        {user?.email || "Not available"}
                      </p>
                      <button
                        onClick={() => handleEdit("email")}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        title="Email changes require verification"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4 flex-1">
                    <label
                      className="block text-base font-medium text-gray-700 w-28"
                      style={typography.technical}
                    >
                      Password
                    </label>
                    <div className="flex items-center justify-between flex-1">
                      <p
                        className="text-gray-500 text-base"
                        style={typography.technical}
                      >
                        ••••••••
                      </p>
                      <button
                        onClick={() => handleEdit("password")}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        title="Password changes require verification"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Created (Read-only) */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4 flex-1">
                    <label
                      className="block text-base font-medium text-gray-700 w-28"
                      style={typography.technical}
                    >
                      Joined
                    </label>
                    <p
                      className="text-gray-900 text-base"
                      style={typography.technical}
                    >
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Last Updated (Read-only) */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4 flex-1">
                    <label
                      className="block text-base font-medium text-gray-700 w-28"
                      style={typography.technical}
                    >
                      Updated
                    </label>
                    <p
                      className="text-gray-900 text-base"
                      style={typography.technical}
                    >
                      {user?.updated_at
                        ? new Date(user.updated_at).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
