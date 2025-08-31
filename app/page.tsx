import Link from "next/link";
import { Mic, Zap, Users, Clock } from "lucide-react";
import Navbar from "./components/Navbar";
import { typography } from "./styles/typography";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  Making users minutes, one at a time. Capture ideas instantly
                  with our speech recognition technology.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Link href="/home">
                    <button
                      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
                      style={typography.button}
                    >
                      Try MinuteMade
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

              <div className="lg:pl-8">
                <div className="border  rounded-xl p-1 bg-gray-50/50">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div
                        className="ml-4 text-xs text-gray-400"
                        style={typography.technical}
                      >
                        minutemade
                      </div>
                    </div>
                    <div className="border border-gray-100 rounded-lg p-6 bg-gray-50/50">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic className="w-6 h-6 text-gray-600" />
                        </div>
                        <p
                          className="text-gray-500 text-sm mb-2"
                          style={typography.status}
                        >
                          Listening...
                        </p>
                        <p
                          className="text-gray-900 text-lg"
                          style={typography.tagline}
                        >
                          &quot;Can you check my mail and Slack for any new
                          urgent updates?&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2
                className="text-3xl text-gray-900 mb-4"
                style={typography.sectionHeader}
              >
                Why teams choose MinuteMade
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Simple, fast, and reliable speech recognition for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-5 h-5 text-gray-700" />
                </div>
                <h3
                  className="text-lg text-gray-900 mb-3"
                  style={typography.featureTitle}
                >
                  Crystal clear
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Advanced speech recognition that works perfectly in any
                  environment.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-gray-700" />
                </div>
                <h3
                  className="text-lg text-gray-900 mb-3"
                  style={typography.featureTitle}
                >
                  Lightning fast
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Real-time transcription that keeps up with your thoughts.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <h3
                  className="text-lg text-gray-900 mb-3"
                  style={typography.featureTitle}
                >
                  For everyone
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perfect for students, professionals, and creative teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span
                  className="text-lg text-gray-900"
                  style={typography.brand}
                >
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
      </div>
    </div>
  );
}
