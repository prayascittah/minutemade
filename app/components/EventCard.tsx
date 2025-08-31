import React from "react";
import { LucideIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  time,
  icon: Icon,
  iconColor,
  borderColor,
}) => {
  return (
    <div className={`bg-white border-l-4 ${borderColor} p-2 rounded shadow-sm`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={iconColor} size={10} />
        <span className="text-black text-xs font-medium">{title}</span>
      </div>
      <p className="text-gray-600 text-xs">{time}</p>
    </div>
  );
};

export default EventCard;
