import { Calendar, MessageSquare, Mic } from "lucide-react";
import { typography } from "../styles/typography";

export default function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Bring all your appointments to our calendar",
      description:
        "Automatically sync and organize all your meetings from multiple platforms in one unified calendar.",
    },
    {
      icon: MessageSquare,
      title: "Meetings from Discord, Mail and Slack in one place",
      description:
        "Never miss important communications across your favorite platforms.",
    },
    {
      icon: Mic,
      title: "Voice assistant that works in all devices and environments",
      description:
        "Crystal clear voice recognition that adapts to your workflow, anywhere.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2
            className="text-3xl text-gray-900 mb-4"
            style={typography.sectionHeader}
          >
            Your AI-powered personal assistant
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Seamlessly integrate your communications and never miss important
            updates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5 text-orange-600" />
                </div>
                <h3
                  className="text-lg text-gray-900 mb-3"
                  style={typography.featureTitle}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
