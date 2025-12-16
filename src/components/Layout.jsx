// src/components/Layout.jsx
import React from "react";
import Navigation from "./Navigation.jsx";
import Footer from "./sections/Footer.jsx";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar with animation */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.6 }}
      >
        <Navigation />
      </motion.div>

      {/* Page content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
