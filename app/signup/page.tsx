"use client";
import { useState } from "react";
import { authService } from "../../lib/simple-database";
import toast from "react-hot-toast";
import AuthLayout from "./components/AuthLayout";
import SignupForm from "./components/SignupForm";
import SocialLoginButton from "./components/SocialLoginButton";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    if (userData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const { error } = await authService.signUp(
      userData.email,
      userData.password,
      userData.username
    );

    if (error) {
      toast.error(error.message);
      setError(error.message);
    } else {
      toast.success("Account created! Check your email for confirmation.");
      window.location.href = "/login";
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <SocialLoginButton disabled={loading} setError={setError} />
      <SignupForm onSubmit={handleSignup} loading={loading} error={error} />
    </AuthLayout>
  );
}
