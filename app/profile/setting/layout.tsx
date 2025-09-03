"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { typography } from "../../styles/typography";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="bg-white h-[calc(100vh-66px)] flex flex-col">
      {/* Back Button - Top Left */}
      <div className="p-4">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          style={typography.button}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>
      </div>

      <div className="flex justify-center py-5 sm:py-15">{children}</div>
    </div>
  );
}
