import HeroSection from "./components/HeroSection";
import DemoSection from "./components/DemoSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <HeroSection />
            <DemoSection />
          </div>
        </div>
      </section>

      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
