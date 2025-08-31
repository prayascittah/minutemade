import React from "react";
import { Mic } from "lucide-react";
import { typography } from "../styles/typography";

const VoiceAssistant: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-2 w-full mx-auto border border-gray-100 shadow-sm">
      {/* Voice Command Example */}
      <p
        className="text-black font-bold text-sm md:text-lg px-2 py-1 rounded break-words text-center mb-2"
        style={typography.tagline}
      >
        "Schedule a team meeting for tomorrow at 3 PM"
      </p>

      <div className="flex items-center justify-center mb-1">
        <div className="w-10 h-10 rounded border-black border-2 flex items-center justify-center">
          <Mic className="text-black" size={30} />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
