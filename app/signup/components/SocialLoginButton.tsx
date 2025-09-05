import GoogleIcon from "../../components/icons/GoogleIcon";
import { typography } from "../../styles/typography";
import { authService } from "../../../lib/simple-database";
import toast from "react-hot-toast";

interface SocialLoginButtonProps {
  setError: (error: string) => void;
  disabled?: boolean;
}

export default function SocialLoginButton({
  setError,
  disabled = false,
}: SocialLoginButtonProps) {
  const handleGoogleSignup = async () => {
    const { error } = await authService.signInWithOAuth("google");
    if (error) {
      toast.error(`Google signup failed: ${error.message}`);
      setError(error.message);
    }
  };
  return (
    <div>
      {/* Form Header */}
      <div className="mb-6">
        <h1
          className="text-2xl md:text-3xl font-bold text-black mb-2"
          style={typography.tagline}
        >
          Create your MinuteMade account
        </h1>
        <p className="text-gray-600 text-sm" style={typography.status}>
          Free for individuals. Team plans for collaborative features.
        </p>
      </div>

      {/* Social Login Button */}
      <div className="space-y-3 mb-2 flex flex-col items-center">
        <button
          onClick={handleGoogleSignup}
          disabled={disabled}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 hover:border-gray-400 transition-colors bg-white text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
