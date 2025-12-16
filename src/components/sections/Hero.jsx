import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-[70vh] md:h-[80vh] flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/background1.jpg')" }}
    >
      <div className="bg-black/50 p-8 rounded-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Discover Japan
        </h1>

        {/* Sliding / Typing Text */}
        <p className="max-w-2xl text-lg md:text-xl mx-auto">
          <Typewriter
            words={[
              "Japan, an island nation where ancient traditions blend seamlessly with modern life.",
              "Places: From Mount Fuji to Kyoto’s timeless temples, every corner has a story.",
              "Food: Sushi, Ramen, Takoyaki – flavors that define Japan’s culture.",
              "Culture: A harmony of tea ceremonies, art, and modern innovation.",
              "Traditions: Festivals, kimono, and rituals passed through generations.",
              "Events: Cherry blossom season, fireworks, and vibrant street parades.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </p>
      </div>
    </section>
  );
}
