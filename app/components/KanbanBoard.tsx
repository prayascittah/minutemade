import React from "react";
import KanbanColumn from "./KanbanColumn";
import { Video, Phone, User, Clock } from "lucide-react";

const KanbanBoard: React.FC = () => {
  const urgentEvents = [
    {
      title: "Board Meeting",
      time: "9:00 AM - 10:30 AM",
      icon: Video,
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Client Call",
      time: "2:00 PM - 3:30 PM",
      icon: Phone,
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Investor Pitch",
      time: "4:00 PM - 5:00 PM",
      icon: User,
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Crisis Meeting",
      time: "6:00 PM - 7:00 PM",
      icon: Video,
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
  ];

  const importantEvents = [
    {
      title: "Team Standup",
      time: "8:30 AM - 9:00 AM",
      icon: Clock,
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      title: "Product Demo",
      time: "11:00 AM - 12:00 PM",
      icon: Video,
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      title: "Sprint Review",
      time: "1:00 PM - 2:00 PM",
      icon: User,
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      title: "Strategy Call",
      time: "3:30 PM - 4:00 PM",
      icon: Phone,
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  const regularEvents = [
    {
      title: "Design Review",
      time: "10:30 AM - 11:00 AM",
      icon: Phone,
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Code Review",
      time: "12:30 PM - 1:00 PM",
      icon: Clock,
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Weekly Sync",
      time: "5:30 PM - 6:00 PM",
      icon: Video,
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Coffee Chat",
      time: "7:00 PM - 7:30 PM",
      icon: User,
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
  ];

  const tomorrowEvents = [
    {
      title: "1:1 with CEO",
      time: "8:00 AM - 8:30 AM",
      icon: User,
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "All Hands",
      time: "9:00 AM - 10:00 AM",
      icon: Video,
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Planning",
      time: "2:00 PM - 4:00 PM",
      icon: Phone,
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Retrospective",
      time: "4:30 PM - 5:30 PM",
      icon: Clock,
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      <KanbanColumn
        title="Urgent"
        dotColor="bg-red-500"
        backgroundColor="bg-red-50"
        events={urgentEvents}
      />
      <KanbanColumn
        title="Important"
        dotColor="bg-orange-500"
        backgroundColor="bg-orange-50"
        events={importantEvents}
      />
      <KanbanColumn
        title="Regular"
        dotColor="bg-green-500"
        backgroundColor="bg-green-50"
        events={regularEvents}
      />
      <KanbanColumn
        title="Tomorrow"
        dotColor="bg-purple-500"
        backgroundColor="bg-purple-50"
        events={tomorrowEvents}
      />
    </div>
  );
};

export default KanbanBoard;
