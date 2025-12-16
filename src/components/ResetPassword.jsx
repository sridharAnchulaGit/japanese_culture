// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // ✅ Update password in Supabase
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      // ✅ Immediately invalidate old sessions
      await supabase.auth.signOut();

      setSuccess("Password updated successfully! Please log in with your new password.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="w-full max-w-md mx-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}
        {success && <p className="text-green-400 text-center mb-3">{success}</p>}

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
