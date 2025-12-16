// src/components/Navigation.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-rose-600 text-white"
        : "text-gray-700 hover:text-rose-600"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="text-xl font-bold text-rose-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          JapanCulture
        </div>

        {/* NAV LINKS */}
        {user && (
          <div className="flex items-center gap-2">
            

            {/* <NavLink to="/my-bookings" className={linkClass}>
              My Bookings ✅
            </NavLink> */}

            <NavLink to="/places" className={linkClass}>
              Places
            </NavLink>

            <NavLink to="/food" className={linkClass}>
              Food
            </NavLink>

            <NavLink to="/culture" className={linkClass}>
              Culture
            </NavLink>

            <NavLink to="/traditions" className={linkClass}>
              Traditions
            </NavLink>

            <NavLink to="/events" className={linkClass}>
              Events
            </NavLink>

            <NavLink to="/my-events" className={linkClass}>
              My Events 
            </NavLink>
            <NavLink to="/Articles" className={linkClass}>
              Articles
            </NavLink>
            <NavLink to="/destinations" className={linkClass}>
              Destinations
            </NavLink>
              
          </div>
        )}

        {/* LOGOUT */}
        {user && (
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
