export default function Loading() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full max-w-md mx-4">
      {/* Header skeleton */}
      <div className="mb-4">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>

      {/* Settings items skeleton */}
      <div className="space-y-4">
        {/* Three setting items */}
        <div className="border border-gray-200 rounded p-3">
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="w-9 h-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="border border-gray-200 rounded p-3">
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-28 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-36"></div>
              </div>
            </div>
            <div className="w-9 h-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="border border-gray-200 rounded p-3">
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Account Actions skeleton */}
      <div className="pt-4 mt-6 border-t border-gray-200 space-y-2">
        <div className="animate-pulse">
          <div className="w-full flex items-center gap-3 px-3 py-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-full flex items-center gap-3 px-3 py-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
