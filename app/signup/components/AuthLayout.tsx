import DashboardPreview from "../../components/DashboardPreview";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Form */}
          <div className="w-full lg:w-[40%] flex items-center justify-center px-4 lg:px-6">
            <div className="max-w-sm w-full mx-auto">{children}</div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <DashboardPreview />
        </div>
      </div>
    </div>
  );
}
