// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showReset, setShowReset] = useState(false); // ✅ reset modal toggle
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const { loginWithEmail, resetPassword } = useAuth(); // ✅ includes resetPassword
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // 🔹 Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset password handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");

    try {
      await resetPassword(resetEmail);
      setResetMessage("✅ Password reset link sent! Check your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="w-full max-w-md mx-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}
        {resetMessage && <p className="text-green-400 text-center mb-3">{resetMessage}</p>}

        {/* ✅ If reset password is active */}
        {showReset ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700"
            >
              Send Reset Link
            </button>
            <p
              className="text-sm text-center mt-2 cursor-pointer text-gray-300 hover:underline"
              onClick={() => setShowReset(false)}
            >
              🔙 Back to Login
            </p>
          </form>
        ) : (
          <>
            {/* ✅ Normal login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* ✅ Forgot password link */}
            <p
              className="text-sm text-center mt-4 cursor-pointer text-gray-300 hover:underline"
              onClick={() => setShowReset(true)}
            >
              Forgot Password?
            </p>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-red-300 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
