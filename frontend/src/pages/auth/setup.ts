import React, { useState } from "react";

export default function SlidingOverlayAuthPage() {
  const [Signupequest, setIsSignUp] = useState(false);

  return (
    <>
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.22),_transparent_35%)]" />

        <div className="relative grid min-h-[760px] lg:grid-cols-2">
          {/* Left: Forms */}
          <div className="relative grid overflow-hidden lg:col-span-1">
            {/* Sign In */}
            <section
              className={
                "absolute inset-0 flex items-center justify-center px-6 py-10 transition-all duration-700 ease-in-out " +
                (SignupRequest
                  ? "pointer-events-none translate-x-[-100%] opacity-0 lg:translate-x-[-20%]"
                  : "pointer-events-auto translate-x-0 opacity-100")
              }
              aria-hidden={SignupRequest}
            >
              <form className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="mb-8">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-300/90">
                    Welcome back
                  </p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                    Sign in
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Continue where you left off with a clean, fast, and elegant
                    login flow.
                  </p>
                </div>

                <div className="space-y-4">
                  <InputField label="Email" type="email" placeholder="you@example.com" />
                  <InputField label="Password" type="password" placeholder="••••••••" />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                  <button type="button" className="font-medium text-blue-300 hover:text-blue-200">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Sign In
                </button>

                <p className="mt-6 text-center text-sm text-slate-400 lg:hidden">
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="font-semibold text-white underline decoration-white/40 underline-offset-4"
                  >
                    Create an account
                  </button>
                </p>
              </form>
            </section>

            {/* Sign Up */}
            <section
              className={
                "absolute inset-0 flex items-center justify-center px-6 py-10 transition-all duration-700 ease-in-out " +
                (SignupRequest
                  ? "pointer-events-auto translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-[100%] opacity-0 lg:translate-x-[20%]")
              }
              aria-hidden={!SignupRequest}
            >
              <form className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="mb-8">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-fuchsia-300/90">
                    Start now
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                    Create account
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Build a polished registration flow with a smooth sliding
                    transition and no page jump.
                  </p>
                </div>

                <div className="space-y-4">
                  <InputField label="Name" type="text" placeholder="Your name" />
                  <InputField label="Email" type="email" placeholder="you@example.com" />
                  <InputField label="Password" type="password" placeholder="Create a password" />
                </div>

                <label className="mt-4 flex items-start gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-fuchsia-500 focus:ring-fuchsia-500"
                  />
                  <span>
                    I agree to the <span className="text-white">Terms</span> and
                    <span className="text-white"> Privacy Policy</span>.
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-8 w-full rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Create Account
                </button>

                <p className="mt-6 text-center text-sm text-slate-400 lg:hidden">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="font-semibold text-white underline decoration-white/40 underline-offset-4"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </section>
          </div>

          {/* Right: Sliding overlay */}
          <div
            className={
              "absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block transition-transform duration-700 ease-in-out " +
              (SignupRequest ? "translate-x-[-100%]" : "translate-x-0")
            }
          >
            <div className="relative flex h-full w-[200%]">
              <aside className="flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 px-10 text-center">
                <OverlayPanel
                  title="New here?"
                  description="Join in a second and unlock the full experience."
                  buttonLabel="Create account"
                  onClick={() => setIsSignUp(true)}
                />
              </aside>
              <aside className="flex w-1/2 items-center justify-center bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-blue-600 px-10 text-center">
                <OverlayPanel
                  title="One of us already?"
                  description="Jump back in and continue right where you left off."
                  buttonLabel="Sign in"
                  onClick={() => setIsSignUp(false)}
                />
              </aside>
            </div>
          </div>

          {/* Mobile switcher */}
          <div className="relative z-10 flex items-end justify-center border-t border-white/10 bg-slate-950/70 p-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSignUp((prev) => !prev)}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15"
            >
              {SignupRequest ? "Back to sign in" : "Switch to sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function InputField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-white/20 focus:bg-white/10 focus:ring-2 focus:ring-white/10"
      />
    </label>
  );
}

function OverlayPanel({
  title,
  description,
  buttonLabel,
  onClick,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="max-w-sm text-white">
      <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
        Sliding Overlay
      </div>
      <h3 className="text-4xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-4 text-base leading-7 text-white/85">{description}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 rounded-full border border-white/25 bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
