"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { typography } from "../styles/typography";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show the profile layout UI when in settings
  const isSettingsPage = pathname.includes("/setting");

  if (isSettingsPage) {
    // Just return children without any layout styling for settings
    return <>{children}</>;
  }

  return (
    <div className="min-h-[calc(h-screen-50px)] bg-white">
      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={typography.button}>Back to Home</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-20 px-4">{children}</div>
    </div>
  );
}
