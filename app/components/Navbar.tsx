import Link from "next/link";
import { Clock } from "lucide-react";
import { typography } from "../styles/typography";

interface NavbarProps {
  showBackButton?: boolean;
}

export default function Navbar({ showBackButton = false }: NavbarProps) {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl text-gray-900" style={typography.brand}>
              MinuteMade
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
