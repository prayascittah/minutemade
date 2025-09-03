export default function Loading() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-2xl mx-auto mb-4"></div>
              <div className="h-7 w-32 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-40 bg-gray-300 rounded mx-auto mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
