import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";

// ---------------------------
// MAIN DESTINATION GROUPS
// ---------------------------
const destinationGroups = {
  Tokyo: ["Tokyo"],
  Kyoto: ["Kyoto"],
  Osaka: ["Osaka"],
  Nara: ["Nara"],
  Sapporo: ["Hokkaido"],
  Hiroshima: ["Hiroshima"],
  Kamakura: ["Kanagawa"],
  Yokohama: ["Kanagawa"],
  Koyasan: ["Wakayama"],
  Ise: ["Mie"],
};

// ---------------------------
// ALL PREFECTURES (47)
// ---------------------------
const prefectures = [
  "Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima",
  "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa",
  "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu",
  "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara",
  "Wakayama", "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi",
  "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka", "Saga", "Nagasaki",
  "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa",
];

// ---------------------------
// FAMOUS PLACES FOR EACH PREFECTURE
// ---------------------------
const famousPlaces = {
  Tokyo: ["Shibuya Crossing", "Tokyo Skytree", "Asakusa Senso-ji"],
  Kyoto: ["Fushimi Inari Shrine", "Kinkaku-ji Temple", "Arashiyama Bamboo Grove"],
  Osaka: ["Osaka Castle", "Dotonbori", "Universal Studios Japan"],
  Nara: ["Nara Deer Park", "Todai-ji Temple"],
  Hokkaido: ["Sapporo Snow Festival", "Otaru Canal"],
  Hiroshima: ["Hiroshima Peace Park", "Miyajima Shrine"],
  Kanagawa: ["Great Buddha of Kamakura", "Yokohama Minato Mirai"],
  Wakayama: ["Koyasan Temples"],
  Mie: ["Ise Grand Shrine"],
};

export default function Destinations() {
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

  // Filter prefectures via search bar
  const filteredPrefectures = prefectures.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clicking "Top Destination" should highlight related prefectures
  const handleTopDestinationClick = (place) => {
    const related = destinationGroups[place];
    setSelectedPrefecture(related[0]); // auto-select the prefecture
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12 flex gap-12">

        {/* ---------------- LEFT SIDE ---------------- */}
        <aside
          className="w-64 bg-white shadow-lg rounded-xl p-5 h-max sticky top-24 border"
          data-aos="fade-right"
        >
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Top Destinations
          </h2>

          <ul className="space-y-2">
            {Object.keys(destinationGroups).map((place, i) => (
              <li
                key={i}
                className="text-gray-700 hover:text-red-600 cursor-pointer transition"
                onClick={() => handleTopDestinationClick(place)}
              >
                {place}
              </li>
            ))}
          </ul>
        </aside>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <section className="flex-1" data-aos="fade-up">

          {/* Prefecture Header */}
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Prefectures of Japan
          </h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Prefecture..."
            className="w-full mb-6 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Prefecture Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow">
            {filteredPrefectures.map((pref, i) => (
              <p
                key={i}
                className={`cursor-pointer transition 
                ${
                  selectedPrefecture === pref
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-red-600"
                }`}
                onClick={() => setSelectedPrefecture(pref)}
              >
                {pref}
              </p>
            ))}
          </div>

          {/* Display Famous Places */}
          {selectedPrefecture && (
            <div
              data-aos="fade-up"
              className="mt-10 bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-2xl font-semibold text-red-600 mb-3">
                Famous Places in {selectedPrefecture}
              </h2>

              {famousPlaces[selectedPrefecture] ? (
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {famousPlaces[selectedPrefecture].map((place, i) => (
                    <li key={i}>{place}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No famous places added yet.</p>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
