import Link from "next/link";
import { typography } from "../styles/typography";

export default function HeroSection() {
  return (
    <div>
      <h1
        className="text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight leading-tight"
        style={typography.hero}
      >
        Transform your voice into{" "}
        <span className="text-orange-500">productivity</span>
      </h1>

      <p
        className="text-xl text-gray-600 mb-8 leading-relaxed"
        style={typography.tagline}
      >
        Making users minutes, one at a time. Capture ideas instantly with our
        speech recognition technology.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Link href="/home">
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
            style={typography.button}
          >
            Get Started
          </button>
        </Link>
        <Link href="/signup">
          <button
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-6 py-3 rounded-lg transition-colors"
            style={typography.button}
          >
            Sign Up
          </button>
        </Link>
      </div>

      <div
        className="flex items-center space-x-4 text-sm text-gray-500"
        style={typography.caption}
      >
        <span>✓ No credit card required</span>
        <span>✓ Free to start</span>
      </div>
    </div>
  );
}
