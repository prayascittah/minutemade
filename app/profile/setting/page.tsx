"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { typography } from "@/app/styles/typography";
import { Bell, Shield, Globe, Trash2, LogOut } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { authService } from "@/lib/simple-database";
import { useState } from "react";
import { SettingsPageSkeleton } from "@/app/components/ui";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const loadingToast = toast.loading("Signing out...");
    try {
      const { error } = await authService.signOut();
      if (error) {
        toast.error("Failed to sign out", { id: loadingToast });
      } else {
        toast.success("Signed out successfully", { id: loadingToast });
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred during sign out", { id: loadingToast });
    }
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion is not yet implemented");
  };

  // Show loading skeleton while auth is loading
  if (loading) {
    return <SettingsPageSkeleton />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full max-w-md mx-4">
      <div className="mb-4">
        <h1
          className="text-lg font-medium text-black mb-1"
          style={typography.sectionHeader}
        >
          Settings
        </h1>
        <p className="text-gray-600 text-sm" style={typography.caption}>
          Manage your preferences and account
        </p>
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <div className="border border-gray-200 rounded p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-gray-600" />
              <div>
                <p
                  className="text-sm font-medium text-black"
                  style={typography.technical}
                >
                  Notifications
                </p>
                <p className="text-xs text-gray-600" style={typography.caption}>
                  Email notifications
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="border border-gray-200 rounded p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-gray-600" />
              <div>
                <p
                  className="text-sm font-medium text-black"
                  style={typography.technical}
                >
                  Data Collection
                </p>
                <p className="text-xs text-gray-600" style={typography.caption}>
                  Analytics and usage data
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataCollection}
                onChange={(e) => setDataCollection(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="border border-gray-200 rounded p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-gray-600" />
              <div>
                <p
                  className="text-sm font-medium text-black"
                  style={typography.technical}
                >
                  Language
                </p>
                <p className="text-xs text-gray-600" style={typography.caption}>
                  Interface language
                </p>
              </div>
            </div>
            <select
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-black focus:border-black"
              style={typography.technical}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="pt-4 mt-6 border-t border-gray-200 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded transition-colors"
          style={typography.button}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>

        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          style={typography.button}
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>
    </div>
  );
}
