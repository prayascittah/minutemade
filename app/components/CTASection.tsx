import Link from "next/link";
import { typography } from "../styles/typography";

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl text-gray-900 mb-4"
          style={typography.sectionHeader}
        >
          Ready to transform your productivity?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands who are already making their minutes count with
          MinuteMade.
        </p>
        <Link href="/app">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg transition-colors"
            style={typography.button}
          >
            Start Your Free Trial
          </button>
        </Link>
      </div>
    </section>
  );
}
