import { motion } from "framer-motion";
import Link from "next/link";
import { typography } from "../styles/typography";

interface navItems {
  name: string;
  href: string;
}

const LoginInSignUp = ({
  navItems,
  current,
  setHovered,
}: {
  navItems: navItems[];
  current: string;
  setHovered: (name: string | null) => void;
}) => {
  return (
    <div className="relative flex rounded-md p-1 md:p-2 lg:p-3">
      {navItems.map((item) => {
        const isSelected = current === item.name;
        return (
          <Link
            key={item.name}
            href={item.href}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4text-sm sm:text-base md:text-lg lg:text-xl font-medium rounded-md transition-colors duration-200"
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
                isSelected ? "text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default LoginInSignUp;
