// src/components/sections/EventBooking.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";
import { allEvents } from "./eventsData.js";

export default function EventBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = allEvents.find(e => String(e.id) === id);

  const [form, setForm] = useState({ name: "", email: "", guests: 1 });
  const [confirmed, setConfirmed] = useState(null);

  if (!event) return <p>Event not found</p>;

  const submit = (e) => {
    e.preventDefault();
    const booking = {
      id: Date.now(),
      eventId: event.id,
      ...form,
      createdAt: new Date().toISOString(),
    };
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([booking, ...bookings]));
    setConfirmed(booking);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>

        {confirmed ? (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-green-600 font-semibold mb-3">
              Booking Confirmed ✅
            </h2>
            <p>Name: {confirmed.name}</p>
            <p>Guests: {confirmed.guests}</p>

            <Link to="/" className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded">
              Go Home
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
            <input
              placeholder="Full Name"
              required
              className="w-full border p-2 rounded"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="w-full border p-2 rounded"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="number"
              min={1}
              className="w-full border p-2 rounded"
              value={form.guests}
              onChange={e => setForm({ ...form, guests: e.target.value })}
            />

            <div className="flex gap-2">
              <button className="flex-1 bg-red-600 text-white py-2 rounded">
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
