import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    alert("Account created successfully! Please check your email to verify.");
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background2.jpg')" }}
    >
      <div className="w-full max-w-md mx-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && <p className="text-red-400 text-center mb-3">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
            required
          />
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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border-0 px-4 py-3 bg-white/80 text-gray-900 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-300 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
