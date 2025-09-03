import React from "react";
import Skeleton from "./Skeleton";

interface ProfileCardSkeletonProps {
  showBackButton?: boolean;
  cardSize?: "sm" | "md" | "lg";
}

export default function ProfileCardSkeleton({
  showBackButton = true,
  cardSize = "md",
}: ProfileCardSkeletonProps) {
  const cardPadding = {
    sm: "p-6",
    md: "p-8",
    lg: "p-10",
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="animate-pulse">
          {showBackButton && (
            <div className="mb-6">
              <Skeleton className="h-6 w-32" />
            </div>
          )}
          <div
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${cardPadding[cardSize]}`}
          >
            <div className="text-center">
              <Skeleton className="w-20 h-20 mx-auto mb-4" rounded="2xl" />
              <Skeleton className="h-7 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-40 mx-auto mb-6" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
