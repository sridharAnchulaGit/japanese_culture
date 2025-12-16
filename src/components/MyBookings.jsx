// src/components/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";          // ✅ FIXED
import Footer from "./sections/Footer.jsx";        // ✅ FIXED

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const cancelBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">
          Your confirmed event registrations.
        </p>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <p className="text-gray-600 mb-4">
              You haven’t booked any events yet.
            </p>
            <Link
              to="/events"
              className="inline-block px-5 py-2 bg-rose-600 text-white rounded-lg"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">{b.eventTitle}</h2>
                  <p className="text-sm text-gray-600">Guests: {b.guests}</p>
                  <p className="text-xs text-gray-500">
                    Booked on {new Date(b.bookedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/events/${b.eventId}`}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                  >
                    View Event
                  </Link>

                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
