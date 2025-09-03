import React from "react";

interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const shadowMap = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function CardLayout({
  children,
  className = "",
  padding = "md",
  shadow = "sm",
  border = true,
  rounded = "lg",
}: CardLayoutProps) {
  const borderClass = border ? "border border-gray-200" : "";

  return (
    <div
      className={`bg-white ${paddingMap[padding]} ${shadowMap[shadow]} ${borderClass} ${roundedMap[rounded]} ${className}`}
    >
      {children}
    </div>
  );
}
