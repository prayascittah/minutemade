import React from "react";
import Skeleton from "./Skeleton";

export default function SettingsPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="space-y-3 mt-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
      </div>
    </div>
  );
}
