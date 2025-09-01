import React from "react";
import { Mic } from "lucide-react";
import { typography } from "../styles/typography";

const VoiceAssistant: React.FC = () => {
  return (
    <div className="rounded-lg p-2 w-full mx-auto">
      {/* Voice Command Example */}
      <p
        className="text-gray-400 font-bold text-sm md:text-lg px-2 py-1 rounded break-words text-center mb-2"
        style={typography.tagline}
      >
        "Schedule a team meeting for tomorrow at 3 PM"
      </p>

      <div className="flex items-center justify-center mb-1">
        <div className="w-13 h-13 rounded border-black border-2 flex items-center justify-center">
          <Mic className="text-black" size={30} />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
