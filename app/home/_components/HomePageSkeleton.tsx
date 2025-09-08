export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <div className="flex flex-col relative p-8 pt-24">
          {/* Text Display Area Skeleton */}
          <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto min-h-[calc(100vh-12rem)]">
            <div className="text-center px-6 space-y-4">
              <div className="h-8 md:h-12 bg-gray-200 rounded-lg animate-pulse w-80 md:w-96 mx-auto"></div>
              <div className="h-6 md:h-8 bg-gray-200 rounded-lg animate-pulse w-64 md:w-80 mx-auto"></div>
            </div>
          </div>

          {/* Bottom Controls Skeleton */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
            {/* Microphone Button Skeleton */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
