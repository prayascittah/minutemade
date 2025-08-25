"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { typography } from "../styles/typography";

export default function Navbar() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl text-gray-900" style={typography.brand}>
              MinuteMade
            </span>
          </Link>

          <button
            className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
            style={typography.button}
            onClick={() => {
              // TODO: Implement Google sign-in functionality
              console.log("Get started clicked");
            }}
          >
            <img
              src="https://auth-cdn.oaistatic.com/assets/google-logo-NePEveMl.svg"
              alt="Google logo"
              className="w-4 h-4"
            />
            <span>Get started</span>
          </button>
        </div>
      </div>
    </header>
  );
}
