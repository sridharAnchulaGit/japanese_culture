// src/components/sections/Culture.jsx
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "../Navigation.jsx";
import Footer from "../sections/Footer.jsx";

const cultureItems = [
  // core items
  { title: "Tea Ceremony (茶道 - Sadō)", location: "Kyoto", description: "A traditional ritual of preparing and serving matcha tea with grace and hospitality.", image: "/TeaCere.jpg", mapUrl: "https://www.google.com/maps?q=Kyoto+Tea+Ceremony" },
  { title: "Ikebana (生け花)", location: "Tokyo", description: "The art of Japanese flower arrangement, emphasizing harmony, color, and balance.", image: "/Ikebana.jpg", mapUrl: "https://www.google.com/maps?q=Ikebana+Tokyo" },
  { title: "Kimono Wearing", location: "Kyoto", description: "A traditional garment worn during festivals, ceremonies, and special occasions.", image: "/kimono.jpg", mapUrl: "https://www.google.com/maps?q=Kimono+Rental+Kyoto" },
  { title: "Calligraphy (書道 - Shodō)", location: "Tokyo", description: "The artistic practice of writing Japanese characters with brush and ink.", image: "/calligraphy.jpg", mapUrl: "https://www.google.com/maps?q=Calligraphy+Tokyo" },
  { title: "Origami (折り紙)", location: "Osaka", description: "The Japanese art of paper folding to create intricate shapes and figures.", image: "/origami.jpg", mapUrl: "https://www.google.com/maps?q=Origami+Osaka" },
  { title: "Sumo Wrestling (相撲)", location: "Tokyo", description: "Japan’s national sport featuring powerful wrestlers in traditional bouts.", image: "/sumo.jpg", mapUrl: "https://www.google.com/maps?q=Ryogoku+Kokugikan+Tokyo" },
  { title: "Kabuki Theatre (歌舞伎)", location: "Tokyo", description: "A classical Japanese dance-drama known for its elaborate makeup and costumes.", image: "/kabuki.jpg", mapUrl: "https://www.google.com/maps?q=Kabuki-za+Theatre+Tokyo" },
  { title: "Hanami (花見)", location: "Tokyo & Kyoto", description: "The traditional custom of enjoying cherry blossom viewing during spring.", image: "/hanami.jpg", mapUrl: "https://www.google.com/maps?q=Ueno+Park+Tokyo" },
  { title: "Japanese Festivals (祭り - Matsuri)", location: "All over Japan", description: "Vibrant cultural festivals with parades, food stalls, and traditional performances.", image: "/matsuri.jpg", mapUrl: "https://www.google.com/maps?q=Japan+Festivals" },

  // additional items (20+)
  { title: "Zen Gardens (枯山水)", location: "Kyoto", description: "Rock and sand gardens designed for meditation and reflection.", image: "/zengarden.jpg", mapUrl: "https://www.google.com/maps?q=Ryoanji+Kyoto" },
  { title: "Shinto Shrines (神社)", location: "Nationwide", description: "Sacred places dedicated to Shinto gods with iconic torii gates.", image: "/shrine.jpg", mapUrl: "https://www.google.com/maps?q=Fushimi+Inari+Kyoto" },
  { title: "Samurai Culture", location: "Tokyo & Kyoto", description: "The warrior tradition of Japan with honor, bushido and martial arts.", image: "/samurai.jpg", mapUrl: "https://www.google.com/maps?q=Samurai+Museum+Tokyo" },
  { title: "Geisha (芸者)", location: "Kyoto (Gion)", description: "Traditional entertainers skilled in music, dance, and refined hospitality.", image: "/geisha.jpg", mapUrl: "https://www.google.com/maps?q=Gion+Kyoto" },
  { title: "Shogi (将棋)", location: "Tokyo", description: "Japanese chess requiring deep strategy and patience.", image: "/shogi.jpg", mapUrl: "https://www.google.com/maps?q=Shogi+Tokyo" },
  { title: "Noh Theatre (能)", location: "Kyoto", description: "One of Japan’s oldest performing arts, with masks and stylized movement.", image: "/noh.jpg", mapUrl: "https://www.google.com/maps?q=Noh+Kyoto" },
  { title: "Bonsai (盆栽)", location: "Omiya", description: "Miniature trees cultivated with skill and patience for aesthetic display.", image: "/bonsai.jpg", mapUrl: "https://www.google.com/maps?q=Bonsai+Museum+Omiya" },
  { title: "Taiko Drumming (太鼓)", location: "Tokyo & Osaka", description: "Energetic Japanese drumming performances combining rhythm and choreography.", image: "/taiko.jpg", mapUrl: "https://www.google.com/maps?q=Taiko+Tokyo" },
  { title: "Japanese Pottery (陶芸)", location: "Mashiko", description: "Handcrafted ceramics used in tea ceremonies and everyday life.", image: "/pottery.jpg", mapUrl: "https://www.google.com/maps?q=Mashiko+Pottery" },
  { title: "Japanese Architecture", location: "Nationwide", description: "Traditional wooden temples, castles, and minimalist modern design.", image: "/architecture.jpg", mapUrl: "https://www.google.com/maps?q=Nijo+Castle+Kyoto" },
  { title: "Japanese Folklore (妖怪)", location: "Nationwide", description: "Legends and mythical creatures that populate local stories.", image: "/folklore.jpg", mapUrl: "https://www.google.com/maps?q=Folklore+Museum+Japan" },
  { title: "Shamisen Music (三味線)", location: "Tokyo", description: "Music played on the traditional three-stringed instrument.", image: "/shamisen1.jpg", mapUrl: "https://www.google.com/maps?q=Shamisen+Tokyo" },
  { title: "Fireworks Festivals (花火大会)", location: "Nationwide (Summer)", description: "Summer fireworks events with food stalls and yukata tradition.", image: "/fireworks.jpg", mapUrl: "https://www.google.com/maps?q=Sumida+River+Fireworks" },
  { title: "Samurai Swordsmithing (刀鍛冶)", location: "Seki, Gifu", description: "The craft of forging katana swords with traditional methods.", image: "/katana.jpg", mapUrl: "https://www.google.com/maps?q=Seki+Swordsmith+Gifu" },
  { title: "Japanese Gardens", location: "Kanazawa & Kyoto", description: "Exquisite landscaped gardens symbolizing harmony and seasons.", image: "/jgarden.jpg", mapUrl: "https://www.google.com/maps?q=Kenrokuen+Garden+Kanazawa" },
  { title: "Martial Arts (武道)", location: "Nationwide", description: "Disciplines like Judo, Karate, Kendo and Aikido rooted in tradition.", image: "/martialarts.jpg", mapUrl: "https://www.google.com/maps?q=Martial+Arts+Dojo+Tokyo" },
  { title: "Ryokan Stays (旅館)", location: "Kyoto & Hakone", description: "Traditional inns with tatami rooms, kaiseki meals and onsens.", image: "/ryokan1.jpg", mapUrl: "https://www.google.com/maps?q=Ryokan+Kyoto" },
  { title: "Japanese Masks (能面)", location: "Kyoto & Nara", description: "Masks used in Noh theatre and ritual performances.", image: "/mask.jpg", mapUrl: "https://www.google.com/maps?q=Noh+Mask+Museum+Nara" },
  { title: "Tanabata Festival (七夕)", location: "Sendai & Nationwide", description: "Star festival with colorful paper wishes on bamboo.", image: "/tanabata.jpg", mapUrl: "https://www.google.com/maps?q=Tanabata+Sendai" },
  { title: "Hinamatsuri (雛祭り)", location: "Nationwide (March 3)", description: "Doll festival celebrating girls’ growth and happiness.", image: "/hinamatsuri.jpg", mapUrl: "https://www.google.com/maps?q=Hinamatsuri+Japan" }
];

export default function Culture() {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAV */}
      <Navigation />

{/* ================= HERO SECTION ================= */}
<section className="relative w-full h-[260px] flex items-center justify-center text-center overflow-hidden">
  
  {/* Background Image with Light Blur */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-110"
    style={{
      backgroundImage: "url('/culture-hero.jpg')",   // 🔄 change to your image
      filter: "blur(4px) brightness(0.75)",
      WebkitFilter: "blur(4px) brightness(0.75)",
    }}
  ></div>

  {/* Soft Gradient Overlay (keeps text readable) */}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-rose-400/40 to-yellow-400/40"></div>

  {/* Text Content */}
  <div className="relative z-10 px-6 max-w-3xl">
    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
      Experience Japanese Culture 🎎
    </h1>

    <p className="text-base md:text-lg text-white/90 leading-relaxed">
      A journey through timeless traditions — tea ceremonies, festivals, arts and rituals 
      that shaped Japan’s identity.
    </p>
  </div>
</section>



      {/* ================= MAIN CULTURE GRID ================= */}
      <section id="culture" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cultureItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-400 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video */}
          <div className="mt-16" data-aos="zoom-in-up">
            <h2 className="text-2xl font-bold mb-6">Experience Japanese Culture</h2>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/3cR2YYFCB9U"
                title="Japanese Culture Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* About block */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">About Japanese Culture</h3>
            <div className="rounded-2xl p-6 md:p-8 shadow-xl border bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-orange-100 text-left">
              <p className="text-gray-800 leading-relaxed text-[15.5px]">
                Japanese culture is a harmonious blend of <span className="font-semibold text-red-700">ancient traditions and modern lifestyle</span>.
                From tea ceremonies and flower arrangement to festivals and performing arts, Japan celebrates the beauty of rhythm, seasonality and respect.
              </p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl animate-modalOpen">
              <button onClick={() => setSelectedItem(null)} className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl">×</button>
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-56 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold mb-1">{selectedItem.title}</h3>
              <p className="text-sm text-gray-500 mb-2">📍 {selectedItem.location}</p>
              <p className="text-gray-700">{selectedItem.description}</p>
              <a href={selectedItem.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                View on Map
              </a>
            </div>
          </div>
        )}

        <style>{`
          @keyframes modalOpen {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-modalOpen { animation: modalOpen 0.28s ease forwards; }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
