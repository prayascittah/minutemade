import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { typography } from "../../styles/typography";

interface PageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  className?: string;
  containerMaxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl";
  backgroundColor?: "white" | "gray-50";
  padding?: boolean;
}

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "7xl": "max-w-7xl",
};

const backgroundMap = {
  white: "bg-white",
  "gray-50": "bg-gray-50",
};

export default function PageLayout({
  children,
  showBackButton = false,
  backButtonText = "Back to Home",
  backButtonHref = "/home",
  className = "",
  containerMaxWidth = "4xl",
  backgroundColor = "gray-50",
  padding = true,
}: PageLayoutProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.push(backButtonHref);
  };

  return (
    <div
      className={`min-h-screen ${backgroundMap[backgroundColor]} ${className}`}
    >
      {showBackButton && (
        <div className={padding ? "p-6" : "p-4"}>
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={typography.button}>{backButtonText}</span>
          </button>
        </div>
      )}

      <div
        className={`${maxWidthMap[containerMaxWidth]} mx-auto ${
          padding ? "px-4 py-8" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
