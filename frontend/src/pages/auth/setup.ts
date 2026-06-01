import React, { useState } from "react";
import EthosBody from "../../components/body";





const AuthCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Sign-up failed");
      }

      alert("Account created successfully!");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    alert("Google sign-up flow would integrate with your backend OAuth endpoint.");
  };

  const handleFacebookSignup = () => {
    alert("Facebook sign-up flow would integrate with your backend OAuth endpoint.");
  };

  const handleArtistLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("Navigate to Musixmatch Pro sign-up flow");
  };

  return (
    <>
      <EthosBody>
        
      </EthosBody>
    </>
    );
};

export default AuthCard;