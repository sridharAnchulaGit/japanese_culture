import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";

const foodItems = [
  // --- Existing 12 ---
  {
    title: "Sushi",
    color: "text-pink-600",
    restaurants: ["Sushi Dai (Tsukiji Market)", "Sukiyabashi Jiro", "Sushi Saito"],
    description: "Vinegared rice paired with fresh fish, vegetables, and seaweed — an iconic Japanese dish.",
    image: "/sushi.jpg",
    mapUrl: "https://www.google.com/maps?q=Tsukiji+Fish+Market+Tokyo",
  },
  {
    title: "Ramen",
    color: "text-yellow-600",
    restaurants: ["Ichiran", "Ippudo", "Afuri"],
    description: "A comforting noodle soup with rich broth, meats, vegetables, and boiled eggs.",
    image: "/ramen.jpg",
    mapUrl: "https://www.google.com/maps?q=Ichiran+Ramen+Tokyo",
  },
  {
    title: "Tempura",
    color: "text-amber-700",
    restaurants: ["Tempura Kondo", "Tsunahachi", "Tenmatsu"],
    description: "Seafood or vegetables deep-fried in light batter, served with dipping sauce.",
    image: "/tempura.jpg",
    mapUrl: "https://www.google.com/maps?q=Tempura+restaurants+Tokyo",
  },
  {
    title: "Udon",
    color: "text-purple-600",
    restaurants: ["Maruka Udon", "Sanuki Udon Iwai", "Teuchi Udon Sumita"],
    description: "Thick wheat noodles served in a hot savory broth, sometimes topped with tempura or beef.",
    image: "/udon.jpg",
    mapUrl: "https://www.google.com/maps?q=Udon+Maruka+Tokyo",
  },
  {
    title: "Yakitori",
    color: "text-red-600",
    restaurants: ["Torishiki", "Torisho Ishii", "Eiki"],
    description: "Skewered and grilled chicken cuts — a popular izakaya delicacy.",
    image: "/yakitori.jpg",
    mapUrl: "https://www.google.com/maps?q=Torishiki+Tokyo",
  },
  {
    title: "Gyoza",
    color: "text-green-600",
    restaurants: ["Gyoza no Fukuho", "Kanda Gyoza", "Harajuku Gyoza Rou"],
    description: "Crispy pan-fried dumplings filled with seasoned pork and vegetables.",
    image: "/gyoza.jpg",
    mapUrl: "https://www.google.com/maps?q=Gyoza+no+Fukuho+Tokyo",
  },
  {
    title: "Tonkatsu",
    color: "text-pink-700",
    restaurants: ["Tonkatsu Maisen", "Ginza Bairin", "Katsukura"],
    description: "Breaded and deep-fried pork cutlet, often served with shredded cabbage and rice.",
    image: "/tonkatsu.jpg",
    mapUrl: "https://www.google.com/maps?q=Tonkatsu+Maisen+Tokyo",
  },
  {
    title: "Okonomiyaki",
    color: "text-indigo-600",
    restaurants: ["Mizuno (Osaka)", "Chitose (Osaka)", "Kiji (Osaka)"],
    description: "A savory pancake made with flour, eggs, shredded cabbage, and various toppings.",
    image: "/okonomiyaki.jpg",
    mapUrl: "https://www.google.com/maps?q=Okonomiyaki+Osaka",
  },
  {
    title: "Takoyaki",
    color: "text-orange-600",
    restaurants: ["Kukuru (Osaka)", "Yamachan (Osaka)", "Aizuya (Osaka)"],
    description: "Ball-shaped snacks filled with diced octopus, tempura scraps, and pickled ginger.",
    image: "/takoyaki.jpg",
    mapUrl: "https://www.google.com/maps?q=Takoyaki+Osaka",
  },
  {
    title: "Miso Soup",
    color: "text-teal-600",
    restaurants: ["Okutan (Kyoto)", "Owariya (Kyoto)", "Mutoan (Kyoto)"],
    description: "A traditional soup made from fermented soybean paste, tofu, and seaweed.",
    image: "/miso.jpg",
    mapUrl: "https://www.google.com/maps?q=Miso+Soup+Kyoto",
  },
  {
    title: "Onigiri",
    color: "text-cyan-600",
    restaurants: ["Onigiri Bongo", "Omusubi Gonbei", "Onigiri Asakusa Yadoroku"],
    description: "Rice balls wrapped in seaweed, often filled with fish, pickled plum, or vegetables.",
    image: "/onigiri.jpg",
    mapUrl: "https://www.google.com/maps?q=Onigiri+Shops+Tokyo",
  },
  {
    title: "Katsu Curry",
    color: "text-red-700",
    restaurants: ["Ginza Swiss", "CoCo Ichibanya", "Go! Go! Curry"],
    description: "Breaded deep-fried cutlet served with Japanese curry and rice.",
    image: "/katsu.jpg",
    mapUrl: "https://www.google.com/maps?q=Katsu+Curry+Tokyo",
  },

  // --- Extra 12 dishes ---
  {
    title: "Matcha (抹茶)",
    color: "text-green-700",
    restaurants: ["Uji Matcha Cafes", "Nakamura Tokichi", "Itohkyuemon"],
    description: "Finely ground green tea powder used in tea ceremonies and desserts.",
    image: "/matcha.jpg",
    mapUrl: "https://www.google.com/maps?q=Uji+Kyoto+Matcha",
  },
  {
    title: "Mochi",
    color: "text-pink-500",
    restaurants: ["Nakamuraya Mochi", "Gion Tsujiri", "Habutae Mochi"],
    description: "Chewy rice cakes made from glutinous rice, often filled with sweet red bean paste.",
    image: "/mochi.jpg",
    mapUrl: "https://www.google.com/maps?q=Kyoto+Mochi+Shops",
  },
  {
    title: "Kaiseki Ryori",
    color: "text-blue-700",
    restaurants: ["Gion Karyo", "Hyotei", "Kitcho"],
    description: "Traditional multi-course haute cuisine showcasing seasonal ingredients.",
    image: "/kaiseki.jpg",
    mapUrl: "https://www.google.com/maps?q=Kaiseki+Kyoto",
  },
  {
    title: "Unagi (鰻)",
    color: "text-amber-800",
    restaurants: ["Unagi Hirokawa", "Nodaiwa", "Unagi Irokawa"],
    description: "Grilled freshwater eel glazed with sweet soy sauce, often served on rice.",
    image: "/unagi.jpg",
    mapUrl: "https://www.google.com/maps?q=Unagi+Restaurants+Tokyo",
  },
  {
    title: "Shabu Shabu",
    color: "text-purple-700",
    restaurants: ["Nabezo", "Shabuzen", "Onyasai"],
    description: "Hotpot dish where thinly sliced meat and vegetables are swished in boiling broth.",
    image: "/shabu.jpg",
    mapUrl: "https://www.google.com/maps?q=Shabu+Shabu+Tokyo",
  },
  {
    title: "Soba",
    color: "text-gray-700",
    restaurants: ["Owariya Kyoto", "Honmura An", "Sarashina Horii"],
    description: "Buckwheat noodles served hot in broth or cold with dipping sauce.",
    image: "/soba.jpg",
    mapUrl: "https://www.google.com/maps?q=Soba+Kyoto",
  },
  {
    title: "Kaisendon",
    color: "text-sky-600",
    restaurants: ["Sapporo Nijo Market", "Tsukiji Itadori", "Donburi Chaya"],
    description: "Seafood rice bowl topped with fresh sashimi like tuna, salmon, and roe.",
    image: "/kaisendon.jpg",
    mapUrl: "https://www.google.com/maps?q=Kaisendon+Sapporo",
  },
  {
    title: "Natto",
    color: "text-yellow-700",
    restaurants: ["Okame Natto", "Sendai Natto Shops", "Kyoto Natto Cafes"],
    description: "Fermented soybeans known for their sticky texture and strong flavor.",
    image: "/natto.jpg",
    mapUrl: "https://www.google.com/maps?q=Natto+Shops+Japan",
  },
  {
    title: "Tamagoyaki",
    color: "text-orange-500",
    restaurants: ["Tsukiji Yamacho", "Tamagoyaki Omiya", "Shinjuku Tamago"],
    description: "Sweet rolled omelet often served at sushi restaurants or as street food.",
    image: "/tamagoyaki.jpg",
    mapUrl: "https://www.google.com/maps?q=Tamagoyaki+Tokyo",
  },
  {
    title: "Karaage",
    color: "text-red-500",
    restaurants: ["Kinno Torikara", "Torikizoku", "Nakatsu Karaage"],
    description: "Japanese fried chicken marinated in soy, ginger, and garlic.",
    image: "/karaage.jpg",
    mapUrl: "https://www.google.com/maps?q=Karaage+Shops+Tokyo",
  },
  {
    title: "Nikujaga",
    color: "text-brown-700",
    restaurants: ["Home-style Izakayas", "Kyoto Nikujaga Cafes", "Tokyo Teishokuya"],
    description: "A hearty stew of meat, potatoes, and onions simmered in sweet soy sauce.",
    image: "/nikujaga.jpg",
    mapUrl: "https://www.google.com/maps?q=Nikujaga+Restaurants+Japan",
  },
  {
    title: "Hiyayakko",
    color: "text-blue-500",
    restaurants: ["Kyoto Tofu Shops", "Owariya", "Tokyo Izakayas"],
    description: "Chilled tofu topped with soy sauce, green onions, and bonito flakes.",
    image: "/hiyayakko.jpg",
    mapUrl: "https://www.google.com/maps?q=Hiyayakko+Japan",
  },
];

export default function Food() {
  const [flippedIndices, setFlippedIndices] = useState(new Set());

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleFlip = (idx) => {
    setFlippedIndices((prev) => {
      const newSet = new Set(prev);
      newSet.has(idx) ? newSet.delete(idx) : newSet.add(idx);
      return newSet;
    });
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-pink-50 to-pink-100 min-h-screen">
      <Navigation />

      {/* ================= HERO SECTION (REDUCED SIZE) ================= */}
<section className="relative w-full h-[260px] md:h-[300px] flex items-center justify-center text-center">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/sushi.jpg')" }}
  ></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 via-red-500/50 to-yellow-500/50"></div>

  {/* Text Content */}
  <div className="relative z-10 px-6 max-w-3xl">
    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
      Experience the Flavors of Japan 🍣🍜
    </h1>

    <p className="text-sm md:text-lg text-white/90 leading-relaxed">
      A journey through traditional Japanese cuisine — from sushi and ramen 
      to sweet mochi and matcha desserts.
    </p>
  </div>
</section>


      {/* ================= DISH GRID ================= */}
      <section id="food" className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-extrabold mb-8 text-amber-800 drop-shadow"
            data-aos="fade-down"
          >
            Japanese Food Journey 🍱
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {foodItems.map((food, idx) => {
              const isFlipped = flippedIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="perspective cursor-pointer hover-glow"
                  onClick={() => toggleFlip(idx)}
                  data-aos={idx % 2 === 0 ? "fade-up" : "fade-right"}
                  data-aos-delay={idx * 80}
                >
                  <div
                    className={`relative w-full h-72 transition-transform duration-700 transform-style-preserve-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden border-2 border-amber-100 bg-white">
                      <img
                        src={food.image}
                        alt={food.title}
                        className="w-full h-40 object-cover border-b-4 border-yellow-400"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-amber-700 mb-2">{food.title}</h3>
                        <p className={`text-sm italic ${food.color}`}>
                          Click to see restaurants & description
                        </p>
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg overflow-auto border-2 border-amber-200 bg-gradient-to-r from-amber-100 via-pink-100 to-pink-200 rotate-y-180 p-4 text-left">
                      <h3 className="text-lg font-extrabold text-amber-900 mb-2">{food.title}</h3>

                      <span className="font-semibold text-green-700">🍽️ Try at:</span>
                      <ul className="list-disc list-inside pl-5 mt-1 text-sm text-gray-800">
                        {food.restaurants.map((name, i) => (
                          <li key={i}>{name}</li>
                        ))}
                      </ul>

                      <p className="text-gray-700 text-sm my-3">{food.description}</p>

                      <a
                        href={food.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1 bg-amber-600 text-white rounded-md shadow hover:bg-amber-700 transition"
                      >
                        View on Map
                      </a>

                      <p className="mt-3 text-xs text-gray-500 italic">Click card to flip back</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= VIDEO ================= */}
          <div className="mt-16" data-aos="zoom-in-up">
            <h2 className="text-2xl font-bold mb-6">Experience Japanese Food</h2>

            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/CcZaE8pn8nc"
                title="Japanese Food Highlights"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <div className="mt-16 px-4" data-aos="fade-up">
        <h3 className="text-2xl font-bold mb-6 text-center">About Japanese Cuisine</h3>

        <div className="max-w-5xl mx-auto rounded-2xl p-6 md:p-8 shadow-xl border bg-gradient-to-r from-pink-50 via-amber-50 to-red-50 border-pink-100">
          <p className="text-left text-gray-800 leading-relaxed text-[15.5px] mb-4">
            Japanese cuisine is a harmonious blend of{" "}
            <span className="font-semibold text-red-600">ancient food traditions and modern flavors</span>.
            From the delicate <span className="font-semibold text-red-600">sushi</span> and{" "}
            <span className="font-semibold text-red-600">sashimi</span>, to hearty bowls of{" "}
            <span className="font-semibold text-red-600">ramen</span> and{" "}
            <span className="font-semibold text-red-600">udon</span>, every dish reflects balance,
            seasonality, and respect for ingredients.
          </p>

          <p className="text-left text-gray-800 leading-relaxed text-[15.5px] mb-4">
            Iconic foods such as <span className="font-semibold text-red-600">tempura</span>,{" "}
            <span className="font-semibold text-red-600">okonomiyaki</span>, and{" "}
            <span className="font-semibold text-red-600">takoyaki</span> showcase Japan's creativity 
            and passion for flavor.
          </p>

          <p className="text-left text-gray-800 leading-relaxed text-[15.5px]">
            Today, Japanese cuisine remains a{" "}
            <span className="font-semibold text-red-600">timeless cultural treasure</span>, enjoyed
            across the world — from street stalls to Michelin-starred restaurants. 🍣🍜🥢
          </p>
        </div>
      </div>

      <Footer />

      {/* ================= CSS ================= */}
      <style>{`
        .perspective { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .hover-glow:hover { box-shadow: 0 8px 30px rgba(255,140,0,0.6); transition: 0.4s; }
      `}</style>
    </div>
  );
}