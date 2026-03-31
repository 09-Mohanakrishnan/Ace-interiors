import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Star, CheckCircle, Sparkles } from 'lucide-react';

interface BathroomProps {
  onConsultationClick: () => void;
}

export default function Bathroom({ onConsultationClick }: BathroomProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=2000"
            alt="Bathroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Luxury <span className="text-brand-orange">Bathrooms in Chennai</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your bathroom into a personal spa. We design bathrooms that combine functionality with luxury, using premium tiles, fixtures, and smart storage solutions.
            </p>
            <button
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-brand-black transition-all"
            >
              Get a Free Quote
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Bathroom Design Styles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Create a bathroom that feels like a retreat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Modern Spa', desc: 'Walk-in showers, freestanding bathtubs, and serene neutral palettes for ultimate relaxation.', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800' },
              { title: 'Contemporary', desc: 'Clean-lined vanities, backlit mirrors, and smart fixtures for a sleek modern look.', img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800' },
              { title: 'Compact & Efficient', desc: 'Clever space-saving designs for smaller bathrooms without compromising style.', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' }
            ].map((style, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <img src={style.img} alt={style.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                  <p className="text-gray-600">{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Design your dream bathroom</h2>
          <p className="text-gray-400 mb-10 text-lg">Book a free consultation and get a stunning 3D bathroom design.</p>
          <button
            onClick={onConsultationClick}
            className="bg-brand-orange text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-brand-black transition-all shadow-2xl shadow-brand-orange/20"
          >
            Book Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
