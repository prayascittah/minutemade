import React from "react";
import WindowHeader from "./WindowHeader";
import AwardBadge from "./AwardBadge";
import KanbanBoard from "./KanbanBoard";
import VoiceAssistant from "./VoiceAssistant";

const DashboardPreview: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-[60%] bg-gray-100 p-3 relative overflow-hidden">
      <div className="w-full flex flex-col my-auto">
        {/* Award Badge - Positioned outside window */}
        <div className="flex justify-center mb-2 z-10 flex-shrink-0">
          <AwardBadge />
        </div>

        {/* Preview Window Frame */}
        <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl flex-1 flex flex-col min-h-0">
          <WindowHeader />

          {/* Window Content */}
          <div className="bg-white p-3 overflow-y-auto flex-1">
            <KanbanBoard />
            <VoiceAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
