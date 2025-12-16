// src/components/sections/Articles.jsx
import React, { useState } from "react";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";
import { articles } from "./articlesData.js";

export default function Articles() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold text-rose-600 text-center mb-4">
          Articles
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Stories, culture, and insights about Japan
        </p>

        {/* ARTICLES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-md border border-rose-100 hover:shadow-xl transition cursor-pointer"
              onClick={() => setActiveArticle(article)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <span className="text-xs font-semibold text-rose-600 uppercase">
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold mt-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{article.date}</p>
                <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <span className="text-sm font-semibold text-rose-600">
                {activeArticle.category}
              </span>
              <h2 className="text-2xl font-bold mt-2">
                {activeArticle.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {activeArticle.date}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {activeArticle.content}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
