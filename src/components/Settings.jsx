import React, { useState } from "react";
import Navigation from "./Navigation.jsx";
import Footer from "./sections/Footer.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(user?.user_metadata?.name || "");

  const handleProfileSave = () => {
    alert("✅ Profile updated (mock)");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">⚙️ Settings</h1>

        {/* ✅ Edit Profile */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          <p className="text-sm text-gray-500 mb-2">
            Email: {user?.email}
          </p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display name"
            className="border px-3 py-2 w-full rounded-lg mb-4"
          />

          <button
            onClick={handleProfileSave}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg"
          >
            Save Profile
          </button>
        </div>

        {/* ✅ Theme Switch */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Change Theme</h2>

          <div className="flex gap-4">
            {["pink", "light", "dark"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === t ? "bg-pink-600 text-white" : ""
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
