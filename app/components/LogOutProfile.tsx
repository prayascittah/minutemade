"use client";
import { useState, useEffect, useRef } from "react";
import { typography } from "../styles/typography";
import { authService, Profile } from "@/lib/simple-database";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";

interface LogOutProfileProps {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
}

const LogOutProfile = ({ user, setUser }: LogOutProfileProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      name: "publicprofile",
      label: "Public profile",
      icon: <User className="w-4 h-4" />,
      action: () => router.push("/publicprofile"),
    },
    {
      name: "settings",
      label: "Account settings",
      icon: <Settings className="w-4 h-4" />,
      action: () => router.push("/profile/setting"),
    },
    {
      name: "logout",
      label: "Sign out",
      icon: <LogOut className="w-4 h-4" />,
      action: handleLogout,
    },
  ];

  async function handleLogout() {
    const loadingToast = toast.loading("Logging out...");
    setIsOpen(false);

    const { error } = await authService.signOut();
    toast.dismiss(loadingToast);

    if (!error) {
      setUser(null);
      toast.success("Successfully logged out!");
      router.push("/");
    } else {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < menuItems.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : menuItems.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            menuItems[highlightedIndex].action();
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, menuItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          onMouseLeave={() => {
            setIsOpen(false);
            setHighlightedIndex(-1);
          }}
        >
          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => {
                item.action();
                setIsOpen(false);
                setHighlightedIndex(-1);
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
