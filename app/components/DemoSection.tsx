import { Mic } from "lucide-react";
import { typography } from "../styles/typography";

export default function DemoSection() {
  return (
    <div className="lg:pl-8">
      <div className="border  rounded-xl p-1 bg-gray-50/50">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div
              className="ml-4 text-sm text-gray-500"
              style={typography.technical}
            >
              minutemade.ai
            </div>
          </div>
          <div className="border border-gray-100 rounded-lg px-6 py-3 bg-gray-50/50 flex flex-col items-center text-center gap-10">
            <p className="text-gray-900 text-xl" style={typography.tagline}>
              Check my Gmail for any urgent meetings today
            </p>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Mic className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
