import React from 'react';
import { motion } from 'motion/react';
import { Home, Star, CheckCircle, Shield, Clock, Award } from 'lucide-react';

interface FullHomeProps {
  onConsultationClick: () => void;
}

export default function FullHome({ onConsultationClick }: FullHomeProps) {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
            alt="Full Home Interior"
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
              Complete <span className="text-brand-orange">Home Interiors in Chennai</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get your entire home designed and delivered by a single trusted team. From living room to kitchen, bedroom to bathroom — we handle every room with the same level of precision, quality, and care.
            </p>
            <button
              onClick={onConsultationClick}
              className="bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-brand-black transition-all"
            >
              Get a Free Full Home Quote
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Rooms We Design</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A complete, end-to-end interior solution for your entire home.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: 'Living Room', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
              { title: 'Modular Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e1502da027a?auto=format&fit=crop&q=80&w=800' },
              { title: 'Master Bedroom', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800' },
              { title: 'Wardrobes', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800' },
              { title: 'Bathroom', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800' },
              { title: 'Kids Room', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800' }
            ].map((room, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <img src={room.img} alt={room.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-white font-bold text-xl">{room.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why Choose ACE for Your <br /><span className="text-brand-orange">Full Home Interiors?</span></h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: '10-Year Warranty', desc: 'Comprehensive warranty on all materials and workmanship.' },
                  { icon: Clock, title: '45-Day Delivery', desc: 'On-time project completion or we pay your rent for every delay.' },
                  { icon: Star, title: 'Single Point Contact', desc: 'One dedicated project manager for your entire home.' },
                  { icon: Award, title: 'Premium Materials', desc: 'BWP plywood, German hardware, and brand accessories.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <item.icon className="w-8 h-8 text-brand-orange mb-3" />
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" className="rounded-[3rem] shadow-2xl" alt="Full Home" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-orange text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to design your entire home?</h2>
          <p className="text-orange-100 mb-10 text-lg">Get a free consultation and comprehensive 3D design for every room in your home.</p>
          <button
            onClick={onConsultationClick}
            className="bg-white text-brand-orange px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-900 hover:text-white transition-all shadow-2xl"
          >
            Book Free Full Home Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
