import { Mic } from "lucide-react";

export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <div className="flex flex-col relative p-8 pt-24">
          {/* Text Display Area Skeleton */}
          <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto min-h-[calc(100vh-6rem)]">
            <div className="text-center px-6">
              {/* Animated loading text */}
              <div className="space-y-4">
                <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Bottom Controls Skeleton */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
            {/* Microphone Button Skeleton */}
            <div className="w-20 h-20 flex items-center justify-center shadow-lg bg-gray-100 border-2 border-gray-300 animate-pulse">
              <Mic size={28} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
