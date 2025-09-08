"use client";
import { useState } from "react";
import { authService } from "../../lib/simple-database";
import toast from "react-hot-toast";
import LoginLayout from "./components/LoginLayout";
import LoginSocialButton from "./components/LoginSocialButton";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (userData: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    const { data, error } = await authService.signIn(
      userData.email,
      userData.password
    );

    if (error) {
      toast.error(error.message);
      setError(error.message);
    } else {
      toast.success("Successfully logged in!");
      window.location.href = "/home";
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    const { data, error } = await authService.signInWithOAuth("google");
    if (error) {
      toast.error(`Google login failed: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <LoginLayout>
      <LoginSocialButton onClick={handleGoogleSignup} disabled={loading} />
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </LoginLayout>
  );
}
