"use client";
import { useRouter } from "next/navigation";
import { typography } from "../styles/typography";
import { Profile } from "@/lib/simple-database";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useProfileDropdown } from "../hooks/useProfileDropdown";

interface LogOutProfileProps {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
}

const LogOutProfile = ({ user, setUser }: LogOutProfileProps) => {
  const router = useRouter();
  const {
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    dropdownRef,
    menuItems,
    closeDropdown,
  } = useProfileDropdown({ user, setUser });

  // Define icons for menu items
  const menuItemsWithIcons = [
    { ...menuItems[0], icon: <User className="w-4 h-4" /> },
    { ...menuItems[1], icon: <Settings className="w-4 h-4" /> },
    { ...menuItems[2], icon: <LogOut className="w-4 h-4" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => router.push("/profile")}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
        style={typography.button}
      >
        <div className="w-6 h-6 rounded-md flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>

        {/* Username */}
        <span className="hidden sm:block text-sm font-medium text-gray-700">
          {user?.username || "User"}
        </span>

        {/* Dropdown arrow */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
          onMouseLeave={() => closeDropdown()}
        >
          {/* Menu Items */}
          {menuItemsWithIcons.map((item, index) => (
            <button
              key={item.name}
              onClick={() => {
                item.action();
                closeDropdown();
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full flex items-center space-x-3 p-1.5 text-xs transition-colors ${
                highlightedIndex === index || item.name === "logout"
                  ? highlightedIndex === index
                    ? "bg-gray-100 text-gray-900"
                    : item.name === "logout"
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              style={typography.button}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogOutProfile;
