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

  // Show nothing while loading - let Next.js loading.tsx handle it
  if (loading) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <>
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
    </>
  );
}
