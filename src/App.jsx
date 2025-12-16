// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

/* ---------- AUTH ---------- */
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

/* ---------- CORE ---------- */
import HomePage from "./components/HomePage.jsx";
// import MyBookings from "./components/MyBookings.jsx";

/* ---------- SECTIONS ---------- */
import Events from "./components/sections/Events.jsx";
import EventDetails from "./components/sections/EventDetails.jsx";
import EventBooking from "./components/sections/EventBooking.jsx";
import MyEvents from "./components/sections/MyEvents.jsx";
import Places from "./components/sections/Places.jsx";
import Food from "./components/sections/Food.jsx";
import Culture from "./components/sections/Culture.jsx";
import Traditions from "./components/sections/Traditions.jsx";
import Articles from "./components/sections/Articles.jsx";
import Destinations from "./components/sections/Destinations.jsx";

import Settings from "./components/Settings.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

/* ---------- GUARD ---------- */
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ========== PROTECTED ROUTES ========== */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id/book"
          element={
            <ProtectedRoute>
              <EventBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />

        <Route
  path="/destinations"
  element={
    <ProtectedRoute>
      <Destinations />
    </ProtectedRoute>
  }
/>


        <Route
  path="/articles"
  element={
    <ProtectedRoute>
      <Articles />
    </ProtectedRoute>
  }
/>

        <Route
          path="/places"
          element={
            <ProtectedRoute>
              <Places />
            </ProtectedRoute>
          }
        />

        <Route
          path="/food"
          element={
            <ProtectedRoute>
              <Food />
            </ProtectedRoute>
          }
        />

        <Route
          path="/culture"
          element={
            <ProtectedRoute>
              <Culture />
            </ProtectedRoute>
          }
        />

        <Route
          path="/traditions"
          element={
            <ProtectedRoute>
              <Traditions />
            </ProtectedRoute>
          }
        />
        

        {/* ========== FALLBACK ========== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
