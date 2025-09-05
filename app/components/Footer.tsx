import Link from "next/link";
import { Clock } from "lucide-react";
import { typography } from "../styles/typography";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg text-gray-900" style={typography.brand}>
              MinuteMade
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-8">
            Making users minutes, one at a time.
          </p>
          <div
            className="flex justify-center space-x-8 text-sm text-gray-600"
            style={typography.caption}
          >
            <Link
              href="/publicprofile"
              className="hover:text-gray-900 transition-colors"
            >
              Public Profile
            </Link>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
