"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "white" | "gray" | "black";
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};

const colorMap = {
  white: "border-white",
  gray: "border-gray-600",
  black: "border-black",
};

export default function LoadingSpinner({
  size = "md",
  color = "white",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${sizeMap[size]} ${colorMap[color]} ${className}`}
    />
  );
}
