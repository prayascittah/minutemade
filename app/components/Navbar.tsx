"use client";

import Link from "next/link";
import { Profile } from "@/lib/simple-database";
import { authService, profileService } from "@/lib/simple-database";
import { Clock } from "lucide-react";
import { typography } from "../styles/typography";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoginInSignUp from "./LoginInSignUp";
import LogOutProfile from "./LogOutProfile";

const navItems = [
  { name: "Log In", href: "/login" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  // state variable
  // for the signed in user
  const [user, setUser] = useState<Profile | null>(null);
  // for the loading state
  const [loading, setLoading] = useState(true);
  // for the auth user hovering
  const [userNavHovered, setUserNavHovered] = useState<string | null>(null);
  // for the active user nav item
  const [activeUserNav, setActiveUserNav] = useState<string>("logout");
  // specify the path of the url
  const pathname = usePathname();
  // for the signup - login hover
  const [hovered, setHovered] = useState<string | null>(null);
  // for the signup - login nav item
  const active = navItems.find((i) => i.href === pathname)?.name || "Sign Up";
  // for the current nav item in the signup - login
  const current = hovered || active;
  // for the current nav item in the auth user
  const currentUserNav = userNavHovered || activeUserNav;

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await authService.getCurrentUser();

        if (error) {
          console.error("Auth error:", error);
          setUser(null);
          return;
        }

        const userid = data?.user?.id;

        if (userid) {
          const { data: profile, error: profileError } =
            await profileService.getProfile(userid);

          if (profileError) {
            console.error("Profile fetch error:", profileError);
            setUser(null);
          } else {
            setUser(profile);
          }
        } else {
          console.log("No user authenticated");
          setUser(null);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    getUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);

      if (event === "SIGNED_IN" && session?.user?.id) {
        const { data: profile } = await profileService.getProfile(
          session.user.id
        );
        setUser(profile);
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-2 sm:mx-4 md:mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-85 transition-opacity"
          >
            <div className="hidden sm:flex w-6 h-6 sm:w-8 sm:h-8 bg-gray-900 rounded-lg items-center justify-center">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span
              className="text-lg sm:text-xl md:text-xl text-gray-900 font-semibold"
              style={typography.brandExtraBold}
            >
              MinuteMade
            </span>
          </Link>
          {loading ? (
            <div className="relative flex rounded-md p-0.5 sm:p-1">
              <div className="relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-xs sm:text-sm font-medium rounded-md">
                <div className="bg-gray-200 animate-pulse rounded-md h-7 w-12 sm:w-14"></div>
              </div>
              <div className="relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-xs sm:text-sm font-medium rounded-md">
                <div className="bg-gray-200 animate-pulse rounded-md h-7 w-16 sm:w-18"></div>
              </div>
            </div>
          ) : user ? (
            <LogOutProfile
              user={user}
              currentUserNav={currentUserNav}
              setActiveUserNav={setActiveUserNav}
              setUserNavHovered={setUserNavHovered}
              setUser={setUser}
            />
          ) : (
            <LoginInSignUp
              navItems={navItems}
              current={current}
              setHovered={setHovered}
            />
          )}
        </div>
      </div>
    </header>
  );
}
