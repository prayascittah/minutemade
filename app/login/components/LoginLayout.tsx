export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
          <div className="max-w-lg px-18 py-13 bg-white rounded-lg shadow-md border border-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
