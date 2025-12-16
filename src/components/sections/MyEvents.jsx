// src/components/sections/MyEvents.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";

export default function MyEvents() {
  const [savedEvents, setSavedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    setSavedEvents(saved);
    setBookedEvents(bookings);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">My Events</h1>
        <p className="text-gray-600 mb-10">
          Your saved and booked events in one place.
        </p>

        {/* ✅ BOOKED EVENTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            ✅ Booked Events
          </h2>

          {bookedEvents.length === 0 ? (
            <p className="text-gray-500">No events booked yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedEvents.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl shadow p-5 border border-green-100"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {b.eventTitle}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Guests: {b.guests}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Booked on {new Date(b.bookedAt).toLocaleString()}
                  </p>

                  <Link
                    to={`/events/${b.eventId}`}
                    className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    View Event
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ❤️ SAVED EVENTS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            ❤️ Saved Events
          </h2>

          {savedEvents.length === 0 ? (
            <p className="text-gray-500">No saved events yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl shadow p-5 border border-rose-100"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {evt.date}
                  </p>

                  <p className="text-sm text-gray-600 mb-2">
                    {evt.location}
                  </p>

                  <Link
                    to={`/events/${evt.id}`}
                    className="inline-block px-4 py-2 bg-rose-600 text-white rounded-lg text-sm"
                  >
                    View Event
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
