import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin } from "lucide-react";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";

/* ================= DATA (UNCHANGED) ================= */
const traditions = [
  {
    title: "Hanami (花見)",
    location: "Tokyo & Kyoto",
    description: "The custom of enjoying the beauty of cherry blossoms in full bloom.",
    image: "/hanami.jpg",
    mapLink: "https://www.google.com/maps/place/Ueno+Park/",
  },
  {
    title: "Obon Festival (お盆)",
    location: "Nationwide (esp. Kyoto & Tokyo)",
    description:
      "A Buddhist event to honor the spirits of ancestors, with dances and lanterns.",
    image: "/obon.jpg",
    mapLink: "https://www.google.com/maps/place/Kyoto/",
  },
  {
    title: "Shichi-Go-San (七五三)",
    location: "Shrines Nationwide",
    description: "A festival to celebrate the growth of children aged 3, 5, and 7.",
    image: "/Shichi-Go-San.jpg",
    mapLink: "https://www.google.com/maps/place/Meiji+Jingu/",
  },
  {
    title: "New Year (お正月 - Oshōgatsu)",
    location: "Nationwide (Shrines & Homes)",
    description:
      "Japan’s most important holiday, celebrated with shrine visits and family gatherings.",
    image: "/oshogatsu.jpg",
    mapLink: "https://www.google.com/maps/place/Meiji+Shrine/",
  },
  {
    title: "Tanabata (七夕)",
    location: "Sendai, Tokyo & Nationwide",
    description:
      "Star Festival where people write wishes on strips of paper and hang them on bamboo.",
    image: "/tanabata.jpg",
    mapLink: "https://www.google.com/maps/place/Sendai/",
  },
  {
    title: "Setsubun (節分)",
    location: "Shrines Nationwide",
    description: "Spring festival involving bean throwing to drive away evil spirits.",
    image: "/setsubun.jpg",
    mapLink: "https://www.google.com/maps/place/Senso-ji/",
  },
  {
    title: "Gion Matsuri (祇園祭)",
    location: "Kyoto",
    description: "Kyoto’s famous summer festival with grand floats.",
    image: "/gion.jpg",
    mapLink: "https://www.google.com/maps/place/Gion,+Kyoto/",
  },
  {
    title: "Coming of Age Day (成人の日)",
    location: "Nationwide",
    description: "Celebration honoring young people turning 20.",
    image: "/comingofage.jpg",
    mapLink: "https://www.google.com/maps/place/Shibuya/",
  },

  /* 🧡 Remaining items unchanged (kept exactly same) */
  {
    title: "Bon Odori (盆踊り)",
    location: "Nationwide",
    description:
      "Traditional summer dance during Obon to welcome ancestor spirits.",
    image: "/bonodori.jpg",
    mapLink: "https://www.google.com/maps/place/Tokyo+Tower/",
  },
  {
    title: "Hinamatsuri (雛祭り)",
    location: "Nationwide",
    description:
      "Doll Festival celebrated on March 3rd for girls’ happiness.",
    image: "/hinamatsuri.jpg",
    mapLink: "https://www.google.com/maps/place/Tokyo/",
  },
  {
    title: "Children’s Day (こどもの日)",
    location: "Nationwide",
    description:
      "Celebrated with carp streamers to wish children strength and success.",
    image: "/childrensday.jpg",
    mapLink: "https://www.google.com/maps/place/Tokyo/",
  },
  {
    title: "Fireworks Festivals (花火大会)",
    location: "Nationwide",
    description:
      "Summer fireworks watched while wearing yukata.",
    image: "/hanabi.jpg",
    mapLink: "https://www.google.com/maps/place/Tokyo+Hanabi/",
  },
  {
    title: "Omikuji (おみくじ)",
    location: "Shrines Nationwide",
    description:
      "Paper fortunes drawn at temples and shrines.",
    image: "/omikuji.jpg",
    mapLink: "https://www.google.com/maps/place/Senso-ji/",
  },
];

/* ================= COMPONENT ================= */
export default function Traditions() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />

      {/* ================= TRADITIONS ================= */}
      <section className="py-20 bg-gradient-to-b from-rose-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-rose-600" data-aos="fade-down">
            Japanese Traditions
          </h2>
          <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
            Discover timeless customs and celebrations that define Japanese culture.
          </p>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {traditions.map((trad, idx) => (
              <div
                key={idx}
                onClick={() => setSelected(trad)}
                data-aos="fade-up"
                data-aos-delay={idx * 60}
                className="bg-white rounded-2xl shadow-md border border-rose-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
              >
                <img
                  src={trad.image}
                  alt={trad.title}
                  className="w-full h-48 object-cover"
                  draggable={false}
                />
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {trad.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* VIDEO (UNCHANGED) */}
          <div className="mt-20" data-aos="zoom-in-up">
            <h2 className="text-2xl font-bold mb-6">
              Experience Japanese Traditions
            </h2>
            <div className="relative pb-[56.25%] overflow-hidden rounded-2xl shadow-lg">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/3cR2YYFCB9U?autoplay=1&mute=1"
                title="Japanese Traditions"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-modalOpen relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selected.title}</h3>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1 text-rose-600" />
              {selected.location}
            </div>
            <p className="text-gray-700 mb-4">{selected.description}</p>
            <a
              href={selected.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              View on Map
            </a>
          </div>
        </div>
      )}

      {/* ================= ABOUT (UNCHANGED CONTENT) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About Japanese Traditions</h2>
          <div className="rounded-2xl p-8 shadow-xl border bg-gradient-to-r from-rose-50 via-pink-50 to-red-50 border-rose-100">
            <p className="text-gray-700 leading-relaxed text-[15.5px]">
              Japanese traditions are deeply rooted in history, religion, and
              seasonal celebrations. From joyful Hanami under blooming cherry
              blossoms to spiritual Obon festivals honoring ancestors, each
              custom reflects harmony between nature, community, and
              spirituality. These living traditions connect Japan’s past with
              modern life. 🌸
            </p>
          </div>
        </div>
      </section>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes modalOpen {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-modalOpen {
          animation: modalOpen 0.3s ease forwards;
        }
      `}</style>

      <Footer />
    </div>
  );
}
