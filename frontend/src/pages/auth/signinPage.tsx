import { FacebookIcon, GoogleIcon } from "../../components/auth/icons";
import EthosBody from "../../components/body";
import React, { useEffect, useState } from "react";
import UseApi from "../../hooks/useApi";
import Config from "../../config";

const SigninPage = () => {

    
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const api = UseApi();

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

    // try {
    //   const response = await api.post<
    //     SignupRequest,
    //     SignupResponse
    //   >("/auth/hunt", {
    //     email,
    //     password,
    //   });
    
    //   if (!response.ok) {
    //     throw new Error(
    //       response.errors?.message ?? "Sign-up failed"
    //     );
    //   }
    
    //   alert(response.body?.message ?? "Account created successfully!");
    
    //   setEmail("");
    //   setPassword("");
    //   setError("");
    // } catch (err) {
    //   setError(
    //     err instanceof Error
    //       ? err.message
    //       : "Something went wrong. Please try again."
    //   );
    // } finally {
    //   setIsLoading(false);
    }

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


export default SigninPage;
