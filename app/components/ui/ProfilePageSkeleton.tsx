import React from "react";
import Skeleton from "./Skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-6">
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-6">
              <Skeleton className="w-20 h-20" rounded="md" />
              <div className="space-y-2.5">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-60" />
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <Skeleton className="h-5 w-45" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
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
