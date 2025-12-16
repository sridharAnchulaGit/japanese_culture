// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <p className="text-sm text-gray-400">
             Discover Japan’s heritage, traditions, and iconic destinations through our immersive interactive platform, designed to help you explore, learn, and experience Japan like never before.
            </p>
          </div>

          {/* Quick Links */}
<div>
  <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-400">
    <Link to="/places" className="hover:text-white">Places</Link>
    <Link to="/events" className="hover:text-white">Events</Link>

    <Link to="/food" className="hover:text-white">Food</Link>
    <Link to="/culture" className="hover:text-white">Culture</Link>

    <Link to="/traditions" className="hover:text-white">Traditions</Link>
    <Link to="/articles" className="hover:text-white">Articles</Link>

    <Link to="/destinations" className="hover:text-white">Destinations</Link>
    <Link to="/my-events" className="hover:text-white">My Events</Link>
  </div>
</div>


          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>

            <p className="text-sm text-gray-400 flex items-center gap-2">
              <MapPin size={16} />
              <a
                href="https://www.google.com/maps/place/Vijayawada,+Andhra+Pradesh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Vijayawada, Andhra Pradesh
              </a>
            </p>

            <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
              <Mail size={16} />
              <a href="mailto:sridharanchula@gmail.com" className="hover:text-white">
                sridharanchula@gmail.com
              </a>
            </p>

            <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
              <Phone size={16} />
              <a href="tel:+917674069294" className="hover:text-white">
                +91 7674069294
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.linkedin.com/in/sridhar-anchula-44a07824a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={22} />
              </a>

              <a
                href="https://github.com/sridharAnchulaGit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github size={22} />
              </a>

              <a
                href="https://wa.me/7674069294"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <MessageCircle size={22} />
              </a>

              <a
                href="https://t.me/ASR30795"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Send size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Japanese Culture. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
