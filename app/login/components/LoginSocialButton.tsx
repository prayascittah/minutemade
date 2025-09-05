import GoogleIcon from "../../components/icons/GoogleIcon";
import { typography } from "../../styles/typography";

interface LoginSocialButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function LoginSocialButton({
  onClick,
  disabled = false,
}: LoginSocialButtonProps) {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-7">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-black"
          style={typography.tagline}
        >
          Welcome back
        </h1>
      </div>

      {/* Google Button */}
      <div className="space-y-3 mb-2 flex flex-col items-center">
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-80 flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-all duration-200 bg-white text-black font-medium text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          style={typography.button}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      {/* Elegant Divider */}
      <div className="relative flex py-6 items-center w-80 mx-auto">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
          Or continue with email
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
}
