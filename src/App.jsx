import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import "./App.css";
import { auth } from "./firebase-config";
import { useState } from "react";

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

// GitHub private email access
githubProvider.addScope("user:email");

function App() {
  const [user, setUser] = useState(null);

  // Google Login
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log("Google Login Error:", error);
      });
  };

  // GitHub Login
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);

        console.log("GitHub User:", result.user);
        console.log("GitHub Credential:", result);
      })
      .catch((error) => {
        console.log("GitHub Login Error:", error);
      });
  };

  // Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("Sign Out Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-emerald-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-emerald-400 shadow-lg shadow-blue-500/20">
              <span className="text-2xl font-bold text-white">RA</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
             Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Sign in to continue to your account
            </p>
          </div>

          {/* Login Buttons */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="w-full rounded-xl bg-linear-to-r from-red-500 to-rose-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-500/20 transition duration-200 hover:from-red-600 hover:to-rose-700 hover:shadow-red-500/30 active:scale-[0.98]"
            >
              Sign Out
            </button>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-5 py-3.5 font-semibold text-slate-800 shadow-lg transition duration-200 hover:bg-slate-100 active:scale-[0.98]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.805 10.023h-.853V10H12v4h5.651a6.004 6.004 0 1 1-1.677-6.39l2.829-2.829A10 10 0 1 0 22 12c0-.668-.069-1.319-.195-1.977Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 6a5.996 5.996 0 0 1 3.974 1.61l2.829-2.829A9.97 9.97 0 0 0 12 2v4Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M12 22a9.97 9.97 0 0 0 6.603-2.506l-3.08-2.466A5.99 5.99 0 0 1 12 18v4Z"
                    fill="#34A853"
                  />
                  <path
                    d="M2 12c0 5.523 4.477 10 10 10v-4a6 6 0 0 1-5.651-4H2Z"
                    fill="#FBBC05"
                  />
                </svg>

                Sign in With Google
              </button>

              <button
                onClick={handleGithubSignIn}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white shadow-lg transition duration-200 hover:bg-slate-800 active:scale-[0.98]"
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.1c1.02 0 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                </svg>

                Sign in With GitHub
              </button>
            </div>
          )}

          {/* User Information */}
          {user && (
            <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              
              {/* Profile */}
              <div className="flex flex-col items-center border-b border-white/10 px-6 py-7">
                <div className="rounded-full bg-linear-to-br from-blue-400 to-emerald-400 p-1 shadow-xl shadow-blue-500/20">
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    width="120"
                    height="120"
                    className="h-28 w-28 rounded-full object-cover border-4 border-slate-900"
                  />
                </div>

                <h2 className="mt-4 text-xl font-bold text-white">
                  {user.displayName || "No Name"}
                </h2>

                <span className="mt-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Successfully Signed In
                </span>
              </div>

              {/* Details */}
              <div className="space-y-4 p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-white">
                    {user.email || "No Email Found"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Login Provider
                  </p>
                  <p className="mt-1 text-sm font-medium text-blue-300">
                    {user.providerData[0]?.providerId || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    User ID
                  </p>
                  <p className="mt-1 break-all font-mono text-xs text-slate-300">
                    {user.uid}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            Secure authentication powered by Firebase
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;