import React from 'react';
import { motion } from 'motion/react';
import { Moon, Star, CheckCircle, Heart } from 'lucide-react';

interface BedroomProps {
  onConsultationClick: () => void;
}

export default function Bedroom({ onConsultationClick }: BedroomProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=2000"
            alt="Bedroom"
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
              Dream <span className="text-brand-orange">Bedrooms in Chennai</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Your bedroom is your sanctuary. We create serene, comfortable, and beautifully designed bedrooms that help you relax and recharge. Every detail is crafted with care.
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
            <h2 className="text-4xl font-bold mb-4">Bedroom Design Styles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find your perfect bedroom aesthetic.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Master Bedroom', desc: 'Luxurious, spacious designs with walk-in wardrobes and ensuite bathrooms.', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800' },
              { title: 'Kids Bedroom', desc: 'Fun, colourful, and functional designs that grow with your child.', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800' },
              { title: 'Guest Bedroom', desc: 'Welcoming and comfortable designs that make every guest feel at home.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' }
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
          <h2 className="text-4xl font-bold mb-6">Create your dream bedroom</h2>
          <p className="text-gray-400 mb-10 text-lg">Book a free consultation and get a personalized 3D bedroom design.</p>
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
