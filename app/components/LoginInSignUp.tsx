import { motion } from "framer-motion";
import Link from "next/link";
import { typography } from "../styles/typography";

interface navItems {
  name: string;
  href: string;
}

const LoginInSignUp = ({ navItems, current, setHovered } : {
   navItems: navItems[];
   current: string;
   setHovered: (name: string | null) => void;
}) => {
  return (
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
