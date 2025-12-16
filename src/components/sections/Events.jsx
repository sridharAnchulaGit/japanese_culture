// src/components/sections/Events.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";
import { allEvents } from "./eventsData.js";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EventsPage() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    // simulate API delay (real app feel)
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
    setSavedIds(saved.map(e => e.id));
  }, []);

  const locations = ["All", ...new Set(allEvents.map(e => e.location))];

  const filteredEvents =
    selectedLocation === "All"
      ? allEvents
      : allEvents.filter(e => e.location === selectedLocation);

  const handleSave = (event) => {
    const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
    const exists = saved.some(e => e.id === event.id);

    let updated;
    if (exists) {
      updated = saved.filter(e => e.id !== event.id);
      setToast({ type: "neutral", text: "Removed from saved" });
    } else {
      updated = [...saved, event];
      setToast({ type: "success", text: "Saved to My Events" });
    }

    localStorage.setItem("savedEvents", JSON.stringify(updated));
    setSavedIds(updated.map(e => e.id));
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      {/* ---------- HERO ---------- */}
      <section className="bg-gradient-to-br from-rose-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover Events Across Japan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Festivals, cultural experiences, exhibitions, and seasonal
            celebrations — curated for travelers and culture lovers.
          </p>
        </div>
      </section>

      {/* ---------- TOAST ---------- */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-gray-900 text-white"
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}

      {/* ---------- MAIN ---------- */}
      <main className="flex-grow max-w-7xl mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ---------- FILTER SIDEBAR ---------- */}
          <aside className="lg:w-1/4">
            <div className="bg-white border rounded-2xl p-5 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Filter by Location</h2>
              <ul className="space-y-2">
                {locations.map(loc => (
                  <li key={loc}>
                    <button
                      onClick={() => setSelectedLocation(loc)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedLocation === loc
                          ? "bg-rose-600 text-white"
                          : "hover:bg-rose-50 text-gray-700"
                      }`}
                    >
                      {loc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ---------- EVENTS GRID ---------- */}
          <section className="lg:w-3/4">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-gray-200 rounded-3xl animate-pulse"
                  />
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <p className="text-center text-gray-600 py-20">
                No events available for this location.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(evt => {
                  const isSaved = savedIds.includes(evt.id);

                  return (
                    <div
                      key={evt.id}
                      data-aos="fade-up"
                      className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
                    >
                      {/* Image */}
                      <div className="relative h-44">
                        <img
                          src={evt.cover}
                          alt={evt.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                          {evt.interest}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <h3 className="text-lg font-semibold leading-snug">
                          {evt.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {evt.location} · {evt.date}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {evt.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="p-5 pt-0 flex gap-2">
                        <Link
                          to={`/events/${evt.id}`}
                          className="flex-1 text-center py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleSave(evt)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            isSaved
                              ? "bg-yellow-300 border-yellow-300"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {isSaved ? "❤️" : "♡"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
