export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Profile Header Section */}
        <div className="flex items-center space-x-6 mb-8">
          {/* Profile Picture */}
          <div className="w-20 h-20 bg-gray-200 rounded-md"></div>

          {/* User Info */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-5 bg-gray-200 rounded w-40"></div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>

          {/* Profile Fields */}
          <div className="space-y-4">
            {/* Username Field */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="flex items-center justify-between flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="flex items-center justify-between flex-1">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="flex items-center justify-between flex-1">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Joined Field */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            </div>

            {/* Updated Field */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-18"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
