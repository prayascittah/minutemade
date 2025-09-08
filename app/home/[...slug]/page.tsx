"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeCatchAll() {
  const router = useRouter();

  useEffect(() => {
    // Redirect any /home/anything back to /home
    router.replace("/home");
  }, [router]);

  // Show a brief loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to home...</p>
      </div>
    </div>
  );
}
