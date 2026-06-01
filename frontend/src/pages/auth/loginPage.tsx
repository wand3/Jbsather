import EthosBody from "../../components/body";
import React, { useEffect, useState } from "react";

type IconProps = {
    className?: string;
  };

const GoogleIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const FacebookIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.68 4.54-4.68 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);


const LoginPage = () => {
    
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
      {/* <EthosBody nav={false}> */}
        {/* <section className="relative z-10 mt-[-4.75rem]"> */}
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Get started!</h1>
                    <p className="text-gray-500">Join our amazing community of music lovers</p>
                </div>

                <div className="space-y-3">
                    <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                    <GoogleIcon />
                    Continue with Google
                    </button>

                    <button
                    type="button"
                    onClick={handleFacebookSignup}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                    <FacebookIcon />
                    Continue with Facebook
                    </button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-3 text-gray-400">or use your email</span>
                    </div>
                </div>

                <form onSubmit={handleEmailSignup} className="space-y-4">
                    <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        disabled={isLoading}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        disabled={isLoading}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

                    <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                    {isLoading ? (
                        <>
                        <svg
                            className="h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Creating account...
                        </>
                    ) : (
                        "Sign up with email"
                    )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                    Are you an artist?{" "}
                    <a
                        href="/musixmatch-pro"
                        onClick={handleArtistLink}
                        className="font-semibold text-gray-900 underline-offset-2 transition hover:underline"
                    >
                        Go to Musixmatch Pro
                    </a>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
                </div>
            </div>
        {/* </section>           */}
      {/* </EthosBody> */}
    </>
  );
};


export default LoginPage;
