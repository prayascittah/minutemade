import React from "react";

const WindowHeader: React.FC = () => {
  return (
    <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="flex-1 text-center">
        <span className="text-gray-800 text-sm font-bold">MinuteMade</span>
      </div>
    </div>
  );
};

export default WindowHeader;
