import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation.jsx';
import Layout from './Layout.jsx'; 
import Hero from './sections/Hero.jsx';
import Footer from './sections/Footer.jsx';
import { Landmark, Cpu, Users } from 'lucide-react';  // icons import

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar with animation */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.6 }}
      >
        <Navigation />
      </motion.div>

      {/* Hero Section */}
      <main>
        <Hero />

        {/* About Japanese Culture Section */}
        <section className="py-16 px-6 md:px-20 bg-white">
          <motion.h2 
            className="text-3xl font-bold text-center text-red-600 mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Japanese Culture & Management
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            Japan is a country where tradition and innovation blend seamlessly. 
            From the elegance of the tea ceremony and cherry blossoms, to 
            modern practices like Kaizen and Lean Management, Japanese culture 
            inspires balance, discipline, and harmony in both life and business.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Tradition */}
            <motion.div 
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Landmark className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-500 mb-3">Tradition</h3>
              <p className="text-gray-600">
                Japanese culture values respect, harmony, and rituals such as 
                tea ceremonies, festivals, and traditional arts.
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div 
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Cpu className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-500 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Japan is a global leader in technology and innovation, while 
                keeping cultural values intact.
              </p>
            </motion.div>

            {/* Management */}
            <motion.div 
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-500 mb-3">Management</h3>
              <p className="text-gray-600">
                Concepts like Kaizen, Lean, and teamwork are rooted in Japanese 
                management, shaping businesses worldwide.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
