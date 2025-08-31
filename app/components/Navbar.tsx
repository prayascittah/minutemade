"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { typography } from "../styles/typography";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Log In", href: "/login" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const active = navItems.find((i) => i.href === pathname)?.name || "Sign Up";
  const current = hovered || active;

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

          <div className="relative flex rounded-md p-0.5 sm:p-1">
            {navItems.map((item) => {
              const isSelected = current === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="slider"
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
                    className={`relative z-10 whitespace-nowrap transition-colors duration-200 ${
                      isSelected
                        ? "text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
