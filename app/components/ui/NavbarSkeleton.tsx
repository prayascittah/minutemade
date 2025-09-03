import React from "react";
import Skeleton from "./Skeleton";

export default function NavbarSkeleton() {
  return (
    <div className="relative flex rounded-md p-0.5 sm:p-1">
      <div className="relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-xs sm:text-sm font-medium rounded-md">
        <Skeleton className="h-7 w-12 sm:w-14" />
      </div>
      <div className="relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-xs sm:text-sm font-medium rounded-md">
        <Skeleton className="h-7 w-16 sm:w-18" />
      </div>
    </div>
  );
}
