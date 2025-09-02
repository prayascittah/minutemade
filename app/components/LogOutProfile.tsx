"use client";
import { typography } from "../styles/typography";
import { authService, Profile } from "@/lib/simple-database";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserNavItem {
  name: string;
  label: string;
}

interface LogOutProfileProps {
  user: Profile | null;
  currentUserNav: string;
  setActiveUserNav: (nav: string) => void;
  setUserNavHovered: (nav: string | null) => void;
  setUser: (user: Profile | null) => void;
}

const LogOutProfile = ({
  user,
  currentUserNav,
  setActiveUserNav,
  setUserNavHovered,
  setUser,
}: LogOutProfileProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");

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
  };

  const userNavItems: UserNavItem[] = [
    { name: "logout", label: "Logout" },
    { name: "profile", label: user?.username || "Profile" },
  ];

  return (
    <div className="relative flex rounded-md p-0.5 sm:p-1">
      {userNavItems.map((item) => {
        const isSelected = currentUserNav === item.name;
        return (
          <button
            key={item.name}
            onClick={() => {
              setActiveUserNav(item.name);
              if (item.name === "logout") {
                handleLogout();
              } else if (item.name === "profile") {
                router.push("/profile");
              }
            }}
            onMouseEnter={() => setUserNavHovered(item.name)}
            onMouseLeave={() => setUserNavHovered(null)}
            className="relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200"
          >
            {isSelected && (
              <motion.div
                layoutId="userSlider"
                className="absolute inset-0 bg-black rounded-md"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span
              style={typography.button}
              className={`relative z-10 whitespace-nowrap transition-colors duration-200 flex items-center gap-2 ${
                isSelected ? "text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {item.name === "profile" && user?.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={user.username || "User"}
                  className="w-4 h-4 rounded-full"
                />
              )}
              {item.name === "profile" && !user?.avatar_url && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
              {item.name === "logout" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default LogOutProfile;
