// src/components/sections/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";
import { allEvents } from "./eventsData.js";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = allEvents.find((e) => String(e.id) === String(id));

  const [saved, setSaved] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // ✅ CHECK SAVED
    const savedList = JSON.parse(localStorage.getItem("savedEvents")) || [];
    setSaved(savedList.some((s) => String(s.id) === String(id)));

    // ✅ CHECK BOOKED
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const found = bookings.find((b) => String(b.eventId) === String(id));
    setBooking(found || null);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-grow max-w-4xl mx-auto py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Event not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            ← Go Back
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  /* ✅ SAVE / UNSAVE */
  const toggleSave = () => {
    const list = JSON.parse(localStorage.getItem("savedEvents")) || [];
    if (saved) {
      localStorage.setItem(
        "savedEvents",
        JSON.stringify(list.filter((s) => s.id !== event.id))
      );
      setSaved(false);
    } else {
      localStorage.setItem("savedEvents", JSON.stringify([...list, event]));
      setSaved(true);
    }
  };

  /* ✅ CANCEL BOOKING */
  const cancelBooking = () => {
    if (!window.confirm("Cancel this booking?")) return;

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = bookings.filter((b) => b.eventId !== event.id);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBooking(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 via-white to-gray-50">
      <Navigation />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative h-72 md:h-96">
          <img
            src={event.cover}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative max-w-6xl mx-auto px-6 h-full flex items-end pb-6">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold">
                {event.title}
              </h1>
              <p className="mt-2">
                {event.date} · {event.location}
              </p>
              <p className="text-green-300 font-semibold mt-1">Free Entry</p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-3">About this event</h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>

            {/* ACTIONS */}
            <div className="mt-8 flex gap-3 flex-wrap">
              {!booking && (
                <Link
                  to={`/events/${event.id}/book`}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg shadow"
                >
                  ✅ Book Event
                </Link>
              )}

              {booking && (
                <button
                  onClick={cancelBooking}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow"
                >
                  ❌ Cancel Booking
                </button>
              )}

              <button
                onClick={toggleSave}
                className={`px-4 py-2 rounded-lg border ${
                  saved
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-800"
                }`}
              >
                {saved ? "♥ Saved" : "♡ Save"}
              </button>
            </div>

            {booking && (
              <p className="mt-4 text-sm text-green-700">
                ✅ You booked this event on{" "}
                {new Date(booking.bookedAt).toLocaleString()}
              </p>
            )}
          </div>

          {/* SIDE PANEL */}
          <aside className="bg-white rounded-2xl shadow p-5 border sticky top-6">
            <p className="text-2xl font-bold text-green-600">Free Entry</p>
            {!booking ? (
              <Link
                to={`/events/${event.id}/book`}
                className="block w-full mt-4 text-center px-4 py-2 bg-rose-600 text-white rounded-lg"
              >
                Proceed to Book
              </Link>
            ) : (
              <button
                onClick={cancelBooking}
                className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Cancel Booking
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className="w-full mt-3 px-4 py-2 bg-gray-200 rounded-lg"
            >
              ← Back
            </button>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
