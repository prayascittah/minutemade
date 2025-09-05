import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService, Profile } from "@/lib/simple-database";

interface UseProfileDropdownProps {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
}

interface MenuItem {
  name: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

// Extracted logout handler
const createLogoutHandler = (
  setUser: (user: Profile | null) => void,
  setIsOpen: (isOpen: boolean) => void,
  router: ReturnType<typeof useRouter>
) => {
  return async () => {
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
  };
};

// Extracted menu items creator
const createMenuItems = (
  router: ReturnType<typeof useRouter>,
  logoutHandler: () => void
): MenuItem[] => [
  {
    name: "publicprofile",
    label: "Public profile",
    icon: null, // Will be passed from component
    action: () => router.push("/publicprofile"),
  },
  {
    name: "settings",
    label: "Account settings",
    icon: null, // Will be passed from component
    action: () => router.push("/profile/setting"),
  },
  {
    name: "logout",
    label: "Sign out",
    icon: null, // Will be passed from component
    action: logoutHandler,
  },
];

// Extracted keyboard handler
const createKeyboardHandler = (
  isOpen: boolean,
  menuItems: MenuItem[],
  setHighlightedIndex: (fn: (prev: number) => number) => void,
  setIsOpen: (isOpen: boolean) => void,
  highlightedIndex: number
) => {
  return (e: KeyboardEvent) => {
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
        setHighlightedIndex(() => -1);
        break;
    }
  };
};

// Extracted click outside handler
const createClickOutsideHandler = (
  dropdownRef: React.RefObject<HTMLDivElement | null>,
  setIsOpen: (isOpen: boolean) => void,
  setHighlightedIndex: (fn: (prev: number) => number) => void
) => {
  return (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setHighlightedIndex(() => -1);
    }
  };
};

// Extracted dropdown closer
const createDropdownCloser = (
  setIsOpen: (isOpen: boolean) => void,
  setHighlightedIndex: (fn: (prev: number) => number) => void
) => {
  return () => {
    setIsOpen(false);
    setHighlightedIndex(() => -1);
  };
};

export const useProfileDropdown = ({
  user,
  setUser,
}: UseProfileDropdownProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Create handlers using extracted functions
  const handleLogout = createLogoutHandler(setUser, setIsOpen, router);
  const menuItems = createMenuItems(router, handleLogout);
  const closeDropdown = createDropdownCloser(setIsOpen, setHighlightedIndex);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = createKeyboardHandler(
      isOpen,
      menuItems,
      setHighlightedIndex,
      setIsOpen,
      highlightedIndex
    );

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, menuItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = createClickOutsideHandler(
      dropdownRef,
      setIsOpen,
      setHighlightedIndex
    );

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    dropdownRef,
    menuItems,
    closeDropdown,
  };
};
