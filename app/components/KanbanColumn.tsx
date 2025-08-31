import React from "react";
import EventCard from "./EventCard";
import { LucideIcon } from "lucide-react";

interface Event {
  title: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
}

interface KanbanColumnProps {
  title: string;
  dotColor: string;
  backgroundColor: string;
  events: Event[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  dotColor,
  backgroundColor,
  events,
}) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-3 border border-gray-200`}>
      <h3 className="text-black font-semibold text-xs mb-3 flex items-center gap-2">
        <div className={`w-2 h-2 ${dotColor} rounded-full`}></div>
        {title}
      </h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            time={event.time}
            icon={event.icon}
            iconColor={event.iconColor}
            borderColor={event.borderColor}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
